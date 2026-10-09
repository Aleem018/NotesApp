import CreateNoteForm from "./form";
import NoteManager from "./noteManager";
import { cookies } from "next/headers";

interface Note {
    title: string;
    content: string;
    id: number;
    createdAt: Date;
}

export default async function NotesDisplay() {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) 
    {
        return <p>You are not logged in.</p>;
    }

    const response = await fetch("http://localhost:5204/api/notesapi", {
        cache: 'no-cache', // This ensures Next.js doesn't cache stale data
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log("STATUS:", response.status, response.statusText, response.headers.get("www-authenticate"));

    if (!response.ok) {
        return <div>Failed to load notes. Your token may be expired.</div>
    }

    const data = await response.json();
    console.log("What did C# actually send?", data);

    const notes: Note[] = data;

    return (
        <main>
            <h1 className="text-3xl font-bold bg-black text-center p-10">Note-taking App</h1>
            <CreateNoteForm />
            <div className="p-8">

                <h1 className="text-3xl font-bold mb-8">Your Notes</h1>


                <NoteManager notes={notes} />

            </div>
        </main>

    )
}