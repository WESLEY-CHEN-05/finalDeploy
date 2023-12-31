import { useState, useEffect, useCallback } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import type { TestRequest } from "@/lib/types/db";
import type { Words } from "@/lib/types/db";

export const useTest = () => {
  const [userId, setUserId] = useState("");
  const [problemSet, setProblemSet] = useState<Words[]>([]);
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (!session?.user) return;
    setUserId(session?.user?.id);
    // console.log(userId);
  }, [session]);

  const createTest = useCallback(
    async (
      bookId: string,
      { num, repetitive, publicize, star, hard }: TestRequest,
    ) => {
      const res = await fetch(`/api/test/${bookId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          num,
          repetitive,
          publicize,
          star,
          hard,
        }),
      });
      if (!res.ok) {
        router.push(`/main/books/${bookId}`);
      }
      const ret = await res.json();
      setProblemSet(ret.data);
      return ret.data;
    },
    [router],
  );

  return {
    userId,
    problemSet,
    createTest,
  };
};
