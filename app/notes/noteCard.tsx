"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { error } from "console";
import { LuCalendar, LuClock } from "react-icons/lu";

export interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

interface NoteCardProps {
    note: Note;
    isSelected: boolean;
    onToggleSelect: (id: number) => void;
}

export default function NoteCard({ note, isSelected, onToggleSelect }: NoteCardProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const startEditing = () => {
        setTitle(note.title);
        setContent(note.content);
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!title.trim() || !content.trim()) {
            alert("Title and content cannot be empty!");
            return;
        }

        setIsSaving(true);

        try {
            const response = await fetch(`/api/notesapi/${note.id}`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Title: title, Content: content }),
            });

            if (response.status == 401) {
                router.push("/");
            }

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }
            setIsEditing(false);
            router.refresh();
        } catch (error) {
            console.error("Failed to update note:", error);
            alert("Failed to save changes.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="border p-4 rounded-md bg-white relative">
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleSelect(note.id)}
                className="absolute top-4 right-4 w-5 h-5 cursor-pointer max-sm:w-4 max-sm:h-4" />

            {isEditing ? (
                <div className="flex flex-col gap-3 pr-8">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={100}
                        className="border border-zinc-300 p-2 rounded-xl text-black bg-zinc-100"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        maxLength={10000}
                        className="border border-zinc-300 p-2 rounded-xl text-black h-35 bg-zinc-100"
                    />
                    <div className="flex gap-4">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-[#dfff00] text-black px-3.5 py-2 rounded-xl disabled:bg-gray-400 hover:bg-green-600 hover:shadow hover:cursor-pointer"
                        >
                            {isSaving ? "Saving..." : "Save"}
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            disabled={isSaving}
                            className="px-3.5 py-1.5 text-black rounded-xl bg-red-500 hover:bg-red-700 hover:shadow hover:cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="">
                    <div className="pb-7">
                        <div className="flex mr-6 pb-2 text-sm justify-between border-b-3 border-dashed max-sm:text-xs">
                            <div className="flex items-center gap-1">
                                <LuCalendar className="text-black" />
                                <p className="text-zinc-600">{new Date(note.createdAt).toLocaleDateString()}</p>
                            </div>

                            <div className="flex items-center gap-1">
                                <LuClock className="text-black" />
                                <p className="text-zinc-600">{new Date(note.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                            </div>
                        </div>

                        <h2 className="text-xl pt-5 font-bold text-zinc-700 pr-5 break-words max-sm:text-md max-sm:pt-3">{note.title}</h2>

                        <p className="mt-2 text-gray-600 break-words max-sm:text-sm max-sm:mt-1">{note.content}</p>

                    </div>
                    <button
                        onClick={startEditing}
                        className="absolute bottom-4 left-4 text-sm text-green-500 underline cursor-pointer max-sm:bottom-3"
                    >
                        Edit
                    </button>
                </div>
            )}
        </div>
    )

}