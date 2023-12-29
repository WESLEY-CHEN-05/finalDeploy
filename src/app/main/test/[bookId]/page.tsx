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
  type CarouselApi,
} from "@/components/ui/carousel";
// import Result from "./_components/resultDialog"
import type { TestRequest } from "@/lib/types/db";

function TestPage() {
  //get parameters from the link
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
  //create array to record the result
  const [ question, setQuestion] = useState<string[]>([]);
  const [ answer, setAnswer] = useState<string[]>([]);

  return (
    <>
      <div className="flex w-screen">
        <h1 className="m-6 text-3xl font-bold text-white"> Quizzz </h1>
        <br></br>
        <p> Type the ....</p>
      </div>
      <div className="flex flex-col items-center justify-between overflow-hidden">
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {problemSet.map((problem, index) => (
              <CarouselItem key={problem.id}>
                <div className="p-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Problem {index+1}</CardTitle>
                      <CardDescription>Meaning in chinese: {problem.meaning}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form>
                        <div className="flex flex-col space-y-1.5">
                          familiarity: {problem.familiarity} 
                          <br></br>
                          Translation:
                        </div>
                        <Input
                          placeholder="Your answer"
                          onChange={(event) => {
                            setNum(event?.target.value);
                            setWarningNum(false);
                          }}
                         />
                        <div className="flex flex-col space-y-1.5">
                          Hint: the word start with letter "{problem.content[0]}"
                        </div>
                       </form>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
            <CarouselItem >
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">Are you sure to submit your answer?</span>
                  </CardContent>
                  {/* <Result /> */}
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}

export default TestPage;
