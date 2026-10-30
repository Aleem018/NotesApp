"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import NoteCard, { Note } from "./noteCard";

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
            const responses = await Promise.all(
                selectedIds.map((id) =>
                    fetch(`/api/notesapi/${id}`, {
                        method: "DELETE",
                        credentials: "include"
                    })
                )
            );

            if (responses.some((r) => r.status === 401)) {
                router.push("/login");
                return;
            }
            const failed = responses.filter((r) => !r.ok).length;
            if (failed > 0) {
                alert(`${failed} note(s) could not be defeated.`);
            }

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
            <div className="mb-4 mt-4 h-10">
                {selectedIds.length > 0 && (
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 hover:cursor-pointer disabled:bg-gray-400 max-sm:px-2.5 max-sm:py-2 max-sm:text-sm max-sm:rounded-md"
                    >
                        {isDeleting ? "Deleting..." : `Delete Selected (${selectedIds.length})`}
                    </button>
                )}
            </div>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes?.map((note) => (
                    <NoteCard 
                    key={note.id}
                    note={note}
                    isSelected={selectedIds.includes(note.id)}
                    onToggleSelect={toggleSelection}/>
                ))}
            </div>
        </div>
    )
}