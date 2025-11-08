import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/model/userModel";
import { sendReverificationEmail } from "@/helper/mailer";

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

    if (user.isVerified) {
      return NextResponse.json({ message: "Email already verified" });
    }

    // Generate a new token
    const plainToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(plainToken)
      .digest("hex");

    // Update user
    user.verifyToken = hashedToken;
    user.verifyTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hrs
    await user.save();

    // Send new verification email
    const verifyUrl = `${process.env.DOMAIN}/verifyemail?token=${plainToken}`;
    await sendReverificationEmail(user.email, verifyUrl);

    return NextResponse.json({
      message: "Verification email resent successfully",
      success: true,
    });
  } catch (error: any) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { error: "Failed to resend verification", details: error.message },
      { status: 500 }
    );
  }
}
