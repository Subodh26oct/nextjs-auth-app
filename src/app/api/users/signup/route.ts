import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendVerificationEmail } from "@/helper/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    await connect();
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    console.log("Received signup data:", reqBody);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Check if username is taken
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate plain + hashed token
    const plainToken = crypto.randomBytes(32).toString("hex");
    const hashedVerifyToken = crypto
      .createHash("sha256")
      .update(plainToken)
      .digest("hex");

    // Create user
    const newUser = new User({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      verifyToken: hashedVerifyToken,
      verifyTokenExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24h
      isVerified: false,
    });

    const savedUser = await newUser.save();
    console.log("User created successfully:", savedUser);

    // ✅ FIX: Correct usage of sendVerificationEmail
    const verifyUrl = `${process.env.DOMAIN}/verifyemail?token=${plainToken}`;
    await sendVerificationEmail(savedUser.email, verifyUrl); // ✅ Correct line

    return NextResponse.json({
      message: "User created successfully, verification email sent",
      success: true,
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      {
        error: "Error creating user",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
