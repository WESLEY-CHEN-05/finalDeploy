// import { useState, useEffect } from "react"
import type { WordsUpdate, WordsCreate } from "@/lib/types/db";

export const useWord = () => {


    const createWord = async (bookId: string, {content, meaning}: WordsCreate) => {
        const res = await fetch(`/api/book/${bookId}`,{
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
        const data = await res.json();
        return data;
    }

    const getWord = async (wordId: string) => {
        const res = await fetch(`/api/word/${wordId}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            return;
        }
        const data = await res.json();
        return data;
    }

    const deleteWord = async (wordId: string) => {
        const res = await fetch(`/api/word/${wordId}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            return;
        }
    }

    const updateWord = async (wordId: string, {content, meaning, familiarity, star, correctNum, testNum}: WordsUpdate) => {
        const res = await fetch(`/api/word/${wordId}`,{
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
    }

    return {
        getWord,
        deleteWord,
        updateWord,
        createWord,
    }
}