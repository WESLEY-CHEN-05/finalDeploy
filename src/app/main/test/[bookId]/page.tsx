"use client"

import * as React from "react";
// import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
// import { useRouter } from "next/navigation";
import { useTest } from "@/hooks/useTest";
import type { TestRequest } from "@/lib/types/db";

function TestPage() {
  const param = useParams();
  const bookId = param.bookId as string;
  // const router = useRouter();
  const queryParameters = new URLSearchParams(window.location.search);
  const test: TestRequest = {
    num: Number(queryParameters.get("num")),
    repetitive: Boolean(queryParameters.get("repetitive")),
    publicize: Boolean(queryParameters.get("publicize")),
    hard: Boolean(queryParameters.get("hard")),
    star: Boolean(queryParameters.get("star")),
  };

  console.log(test);
  
  const { problemSet, createTest } = useTest();
  createTest(bookId, test);
  
  
  console.log(problemSet);
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