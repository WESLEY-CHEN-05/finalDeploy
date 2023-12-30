"use client";

import { useState, useEffect, useCallback } from "react";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import type { BooksCreate, BooksUpdate } from "@/lib/types/db";
import type { Books, Words } from "@/lib/types/db";

export const useBook = () => {
  const param = useParams();

  const bookId = param.bookId as string;
  const [userId, setUserId] = useState("");
  const [books, setBooks] = useState<Books[]>([]);
  const [publicBooks, setPublicBooks] = useState<Books[]>([]);
  const [book, setBook] = useState<Books>();
  const [words, setWords] = useState<Words[]>([]);
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (!session?.user) return;
    setUserId(session?.user?.id);
    // console.log(userId);
  }, [session]);

  const createBook = async ({
    title,
    description,
    language,
    publicize,
  }: BooksCreate) => {
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
    const ret = await res.json();
    const newBook: Books = ret.data;
    setBooks([...books, newBook]);
    return newBook;
  };

  const deleteBook = async ({ bookId }: { bookId: string }) => {
    const res = await fetch(`/api/book/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      return;
    }
  };

  const updateBook = async (
    bookId: string,
    { title, description, language, publicize, popularity }: BooksUpdate,
  ) => {
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
    const ret = await res.json();
    const updatedBook: Books = ret.data;
    setBooks((books) => {
      return books.map((book) => {
        if (book.id === updatedBook.id) {
          return updatedBook;
        } else return book;
      });
    });
    setBook(updatedBook);
    // return data;
  };

  const getsingleBook = useCallback(() => {
    if (!bookId) return;
    const getBook = async (bookId: string) => {
      const res = await fetch(`/api/book/${bookId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        router.push("/main/mybooks");
        return;
      }
      const ret = await res.json();
      setBook(ret.info);
      setWords(ret.data);
      //console.log(ret.info);
    };
    getBook(bookId);
  }, [bookId, router]);

  useEffect(getsingleBook, [bookId, getsingleBook]);

  const getAllPublicBooks = useCallback(() => {
    if (!userId) return;
    const getPublicBooks = async () => {
      const res = await fetch(`/api/publicbooks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        router.push("/main/publicbooks");
        return;
      }
      const ret = await res.json();
      setPublicBooks(ret.data);
    };
    getPublicBooks();
  }, [userId, router]);

  useEffect(getAllPublicBooks, [userId, getAllPublicBooks]);

  // const getBook = async (bookId: string) => {
  //     const res = await fetch(`/api/book/${bookId}`, {
  //         method: "GET",
  //         headers: {
  //             "Content-Type": "application/json",
  //         },
  //     });
  //     if (!res.ok) {
  //         return;
  //     }
  //     const ret = await res.json();
  //     //console.log(ret.info);
  //     return ret.info;
  // }

  // const getWords = async ({bookId}: {bookId: string}) => {
  //     const res = await fetch(`/api/book/${bookId}`, {
  //         method: "GET",
  //         headers: {
  //             "Content-Type": "application/json",
  //         },
  //     });
  //     if (!res.ok) {
  //         return;
  //     }
  //     const ret = await res.json();
  //     return ret.data;
  // }

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
        router.push("/main/mybooks");
        return;
      }
      const ret = await res.json();
      const getbooks: Books[] = ret.data;
      // console.log(getbooks);
      setBooks(getbooks);
      // router.refresh();
      // console.log("hello");
    };
    getBooks();
  }, [userId, router]);

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
    book,
    words,
    books,
    publicBooks,
    bookId,
  };
};
