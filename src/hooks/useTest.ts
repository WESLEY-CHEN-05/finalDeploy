import { useState, useEffect } from "react";

import { useSession } from "next-auth/react";
import { TestRequest } from "@/lib/types/db";
import { useRouter } from 'next/router'
import { Router } from "lucide-react";

export const useTest = () => {
  const [userId, setUserId] = useState("");
  //const [test, useTest] = useState;
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (!session?.user) return;
    setUserId(session?.user?.id);
    // console.log(userId);
  }, [session]);


  const createTest = async(
    bookId: string,
  { num,
    repetitive,
    publicize,
    star,
    hard,
  }: TestRequest) => {
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
    router.push(`main/mybooks/${bookId}`);
   }
   const ret = await res.json();
   return ret.data;
  };


  return {
    createTest,
  };
};
