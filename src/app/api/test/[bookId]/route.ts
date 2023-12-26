import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

// import Pusher from "pusher";
import { db } from "@/db";
import { booksTable, wordsTable } from "@/db/schema";
// import { auth } from "@/lib/auth";
// import { privateEnv } from "@/lib/env/private";
// import { publicEnv } from "@/lib/env/public";
import type { TestRequest, Words } from "@/lib/types/db";

// POST /api/test/:bookId
export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      bookId: string;
    };
  },
) {
  try {
    // Get user from session
    // const session = await auth();
    // if (!session || !session?.user?.id) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    // const userId = session.user.id;

    const bookId = params.bookId;

    const testReq: TestRequest = await req.json();

    // Get the question
    const _words = await db.query.booksTable.findFirst({
      where: eq(booksTable.displayId, bookId),
      columns: {},
      with: {
        words: {
          where: (testReq.star ? eq(wordsTable.star, true) : undefined),
          orderBy: (testReq.hard ? 
            ( 
              testReq.publicize ? 
                (wordsTable, { asc }) => [asc(wordsTable.accuracy)] :
                (wordsTable, { asc }) => [asc(wordsTable.familiarity)]
            ) : 
              undefined),
          columns: {
            displayId: true,
            content: true,
            meaning: true,
            familiarity: true,
            star: true,
            testNum: true,
            correctNum: true,
            accuracy: true,
          },
        },
      },
    });

    const len: number = _words!.words.length;
    const quiz: Words[] = [];
    // const index: number[] = [];

    const getRandomInt = (max: number) => Math.floor(Math.random() * max);

    // select
    // repetitive
    if (testReq.repetitive){
        for (let i = 0; i < testReq.num; i++){
            const rand = (testReq.hard ? 
                getRandomInt(1 + Math.round((i / testReq.num) * (len - 1))) :
                getRandomInt(len)
            );
            const word = _words!.words[rand]
            const singleQuiz = {
                id: word.displayId,
                content: word.content,
                meaning: word.meaning,
                familiarity: word.familiarity,
                star: word.star,
                testNum: word.testNum,
                correctNum: word.correctNum,
                accuracy: word.accuracy,
            }
            quiz.push(singleQuiz)
        }
    }
    // not repetitive
    else{
        // error
        if (testReq.num > len){
            return NextResponse.json(
                { 
                  error: "Bad Request", 
                  description: "In non-repetitive case, request problem should not be larger than the number of the words in the book"
                },
                { status: 400 },
              );
        }

        const index: number[] = [];
        for (let i = 0; i < len; i++) index.push(i);

        if (testReq.hard){
            const probUnit = 1 / 2 / (len - testReq.num);
            for (let i = len - 1; i >= testReq.num; i--){
                const prob = ((len - i) * probUnit);
                const rand = Math.random();
                if (rand > prob){
                    const randIndex = getRandomInt(i + 1);
                    const temp = index[randIndex];
                    index[randIndex] = index[i];
                    index[i] = temp; 
                }
            }
        }
        else{
            for (let i = len - 1; i > 0; i--){
                const rand = getRandomInt(i + 1);
                const temp = index[i]
                index[i] = index[rand];
                index[rand] = temp;
            }
        }


        for (let i = 0; i < testReq.num; i++){
            const word = _words!.words[index[i]]
            const singleQuiz = {
                id: word.displayId,
                content: word.content,
                meaning: word.meaning,
                familiarity: word.familiarity,
                star: word.star,
                testNum: word.testNum,
                correctNum: word.correctNum,
                accuracy: word.accuracy,
            }
            quiz.push(singleQuiz)
        }
    }

    // shuffle
    for (let i = quiz.length - 1; i > 0; i--){
        const rand = getRandomInt(i + 1);
        const temp = quiz[i]
        quiz[i] = quiz[rand];
        quiz[rand] = temp;
    }

    return NextResponse.json({ 
      data: quiz,
    //   index: index
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error"},
      { status: 500 },
    );
  }
}

