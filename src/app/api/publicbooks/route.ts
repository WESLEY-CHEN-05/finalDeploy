import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";

// import Pusher from "pusher";
import { db } from "@/db";
import { booksTable } from "@/db/schema";
// import { auth } from "@/lib/auth";
// import { privateEnv } from "@/lib/env/private";
// import { publicEnv } from "@/lib/env/public";
import type { Books } from "@/lib/types/db";

// GET /api/book/:bookId
export async function GET() {
  try {
    // Get user from session
    // const session = await auth();
    // if (!session || !session?.user?.id) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    // const userId = session.user.id;

    // Get the book
    const _books = await db.query.booksTable.findMany({
      columns: {
        id: false,
        createAt: false,
      },
      where: eq(booksTable.publicize, true),
      orderBy: (booksTable, { desc }) => [desc(booksTable.popularity)],
    });

    const booksInfo: Books[] = _books.map((book) => {
      return {
        id: book.displayId,
        title: book.title,
        description: book.description,
        language: book.language,
        publicize: book.publicize,
        popularity: book.popularity,
        authorId: book.authorId,
      };
    });

    return NextResponse.json(
      {
        data: booksInfo,
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
