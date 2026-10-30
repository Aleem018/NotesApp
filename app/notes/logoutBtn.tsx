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
            await fetch("/api/auth/logout", {
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
        className="bg-[#dfff00]/60 absolute right-6 text-black px-3.5 py-2 rounded-xl disabled:bg-gray-400 transition-transform hover:-translate-y-1 hover:bg-red-700 hover:text-zinc-300 hover:shadow hover:cursor-pointer"
        >
            {isLoggingOut ? "Logging out..." : "Log out"}
        </button>
    )
}