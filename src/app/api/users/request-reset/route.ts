import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/model/userModel";
import { sendResetPasswordEmail } from "@/helper/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate reset token
    const plainToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(plainToken)
      .digest("hex");

    // Save token to user
    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.DOMAIN}/resetpassword?token=${plainToken}`;
    await sendResetPasswordEmail(user.email, resetUrl);

    return NextResponse.json({
      message: "Password reset link sent successfully",
      success: true,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to send reset link", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to send reset link" },
      { status: 500 }
    );
  }
}
