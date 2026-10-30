"use client"
import { useState } from "react";
import Link from "next/link";
import { FaLock } from "react-icons/fa";

export default function ForgotPasswordPage()
{
    const[email, setEmail] = useState("");
    const[submitted, setSubmitted] = useState(false);
    const[isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try
        {
            await fetch("/api/auth/forgot-password",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ Email: email }),
                }
            );
        } finally {
            setSubmitted(true);
            setIsSubmitting(false);
        }
    };

    if (submitted)
    {
        return (
            <p className="flex flex-col mx-auto my-auto text-black">
                If an account exists for that email, we've sent a resent link.{" "}
                <Link href="/" className="underline text-center">Back to login</Link>
            </p>
        );
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col bg-white gap-4 max-w-sm shadow-xl mx-auto my-auto p-10 rounded-xl">
            <FaLock className="text-violet-800 mx-auto h-8 w-8 border border-zinc-300 rounded-md p-1"/>
            <h1 className="text-2xl text-center text-black">Forgot your password?</h1>
            <p className="text-zinc-700 text-center mb-5 text-sm">A link will be sent to your email to help reset your password</p>
            <input 
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={254}
            className="border border-zinc-300 rounded-md h-10 p-3 text-black
                        outline-none focus:ring-2 focus:ring-blue-500 focus:border-purple-500"
             />
            <button type="submit" disabled={isSubmitting} 
            className="mt-5 bg-blue-700 rounded-xl px-4 py-2 hover:shadow-xl hover:cursor-pointer hover:bg-violet-900 disabled:bg-gray-400"
            >
                {isSubmitting ? "Sending..." : "Send reset link"}
            </button>
        </form>
    )
}