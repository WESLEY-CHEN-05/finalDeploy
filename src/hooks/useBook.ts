import { BooksCreate, BooksUpdate } from "@/lib/types/db"
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

    const deleteBook = async ({bookId}: {bookId: string}) => {
        const res = await fetch(`/api/book/${bookId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            return;
        }
    }

    const updateBook = async (bookId: string, {title, description, language, publicize, popularity}: BooksUpdate) => {
        const res = await fetch(`/api/book/${bookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
                language,
                publicize,
                popularity,
            }),
        });
        if (!res.ok) {
            return;
        }
        // const data: BooksUpdate = await res.json();
        // return data;
    }

    const getBook = async ({bookId}: {bookId: string}) => {
        const res = await fetch(`/api/book/${bookId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            return;
        }
        const ret = await res.json();
        return ret.info;
    }

    const getWords = async ({bookId}: {bookId: string}) => {
        const res = await fetch(`/api/book/${bookId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            return;
        }
        const ret = await res.json();
        return ret.data;
    }

    return {
        createBook,
        deleteBook,
        updateBook,
        getBook,
        getWords,
    }
}