"use client"

import * as React from "react";
import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTest } from "@/hooks/useTest";
import type { Words,TestRequest } from "@/lib/types/db";

async function TestPage() {
  const param = useParams();
  const bookId = param.bookId as string;
  const router = useRouter();
  const queryParameters = new URLSearchParams(window.location.search);
  const test: TestRequest = {
    num: Number(queryParameters.get("num")),
    repetitive: Boolean(queryParameters.get("repetitive")),
    publicize: Boolean(queryParameters.get("publicize")),
    hard: Boolean(queryParameters.get("hard")),
    star: Boolean(queryParameters.get("star")),
  };
  
  const { createTest } = useTest();
  const newTest: Words[] = await createTest(bookId,test);
  return(
  <>
    <p>${test.num}</p>
    <p>${test.repetitive}</p>
    <p>${test.publicize}</p>
    <p>${test.hard}</p>
    <p>${test.star}</p>
  </>
  );
}

export default TestPage;