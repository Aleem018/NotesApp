import ResetForm from "./resetForm";
export default async function ResetPasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>;
})
{
    const { token } = await searchParams;
    if (!token) return <p className="mx-auto my-auto text-black">Invalid reset link.</p>;
    
    return <ResetForm token={token} />
}