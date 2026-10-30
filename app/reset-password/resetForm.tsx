"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetForm({ token }: { token: string }) {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirm) {
            setError("Passwords dont match!");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Token: token, NewPassword: password }),
            });

            if (response.ok) {
                router.push("/");
                return;
            }

            const text = await response.text();
            try {
                const data = JSON.parse(text);
                setError(data.errors ? Object.values(data.errors).flat().join(" ") : text);
            } catch {
                setError(text);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}
        className="flex flex-col bg-white gap-4 max-w-sm shadow-xl mx-auto my-auto p-10 rounded-xl"
        >
            <h1 className="text-2xl text-center text-black">Create a new password</h1>
            <input type="password" 
            required
            minLength={8}
            maxLength={72}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="border border-zinc-300 rounded-md h-10 p-3 text-black
                        outline-none focus:ring-2 focus:ring-blue-500 focus:border-purple-500"
            />
            <input type="password" 
            required
            minLength={8}
            maxLength={72}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm new password"
            className="border border-zinc-300 rounded-md h-10 p-3 text-black
                        outline-none focus:ring-2 focus:ring-blue-500 focus:border-purple-500"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
            type="submit"
            className="mt-3 bg-blue-700 rounded-xl px-4 py-2 hover:shadow-xl hover:cursor-pointer hover:bg-violet-900 disabled:bg-gray-400"
            >
                {isSubmitting ? "Updating..." : "Reset password"}
            </button>
        </form>
    )
}