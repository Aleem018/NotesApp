"use server";

import { cookies } from "next/headers";

export async function saveToken(token: string)
{
    const cookieStore = await cookies();

    cookieStore.set("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 // expires in one day
    });
}