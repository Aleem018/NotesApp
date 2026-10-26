import CreateNoteForm from "./form";
export default function CreateNote() {
    return (
        <main className="min-h-screen bg-[linear-gradient(58deg,_#dfff00,_black_51%)] sm:bg-[linear-gradient(38deg,_#dfff00,_black_40%)] lg:bg-gradient-to-tr lg:from-[#dfff00] lg:to-[52%] lg:to-black">
            <div className="flex items-center justify-center lg:p-10 sm:p-15">
                <h1 className="text-3xl font-bold bg-black text-center p-10">Note de App</h1>
            </div>
            <CreateNoteForm />
        </main>

    )
}