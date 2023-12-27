import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

// import Pusher from "pusher";
import { db } from "@/db";
import { booksTable, wordsTable } from "@/db/schema";
// import { auth } from "@/lib/auth";
// import { privateEnv } from "@/lib/env/private";
// import { publicEnv } from "@/lib/env/public";
import type { Books, BooksUpdate, Words, WordsCreate } from "@/lib/types/db";

// GET /api/book/:bookId
export async function GET(
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

    // Get the book
    const _words = await db.query.booksTable.findFirst({
      where: eq(booksTable.displayId, bookId),
      columns: {
        id: false,
        createAt: false,
        authorId: false,
      },
      with: {
        words: {
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

    const bookInfo: Books = {
      id: _words!.displayId,
      title: _words!.title,
      description: _words!.description,
      language: _words!.language,
      publicize: _words!.publicize,
      popularity: _words!.popularity,
    };

    const words: Words[] = _words!.words.map((word) => ({
      id: word.displayId,
      content: word.content,
      meaning: word.meaning,
      familiarity: word.familiarity,
      star: word.star,
      testNum: word.testNum,
      correctNum: word.correctNum,
      accuracy: word.accuracy,
    }));

    return NextResponse.json(
      {
        info: bookInfo,
        data: words,
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

// POST /api/book/:bookId
// body: WordsCreate
// create a new words
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

    const wordinfo: WordsCreate = await req.json();

    // creating a new chat room and return the chat room id
    const [_word] = await db
      .insert(wordsTable)
      .values({
        content: wordinfo.content,
        meaning: wordinfo.meaning,
        bookId: bookId,
      })
      .returning();

    const newWord: Words = {
      id: _word.displayId,
      content: _word.content,
      meaning: _word.meaning,
      familiarity: _word.familiarity,
      star: false,
      testNum: 0,
      correctNum: 0,
      accuracy: 0,
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

    return NextResponse.json({ data: newWord }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// PUT /api/book/:bookId
// body: WordsUpdate
// update book information
export async function PUT(
  req: NextRequest,
  { params }: { params: { bookId: string } },
) {
  try {
    // Get user from session
    // const session = await auth();
    // if (!session || !session?.user?.id) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    // const userId = session.user.id;

    const bookId = params.bookId;
    const _updatedInfo: BooksUpdate = await req.json();

    // Update document
    const [_updatedBook] = await db
      .update(booksTable)
      .set(_updatedInfo)
      .where(eq(booksTable.displayId, bookId))
      .returning();

    const updatedBook: Books = {
      id: _updatedBook.displayId,
      title: _updatedBook.title,
      description: _updatedBook.description,
      language: _updatedBook.language,
      publicize: _updatedBook.publicize,
      popularity: _updatedBook.popularity,
    };

    // Trigger pusher event
    // const pusher = new Pusher({
    //   appId: privateEnv.PUSHER_ID,
    //   key: publicEnv.NEXT_PUBLIC_PUSHER_KEY,
    //   secret: privateEnv.PUSHER_SECRET,
    //   cluster: publicEnv.NEXT_PUBLIC_PUSHER_CLUSTER,
    //   useTLS: true,
    // });

    // // Private channels are in the format: private-...
    // await pusher.trigger(`private-${updatedDoc.displayId}`, "doc:update", {
    //   senderId: userId,
    //   document: {
    //     id: updatedDoc.displayId,
    //     title: updatedDoc.title,
    //     content: updatedDoc.content,
    //   },
    // });

    return NextResponse.json({ data: updatedBook }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error", description: error },
      { status: 500 },
    );
  }
}

// DELETE /api/book/:bookId
// body: id (books id)
// delete books
export async function DELETE(
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
    // get user from session
    // const session = await auth();
    // if (!session || !session?.user?.id) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const bookId = params.bookId;

    await db
      .delete(booksTable)
      .where(eq(booksTable.displayId, bookId))
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
