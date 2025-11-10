import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "@/model/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Missing token or new password" },
        { status: 400 }
      );
    }

    // Hash the token to match DB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Clear reset token
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error: unknown) {
    console.error("Password reset error:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to reset password", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }

}
