"use client"
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import React  from "react";

export default function ProfilePage() {

    const router = useRouter(); 
    const [data,setData] = React.useState("nothing");
    const Logout = async () => {
        try {
          await axios.get("/api/users/logout");
          toast.success("Logout successful");
          router.push("/login");
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error(error.message);
          } else {
            console.error("Unknown error while fetching profile");
          }
        }

        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    const getUserDetails= async () => {
        const res = await axios.get('/api/users/me');
        console.log(res.data);
        setData(res.data.data._id);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <hr />
            <p>Welcome to your profile!</p>
            <h2 className="p-1 rounded bg-green-500 ">{data === "nothing" ? "Nothing" :<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <hr />
            <button
            onClick={()=>Logout()}
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Logout</button>
            <button
            onClick={()=>getUserDetails()}
            className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Get User Details</button>
        </div>
    )
}