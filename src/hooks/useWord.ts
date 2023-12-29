import { useState, useEffect, useCallback } from "react";

import { useParams } from "next/navigation";

import type { WordsUpdate, WordsCreate } from "@/lib/types/db";
import type { Words } from "@/lib/types/db";

export const useWord = () => {
  const param = useParams();
  const bookId = param.bookId as string;

  const [words, setWords] = useState<Words[]>([]);

  const getInitialWord = useCallback(() => {
    if (!bookId) return;
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
      setWords(ret.data);
    };
    getBook(bookId);
  }, [bookId]);

  useEffect(getInitialWord, [bookId, getInitialWord]);

  const createWord = async (
    bookId: string,
    { content, meaning }: WordsCreate,
  ) => {
    const res = await fetch(`/api/book/${bookId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        meaning,
      }),
    });
    if (!res.ok) {
      return;
    }
    const ret = await res.json();
    const newWord: Words = ret.data;
    setWords([...words, newWord]);
    return newWord;
  };

  const getWord = async (wordId: string) => {
    const res = await fetch(`/api/word/${wordId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      return;
    }
    const ret = await res.json();
    const data: Words = ret.data;
    return data;
  };

  const deleteWord = useCallback(async (wordId: string) => {
    const res = await fetch(`/api/word/${wordId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      return;
    }
    setWords((words) => {
      return words.filter((word) => word.id !== wordId);
    });
  }, []);

  const updateWord = useCallback(
    async (
      wordId: string,
      { content, meaning, familiarity, star, correctNum, testNum }: WordsUpdate,
    ) => {
      const res = await fetch(`/api/word/${wordId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          meaning,
          familiarity,
          star,
          correctNum,
          testNum,
        }),
      });
      if (!res.ok) {
        return;
      }
      const ret = await res.json();
      const updatedWord: Words = ret.data;
      setWords((words) => {
        return words.map((word) => {
          if (word.id === updatedWord.id) {
            return updatedWord;
          } else return word;
        });
      });
      return updatedWord;
    },
    [],
  );

  return {
    bookId,
    words,
    getWord,
    deleteWord,
    updateWord,
    createWord,
  };
};
