"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:5204/api/auth/register", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Email: email, Password: password }),
            });

            if (response.ok) {
                router.push("/notes");

                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
                router.refresh();
                return;
            }

            if (!response.ok) {
                setError(await response.text());
            }

            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Failed to post data:", error);
            alert("Failed to register user.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (

        <div className="border flex flex-col gap-7 p-12 sm:p-20 lg:p-20 bg-white mx-auto my-auto rounded-xl shadow-xl">
            <div className="flex flex-col gap-3">
                <h1 className="text-black text-center text-xl sm:text-2xl lg:text-2xl font-bold">
                    Create an Account
                </h1>
                <p className="text-zinc-600 text-center text-sm sm:text-base lg:text-base">To create your personal notes effortlessly</p>
            </div>

            <form onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:gap-5 lg:gap-5"
            >
                <input
                    type="email"
                    name=""
                    id=""
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-zinc-300 h-8 p-2 w-65 sm:h-10 sm:p-3 sm:w-full lg:h-10 lg:p-3 lg:w-full text-black 
                    outline-none focus:ring-2 focus:ring-blue-500 focus:border-purple-500 rounded-sm"
                />
                <div className="flex items-center gap-8">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name=""
                        id=""
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border border-zinc-300 h-8 p-2 sm:h-10 sm:p-3 lg:h-10 lg:p-3 text-black 
                        outline-none focus:ring-2 focus:ring-blue-500 focus:border-purple-500 rounded-sm"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <FaEyeSlash className="text-gray-500" size={20} /> : <FaEye className="text-gray-500" size={20} />}
                    </button>
                </div>
                <div className="flex items-center gap-8">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name=""
                        id=""
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="border border-zinc-300 h-8 p-2 sm:h-10 sm:p-3 lg:h-10 lg:p-3 text-black rounded-sm"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <FaEyeSlash className="text-gray-500" size={20} /> : <FaEye className="text-gray-500" size={20} />}
                    </button>
                </div>
                {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 rounded-3xl h-10 flex items-center justify-center text-black text-xs disabled:bg-gray-400 hover:shadow hover:bg-blue-100"
                >
                    {isSubmitting ? "Submitting..." : "Sign Up"}
                </button>
            </form>
            {showSuccess && (
                <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded shadow-xl transition-opacity">
                    Account created successfully!
                </div>
            )}
        </div>

    )
}