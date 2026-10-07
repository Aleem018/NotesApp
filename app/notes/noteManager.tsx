"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
}

export default function NoteManager({ notes }: { notes: Note[] }) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    // to add or remove an ID from the selected array
    const toggleSelection = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((noteId) => noteId !== id)
                : [...prev, id]
        );
    };

    const handleDelete = async () => {
        if (selectedIds.length === 0) return;
        setIsDeleting(true);

        try {
            // fire off a DELETE request for every selected ID concurrently
            await Promise.all(
                selectedIds.map((id) =>
                    fetch(`http://localhost:5204/api/notesapi/${id}`, {
                        method: "DELETE",
                    })
                )
            );
            setSelectedIds([]); //to clear selection after success
            router.refresh(); // to refetch the updated database
        } catch (error) {
            console.error("Failed to delete notes:", error);
            alert("Failed to delete one or more notes.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div>
            {/* Delete Button */}
            <div className="mb-4 h-10">
                {selectedIds.length > 0 && (
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
                    >
                        {isDeleting ? "Deleting..." : `Delete Selected (${selectedIds.length})`}
                    </button>
                )}
            </div>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes?.map((note) => (
                    <div
                        key={note.id}
                        className="border p-4 rounded relative"
                    >
                        {/* Checkbox for selection */}
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(note.id)}
                            onChange={() => toggleSelection(note.id)}
                            className="absolute top-4 right-4 w-5 h-5 cursor-pointer"
                        />
                        <div className="flex justify-between">
                            <h2 className="text-xl font-bold pr-5">{note.title}</h2>
                            <p className="flex mr-6 text-sm items-center">{new Date(note.createdAt).toLocaleDateString()} . {new Date(note.createdAt).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})}</p>
                        </div>
                        <p className="mt-2 text-gray-600">{note.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}