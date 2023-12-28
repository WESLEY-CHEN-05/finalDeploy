import type { BooksCreate, BooksUpdate } from "@/lib/types/db"
import { useState, useEffect, use, useCallback } from "react"
import { useSession } from "next-auth/react"
import type { Books } from "@/lib/types/db"
import { useRouter } from "next/navigation"


export const useBook = () => { 
    const [userId, setUserId] = useState("");
    const [books, setBooks] = useState<Books[]>([]);
    const router = useRouter();
    const { data: session } = useSession();
    useEffect(() => {
        if (!session?.user) return;
        setUserId(session?.user?.id);
        // console.log(userId);
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

    const getBook = async (bookId: string) => {
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
        //console.log(ret.info);
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

    const getinitialBooks = useCallback(() => {
        if (!userId) return;
        const getBooks = async () => {
            const res = await fetch(`/api/user/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                // router.refresh();
                return;
            }
            const ret = await res.json();
            const getbooks: Books[] = ret.data;
            // console.log(getbooks);
            setBooks(getbooks);
            // router.refresh();
            console.log("hello");
        };
        getBooks();
    }, [userId]);

    useEffect(getinitialBooks, [userId, getinitialBooks]);
    
    // useEffect(() => {
    //     // console.log(userId);
    //     if (!userId) return;
    //     const getBooks = async () => {
    //         const res = await fetch(`/api/user/${userId}`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //         if (!res.ok) {
    //             // router.refresh();
    //             return;
    //         }
    //         const ret = await res.json();
    //         const getbooks: Books[] = ret.data;
    //         // console.log(getbooks);
    //         setBooks(getbooks);
    //         // router.refresh();
    //         // console.log("hello");
    //     };
    //     getBooks();
    // },[userId]);
        

    return {
        createBook,
        deleteBook,
        updateBook,
        getBook,
        getWords,
        books,
    }
}