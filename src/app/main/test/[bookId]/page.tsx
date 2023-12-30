"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import Problem from "./_components/problem"
import { Input } from "@/components/ui/input";
import { useTest } from "@/hooks/useTest";
import type { TestRequest } from "@/lib/types/db";

import { useUser } from "@/hooks/useUser";
import { useBook } from "@/hooks/useBook";
import Result from "./_components/resultDialog";

function TestPage() {
  //get parameters from the link
  const param = useParams();
  const bookId = param.bookId as string;
  const searchParams = useSearchParams();
  const num = searchParams.get("num");
  const repetitive = searchParams.get("repetitive");
  // const publicize = searchParams.get("publicize");
  const hard = searchParams.get("hard");
  const star = searchParams.get("star");

  const {userId} = useUser();
  const {book} = useBook();
  const publicize = (userId !== book?.authorId);

  const test: TestRequest = useMemo(() => {
    return {
      num: parseInt(num as string),
      repetitive: repetitive === "true",
      publicize: publicize,
      hard: hard === "true",
      star: star === "true",
    };
  }, [num, repetitive, publicize, hard, star]);

  const { problemSet, createTest } = useTest();
  console.log(problemSet, test, userId, book);

  const memoizedCreateTest = useMemo(() => createTest, [createTest]);
  const memoizedTest = useMemo(() => test, [test]);
  const memoizedUserId = useMemo(() => userId, [userId]);
  const memoizedBook = useMemo(() => book, [book]);

  useEffect(() => {
    if (memoizedUserId && memoizedBook){
      console.log("VERIF", memoizedCreateTest, bookId, memoizedTest, memoizedUserId, memoizedBook);
      memoizedCreateTest(bookId, memoizedTest);
      console.log("HEOOL");
    };
  }, [memoizedCreateTest, bookId, memoizedUserId, memoizedBook, memoizedTest]);
  // create array to record the result
  // const [ questions, setQuestions ] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const n = problemSet.length;
    setAnswers([...Array(n)].map(() => ""));
  }, [problemSet]);

  if (problemSet.length < 1) {
    return <></>;
  }

  return (
    <>
      <div className="flex w-screen">
        <h1 className="m-6 text-3xl font-bold text-white"> Quiz </h1>
        <Link href={`/main/books/${bookId}`} className="m-6 ml-auto">
          <Button
            className="border-red-600 bg-slate-800 text-red-600 hover:border-red-700 hover:bg-slate-800 hover:text-red-700"
            variant="outline"
          >
            Leave
          </Button>
        </Link>
      </div>
      <div className="my-auto mt-20 flex flex-col items-center justify-between overflow-hidden">
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {problemSet.map((problem, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="aspect-square border-slate-400 bg-gray-700 pb-2">
                    <CardHeader>
                      <CardTitle className="p-3 text-2xl text-slate-400">
                        Problem {index + 1}
                      </CardTitle>
                      <CardDescription className="pt-10 text-center text-4xl text-slate-300">
                        {problem.meaning}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center space-y-1.5 pt-6">
                      <form>
                        {/* <div className="flex flex-col space-y-1.5">
                          familiarity: {problem.familiarity} 
                          <br></br>
                          Translation:
                        </div> */}
                        <Input
                          className="border-slate-400 text-xl font-light text-slate-100"
                          placeholder="Your answer"
                          onChange={(event) => {
                            setAnswers(
                              answers.map((answer, _index) => {
                                if (_index === index)
                                  return event.target.value.trim();
                                else return answer;
                              }),
                            );
                            // setWarningNum(false);
                          }}
                        />
                        <div className="mt-2 text-sm text-slate-700 hover:text-slate-400">
                          Hint: the word starts with "{problem.content[0]}".
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
            <CarouselItem>
              <div className="p-1">
                <Card className="border-slate-400 bg-gray-700">
                  <CardContent className="flex aspect-square flex-col items-center justify-items-center p-6">
                    <div className="flex flex-[4_4_0%] items-end justify-center text-3xl font-semibold">
                      <p className="text-slate-200">THE END!</p>
                    </div>
                    <div className="flex flex-[3_3_0%] items-center justify-center">
                      <Result question={problemSet} answer={answers} isPrivate={(!publicize)}/>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="bg-gray-400" />
          <CarouselNext className="bg-gray-400" />
        </Carousel>
      </div>
    </>
  );
}

export default TestPage;
