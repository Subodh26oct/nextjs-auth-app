import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";
import crypto from "crypto";

connect();

export async function POST(request: NextRequest) {
  try {
    await connect();

    const { token } = await request.json();

    console.log("Received token for verification:", token);
    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      );
    }
    // Hash the token received from the request
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      verifyToken: hashedToken,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      console.log("No user found with matching token");
      return NextResponse.json(
        {
          error: "Invalid token or token expired",
        },
        { status: 400 }
      );
    }

    console.log("User found:", user.email);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: unknown) {
    console.error("Error verifying email:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }

}
