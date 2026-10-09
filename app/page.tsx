"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { TbNotebook } from 'react-icons/tb';
import { saveToken } from "./actions";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5204/api/auth/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ Email: email, Password: password }),
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            } else
            {
                const data: { token: string } = await response.json();

                await saveToken(data.token);
                console.log("Token saves successfully!");
                
            }

            setEmail("");
            setPassword("");
            router.push("/notes");
            router.refresh();
        } catch (error) {
            console.error("Failed to post data", error);
            alert("Failed to login");
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div className="flex bg-white mx-auto my-auto shadow-xl rounded-lg">
            <div className="flex flex-col p-5 bg-[url('/ceo1.jpg')] bg-cover bg-center bg-no-repeat rounded-l-lg">
                <div className="flex items-center gap-1">
                    <TbNotebook className="text-xl"/>
                    <h1 className="text-white text-xl">
                        Noteus
                    </h1>
                </div>
                <div className="flex flex-col gap-5 mt-auto">
                    <h1 className="text-white font-bold text-xl max-w-3xs">
                        "Simply all the notes you could ever need."
                    </h1>
                    <div>
                        <h3 className="text-zinc-100 text-sm">
                            Karen True
                        </h3>
                        <p className="text-zinc-400 text-xs">Director of Digital Note-taking Technology</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5 pr-40 pl-40 pt-25 pb-25">
                <div className="flex flex-col gap-2 max-w-3xs">
                    <h1 className="text-black text-xl text-center font-bold">
                        Welcome back to Noteus
                    </h1>
                    <p className="text-zinc-700 text-center text-xs">Save all your deepest, darkest, juiciest notes right here, on this platform</p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3"
                >
                    <input
                        type="email"
                        name=""
                        id=""
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border border-zinc-300 rounded-md h-10 p-3 text-black
                        outline-none focus:ring-2 focus:ring-blue-500 focus:border-purple-500"
                    />
                    <input
                        type="password"
                        name=""
                        id=""
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border border-zinc-300 rounded-md h-10 p-3 text-black
                        outline-none focus:ring-2 focus:ring-blue-500 focus:border-purple-500"
                    />
                    <a href="" className="text-blue-800 text-sm font-bold hover:text-violet-600">Forgot Password?</a>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-700 rounded-3xl h-9 hover:shadow-xl hover:bg-violet-900 disabled:bg-gray-400"
                    >
                        {isSubmitting ? "Logging you in" : "Log In"}
                    </button>
                </form>
                <div className="flex text-sm gap-1">
                    <p className="text-zinc-400">Don't have an account?</p>
                    <Link href="/signup" className="text-blue-800 hover:text-violet-600">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}
