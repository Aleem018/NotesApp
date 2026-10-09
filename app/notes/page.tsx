import CreateNoteForm from "./form";
import NoteManager from "./noteManager";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
        redirect("/login");
    }

    const response = await fetch("http://localhost:5204/api/notesapi", {
        cache: 'no-cache', // This ensures Next.js doesn't cache stale data
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log("STATUS:", response.status, response.statusText, response.headers.get("www-authenticate"));

    if (response.status === 401)
    {
        redirect("/login");
    }

    if (!response.ok) {
        return <div>Failed to load notes.</div>
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