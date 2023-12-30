"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";

import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useTest } from "@/hooks/useTest";
// import Problem from "./_components/problem"

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Result from "./_components/resultDialog"
import type { TestRequest } from "@/lib/types/db";

import Link from "next/link";
import { Button } from "@/components/ui/button";

function TestPage() {
  //get parameters from the link
  const param = useParams();
  const bookId = param.bookId as string;
  const searchParams = useSearchParams();
  const num = searchParams.get("num");
  const repetitive = searchParams.get("repetitive");
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
  // create array to record the result
  // const [ questions, setQuestions ] = useState<string[]>([]);
  const [ answers, setAnswers ] = useState<string[]>([]);

  useEffect(() => {
    const n = problemSet.length;
    setAnswers([...Array(n)].map(() => ''));  
  }, [problemSet]);

  if (problemSet.length < 1){
    return <></>
  }

  return (
    <>
      <div className="flex w-screen">
        <h1 className="m-6 text-3xl font-bold text-white"> Quiz </h1>
        <Link href={`/main/mybooks/${bookId}`} className="m-6 ml-auto">
          <Button
            className="border-red-600 bg-slate-800 text-red-600 hover:border-red-700 hover:bg-slate-800 hover:text-red-700"
            variant="outline"
          >
            Leave
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-between overflow-hidden my-auto mt-20">
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {problemSet.map((problem, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="aspect-square pb-2 border-slate-400 bg-gray-700">
                    <CardHeader>
                      <CardTitle className="text-2xl p-3 text-slate-400">Problem {index+1}</CardTitle>
                      <CardDescription className="pt-10 text-4xl text-center text-slate-300">{problem.meaning}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center space-y-1.5 pt-6">
                      <form>
                        {/* <div className="flex flex-col space-y-1.5">
                          familiarity: {problem.familiarity} 
                          <br></br>
                          Translation:
                        </div> */}
                        <Input
                          className="text-xl font-light border-slate-400 text-slate-100"
                          placeholder="Your answer"
                          onChange={(event) => {
                            setAnswers(answers.map((answer, _index) => {
                                if (_index === index) return event.target.value.trim();
                                else return answer
                              }));
                            // setWarningNum(false);
                          }}
                         />
                        <div className="text-sm text-slate-700 hover:text-slate-400 mt-2">
                          Hint: the word starts with "{problem.content[0]}".
                        </div>
                       </form>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
            <CarouselItem >
              <div className="p-1">
                <Card className="border-slate-400 bg-gray-700">
                  <CardContent className="flex aspect-square items-center justify-items-center p-6 flex-col">
                    <div className="text-3xl font-semibold flex-[4_4_0%] flex items-end justify-center">
                      <p className="text-slate-200">THE END!</p>
                    </div>
                    <div className="flex-[3_3_0%] flex items-center justify-center">
                      <Result question={problemSet} answer={answers}/>
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
