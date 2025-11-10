"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!email) {
        toast.error("Please enter your email");
        return;
      }

      setLoading(true);
      const response = await axios.post("/api/users/request-reset", { email });
      toast.success(response.data.message || "Password reset link sent!");
      setEmail("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Failed to send reset link");
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 px-4">
      <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
      <p className="text-gray-400 text-sm mb-6 text-center">
        Enter your registered email to receive a password reset link.
      </p>

      <form
        onSubmit={handleRequestReset}
        className="w-full max-w-md flex flex-col gap-4"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <Link
        href="/login"
        className="text-blue-500 hover:underline mt-4 text-sm"
      >
        Back to Login
      </Link>
      <Link
        href="/signup"
        className="text-blue-500 hover:underline mt-2 text-sm"
      >
        Don't have an account? Sign up
      </Link>
    </div>
  );
}
