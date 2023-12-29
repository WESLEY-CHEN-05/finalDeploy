"use client";

import * as React from "react";
import { useEffect, useMemo } from "react";

import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { useTest } from "@/hooks/useTest";
import type { TestRequest } from "@/lib/types/db";

function TestPage() {
  const param = useParams();
  const bookId = param.bookId as string;
  const searchParams = useSearchParams();
  const num = searchParams.get("num");
  const repetitive = searchParams.get("repetitve");
  const publicize = searchParams.get("publicize");
  const hard = searchParams.get("hard");
  const star = searchParams.get("star");

  const test: TestRequest = useMemo(() => {
    return {
      num: parseInt(num as string),
      repetitive: repetitive === "true",
      publicize: publicize === "true",
      hard: hard === "true",
      star: star === "true",
    };
  }, [num, repetitive, publicize, hard, star]);

  const { problemSet, createTest } = useTest();

  useEffect(() => {
    createTest(bookId, test);
  }, [createTest, bookId, test]);

  console.log("FINISHED", problemSet);
  return (
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
