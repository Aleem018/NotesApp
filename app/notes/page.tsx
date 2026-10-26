import NoteManager from "./noteManager";
import LogoutBtn from "./logoutBtn";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { HiOutlinePlus } from "react-icons/hi";

interface Note {
    title: string;
    content: string;
    id: number;
    createdAt: Date;
}

export default async function NotesDisplay() {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/");
    }

    const response = await fetch("http://localhost:5204/api/notesapi", {
        cache: 'no-cache', // This ensures Next.js doesn't cache stale data
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log("STATUS:", response.status, response.statusText, response.headers.get("www-authenticate"));

    if (response.status === 401) {
        redirect("/");
    }

    if (!response.ok) {
        return <div className="text-black mx-auto my-auto border p-5">Failed to load notes.</div>
    }

    const data = await response.json();

    const notes: Note[] = data;

    return (
        <main>
            <div className="p-8 bg-[url('/notebg-3.jpg')] min-h-screen bg-[length:100%_auto] bg-repeat-y">

                <div className="flex border-b justify-between items-center">
                    <h1 className="text-3xl text-black font-bold mb-8">Your Notes</h1>
                    <div className="flex mb-8">
                        <a href="./create-note" className="flex p-2 border border-teal-500 rounded-xl items-center text-black bg-green-500 gap-1 hover:shadow-xl mr-20">Add a Note <HiOutlinePlus className="h-6 w-6 hover:animate-[spin_1s_linear_1]" /></a>
                        <LogoutBtn />
                    </div>
                </div>

                <NoteManager notes={notes} />

            </div>
        </main>

    )
}