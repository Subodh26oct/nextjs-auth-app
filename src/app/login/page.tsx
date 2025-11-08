"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // ✅ Login Handler
  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Password Reset Request
  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error("Please enter your email first");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/users/request-reset", {
        email: resetEmail,
      });
      toast.success(response.data.message || "Password reset link sent!");
      setForgotMode(false); // ✅ Correct line
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4">
      <h1 className="text-center text-4xl font-bold mb-8">
        {loading ? "Processing..." : forgotMode ? "Reset Password" : "Login"}
      </h1>

      {/* ✅ Login Form */}
      {!forgotMode ? (
        <form onSubmit={onLogin} className="w-full max-w-md px-8">
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black bg-white"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black bg-white"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="text-right mb-6">
            <button
              type="button"
              onClick={() => setForgotMode(true)}
              className="text-blue-500 hover:underline text-sm"
            >
              Forgot password?
            </button>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </div>
        </form>
      ) : (
        // ✅ Forgot Password Form
        <form onSubmit={handleRequestReset} className="w-full max-w-md px-8">
          <p className="text-gray-700 text-sm mb-4 text-center">
            Enter your registered email to receive a password reset link.
          </p>
          <div className="mb-6">
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none bg-white text-black"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center mb-4">
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 p-3 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setForgotMode(false)}
              className="text-blue-500 hover:underline text-sm"
            >
              Back to Login
            </button>
          </div>
        </form>
      )}

      <div className="mt-6">
        <Link href="/signup" className="text-blue-500 hover:underline">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
}
