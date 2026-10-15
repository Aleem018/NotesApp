"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutBtn ()
{
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);

        try{
            await fetch("http://localhost:5204/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
        } catch (error)
        {
            console.error("Logout failed:", error);
        } finally
        {
            router.push("/");
            router.refresh();
            setIsLoggingOut(false);
        }
    }
    return(
        <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="bg-[#dfff00] absolute right-6 text-black px-3.5 py-2 rounded-xl disabled:bg-gray-400 hover:bg-red-600 hover:shadow hover:cursor-pointer"
        >
            {isLoggingOut ? "Logging out..." : "Log out"}
        </button>
    )
}