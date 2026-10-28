import CreateNoteForm from "./form";
export default function CreateNote() {
    return (
        <main className="min-h-screen bg-black/70">
            <div className="flex items-center justify-center lg:p-10 sm:p-15">
                <h1 className="text-3xl font-bold text-center p-10">Note de App</h1>
            </div>
            <CreateNoteForm />
        </main>

    )
}