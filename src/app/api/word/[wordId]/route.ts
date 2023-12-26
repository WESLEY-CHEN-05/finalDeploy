import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

// import Pusher from "pusher";
import { db } from "@/db";
import { wordsTable } from "@/db/schema";
// import { auth } from "@/lib/auth";
// import { privateEnv } from "@/lib/env/private";
// import { publicEnv } from "@/lib/env/public";
import type { Words, WordsUpdate } from "@/lib/types/db";

// GET /api/word/:wordId
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      wordId: string;
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

    const wordId = params.wordId;

    // Get the book
    const _word = await db.query.wordsTable.findFirst({
      where: eq(wordsTable.displayId, wordId),
      columns: {
        id: false,
        createAt: false,
      },
    });

    const word: Words = {
      id: _word!.displayId,
      content: _word!.content,
      meaning: _word!.meaning,
      familiarity: _word!.familiarity,
      star: _word!.star,
      testNum: _word!.testNum,
      correctNum: _word!.correctNum,
      accuracy: _word!.accuracy,
    };

    return NextResponse.json({ data: word }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// PUT /api/book/:bookId
// body: WordsUpdate
// create a new words
export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      wordId: string;
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

    const wordId = params.wordId;

    const wordinfo: WordsUpdate = await req.json();

    // return word 
    const [_wordTemp] = await db
      .update(wordsTable)
      .set(wordinfo)
      .where(eq(wordsTable.displayId, wordId))
      .returning();
    
    const updateAccuracy = {
      accuracy: ((_wordTemp.testNum === 0) ? 0 : (_wordTemp.correctNum / _wordTemp.testNum))
    }

    const [_word] = await db
    .update(wordsTable)
    .set(updateAccuracy)
    .where(eq(wordsTable.displayId, wordId))
    .returning();

    const updatedWord: Words = {
      id: _word.displayId,
      content: _word.content,
      meaning: _word.meaning,
      familiarity: _word.familiarity,
      star: _word.star,
      testNum: _word.testNum,
      correctNum: _word.correctNum,
      accuracy: _word.accuracy,
    };

    // Trigger pusher event
    // const pusher = new Pusher({
    //   appId: privateEnv.PUSHER_ID,
    //   key: publicEnv.NEXT_PUBLIC_PUSHER_KEY,
    //   secret: privateEnv.PUSHER_SECRET,
    //   cluster: publicEnv.NEXT_PUBLIC_PUSHER_CLUSTER,
    //   useTLS: true,
    // });

    // // WAIT TO CHANGE
    // console.log("HERE");
    // await pusher.trigger(`all`, "friend:change", {});

    return NextResponse.json({ data: updatedWord }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// DELETE /api/word/:wordId
// body: id (books id)
// delete books
export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      wordId: string;
    };
  },
) {
  try {
    // get user from session
    // const session = await auth();
    // if (!session || !session?.user?.id) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const wordId = params.wordId;

    await db
      .delete(wordsTable)
      .where(eq(wordsTable.displayId, wordId))
      .execute();

    // Trigger pusher event
    // const pusher = new Pusher({
    //   appId: privateEnv.PUSHER_ID,
    //   key: publicEnv.NEXT_PUBLIC_PUSHER_KEY,
    //   secret: privateEnv.PUSHER_SECRET,
    //   cluster: publicEnv.NEXT_PUBLIC_PUSHER_CLUSTER,
    //   useTLS: true,
    // });

    // in chatroom channel, we update messenger
    // console.log("TRIGGER");
    // await pusher.trigger(`all`, "friend:delete", {});
    // console.log("TRIGGER END");

    return NextResponse.json(
      {
        message: "Delete successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
