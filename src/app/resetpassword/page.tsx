"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) setToken(urlToken);
    else toast.error("Invalid or missing reset token");
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!newPassword) {
        toast.error("Please enter a new password");
        return;
      }
      setLoading(true);
      const response = await axios.post("/api/users/reset-password", {
        token,
        newPassword,
      });
      toast.success(response.data.message || "Password reset successful!");
      setTimeout(() => router.push("/login"), 1500);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Failed to reset password");
      } else {
        toast.error("Unexpected password reset error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 px-4">
      <h1 className="text-3xl font-bold mb-4">Reset Your Password</h1>
      <form onSubmit={handleResetPassword} className="w-full max-w-md px-8">
        <div className="mb-6">
          <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none bg-white text-black"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="w-1/2 p-3 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </form>

      <Link
        href="/login"
        className="text-blue-500 hover:underline mt-4 text-sm text-center"
      >
        Back to Login
      </Link>
    </div>
  );
}
