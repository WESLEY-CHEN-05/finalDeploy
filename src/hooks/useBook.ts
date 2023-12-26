// create book
// update book
// delete book

import { BooksCreate } from "@/lib/types/db"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"


export const useBook = () => { 
    const [userId, setUserId] = useState("");
    const { data: session } = useSession();
    useEffect(() => {
        if (!session?.user) return;
        setUserId(session?.user?.id);
    }, [session]);

    const createBook = async ({title, description, language, publicize}: BooksCreate) => {
        const res = await fetch(`/api/user/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
                language,
                publicize,
            }),
        });
        if (!res.ok) {
            return;
        }
        const data: BooksCreate = await res.json();
        return data;
    }
    return {
        createBook,
    }
}