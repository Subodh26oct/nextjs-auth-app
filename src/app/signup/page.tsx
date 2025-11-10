"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  
  const onSignup = async () => {
    try {
      setLoading(true);
      console.log("Submitting user data:", user); // Debug log

      const response = await axios.post("/api/users/signup", user);
      if (response.data.success) {
        toast.success("Signup successful!");
        router.replace("/login");
      }
      console.log("Signup successful", response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-2xl mb-4">{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 w-[300px]"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />

      <label htmlFor="email">email</label>
      <input
        className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 w-[300px]"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <div className="relative w-[300px]">
        <input
          className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 w-full"
          id="password"
          type={showPassword ? "text" : "password"}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-gray-500"
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
              <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
              <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path
                fillRule="evenodd"
                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
      <button
        onClick={onSignup}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        {buttonDisabled ? "No SignUp" : "SignUp"}
      </button>
      <Link href="/login">Already have an account? Login</Link>
    </div>
  );
}
