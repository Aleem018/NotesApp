import NoteManager from "./noteManager";
import LogoutBtn from "./logoutBtn";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { HiOutlinePlus } from "react-icons/hi";
import Image from "next/image";
import backgroundImage from "@/public/notebg.jpg";

interface Note {
    title: string;
    content: string;
    id: number;
    createdAt: string;
}

export default async function NotesDisplay() {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/");
    }

    const response = await fetch(`${process.env.API_URL}/api/notesapi`, {
        cache: 'no-cache', // This ensures Next.js doesn't cache stale data
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

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
            <div className="fixed inset-0 -z-5 overflow-hidden opacity-40">
                <Image 
                src={backgroundImage}
                alt="background image"
                placeholder="blur"
                quality={75}
                fill
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority
                />
            </div>
            <div className="p-8 bg-cover bg-center min-h-screen">

                <div className="flex border-b justify-between items-center">
                    <h1 className="text-3xl text-black font-bold mb-8">Your Notes</h1>
                    <div className="flex mb-8">
                        <a href="./create-note" className="flex p-2 border border-zinc-400 bg- rounded-xl items-center text-black backdrop-blur gap-1 transition-transform hover:shadow-xl hover:bg-teal-500 hover:-translate-y-1 mr-20">Add a Note <HiOutlinePlus className="h-6 w-6 hover:animate-[spin_1s_linear_1]" /></a>
                        <LogoutBtn />
                    </div>
                </div>

                <NoteManager notes={notes} />

            </div>
        </main>

    )
}