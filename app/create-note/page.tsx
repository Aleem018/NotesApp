import CreateNoteForm from "./form";
import LogoutBtn from "./logoutBtn";
export default function CreateNote() {
    return (
        <main>
            <div className="flex items-center justify-center bg-black p-10">
                <h1 className="text-3xl font-bold bg-black text-center p-10">Note de App</h1>
                <LogoutBtn />
            </div>
            <CreateNoteForm />
        </main>

    )
}