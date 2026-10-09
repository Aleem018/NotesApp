"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function CreateNoteForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const handleSUbmit = async (e: React.FormEvent) => {
        e.preventDefault(); //this prevents the browser from refreshing the page
        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:5204/api/notesapi", {
                method: "POST", // This tells the server i'm sending data IMPORTANT
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json", // this tells C# to expect JSON
                },
                // these property names must match exactly what the c# model expects
                body: JSON.stringify({ Title: title, Content: content }),
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            // 1. Clear the form fields upon success
            setTitle("");
            setContent("");

            // 2. re-run your server component to fetch the updated list
            router.refresh();
        } catch (error) {
            console.error("Failed to post data:", error);
            alert("Failed to create note.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (

        <div className="flex flex-col gap-10 bg-[linear-gradient(58deg,_#dfff00,_black_51%)] sm:bg-[linear-gradient(38deg,_#dfff00,_black_32%)] lg:bg-gradient-to-tr lg:from-[#dfff00] lg:to-[40%] lg:to-black items-center sm:pt-5 lg:pt-10 pt-2 pb-25">
            
            <div className="flex flex-col shadow-xl bg-[linear-gradient(58deg,_#dfff00,_#18181b_45%)] sm:bg-[linear-gradient(40deg,_#dfff00,_#18181b_17%)] lg:bg-gradient-to-tr lg:from-[#dfff00] lg:from-[0%] lg:to-[17%] lg:to-zinc-900 sm:flex-row lg:flex-row rounded-3xl sm:w-165 lg:w-220">
                <div className="flex flex-col gap-5 m-10 lg:ml-17 lg:mr-17 lg:mb-5 lg:mt-5">
                    <h1 className="text-2xl sm:text-3xl lg:text-3xl text-center">
                        Create a Note
                    </h1>
                    <Image
                        src="/note.png"
                        width={300}
                        height={250}
                        alt=""
                        className="" />
                </div>
                <form onSubmit={handleSUbmit} className="flex flex-col bg-white gap-5 max-w-md sm:w-150 lg:w-200 rounded-3xl p-7">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="note-title" className="text-zinc-700 text-sm">
                            Your note title
                        </label>
                        <input
                            type="text"
                            id="note-title"
                            placeholder="Note Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="border border-zinc-300 p-2 rounded-xl text-black bg-zinc-100"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="note-content" className="text-zinc-700 text-sm">
                            Details
                        </label>
                        <textarea
                            id="note-content"
                            placeholder="Note Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="border border-zinc-300 p-2 rounded-xl text-black h-35 bg-zinc-100"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#dfff00] h-10 flex items-center text-black justify-center rounded-xl disabled:bg-gray-400"
                    >
                        {isSubmitting ? "Saving..." : "Submit Note"}
                    </button>
                </form>
            </div>

        </div>
    )
}