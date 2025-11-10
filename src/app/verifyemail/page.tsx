"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Wrap verifyUserEmail in useCallback
  const verifyUserEmail = useCallback(async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError("");
      console.log("Verification response:", response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Error verifying email");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [token]); // 👈 token is the dependency for this callback

  // Handle resend verification email
  const handleresendVerification = async () => {
    try {
      if (!email)
        return setMessage("Please enter your email to resend verification");
      setMessage("Resending verification email...");
      const response = await axios.post("/api/users/resendverification", {
        email,
      });
      setMessage(
        response.data.message || "Verification email resent successfully"
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data?.error || "Failed to resend verification email"
        );
      } else {
        setMessage("Unexpected error while resending verification");
      }
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    console.log("Token from URL:", urlToken);
    if (urlToken) {
      setToken(urlToken);
    } else {
      setError("No verification token found");
      setLoading(false);
    }
  }, []);

  // ✅ Add verifyUserEmail as a dependency (no ESLint warning)
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, verifyUserEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Email Verification</h1>

      {loading ? (
        <div className="text-center">
          <h2 className="text-2xl">Verifying your email...</h2>
        </div>
      ) : verified ? (
        <div className="text-center">
          <h2 className="text-2xl text-green-500">
            Email verified successfully!
          </h2>
          <Link
            href="/login"
            className="mt-4 text-blue-500 hover:underline block"
          >
            Click here to login
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl text-red-500">Verification Failed</h2>
          <p className="text-gray-500 mt-2 mb-6">{error}</p>
          <div className="flex flex-col items-center space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-72"
            />
            <button
              onClick={handleresendVerification}
              className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
            >
              Resend Verification Email
            </button>
            <p className="text-gray-500">{message}</p>
          </div>

          <Link
            href="/signup"
            className="text-blue-500 hover:underline mt-4 block"
          >
            Try signing up again
          </Link>
        </div>
      )}
    </div>
  );
}
