import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

// import Pusher from "pusher";
import { db } from "@/db";
import { usersTable, booksTable } from "@/db/schema";
import { auth } from "@/lib/auth";
// import { privateEnv } from "@/lib/env/private";
// import { publicEnv } from "@/lib/env/public";
import type {
  UserPublicInfo,
  UserUpdate,
  Books,
  BooksCreate,
} from "@/lib/types/db.ts";

// GET /api/userId/:userId
// return all his books
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      userId: string;
    };
  },
) {
  try {
    // get user from session （NEED NOT COMMENT WHEN COMBINED)
    const session = await auth();
    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized qq" }, { status: 401 });
    }

    // const userId = session?.user?.id;
    // if (userId !== params.userId) {
    //   return NextResponse.json({ error: "Unauthorized rr" }, { status: 401 });
    // }

    const userId = params.userId;

    const _booksdata = await db.query.usersTable.findFirst({
      where: eq(usersTable.displayId, userId),
      columns: {
        displayId: true,
        username: true,
        about: true,
        experience: true,
      },
      with: {
        books: {
          columns: {
            id: false,
            createAt: false,
          },
        },
      },
    });

    const userInfo: UserPublicInfo = {
      id: _booksdata!.displayId,
      username: _booksdata!.username,
      about: _booksdata!.about,
      experience: _booksdata!.experience,
    };

    const booksdata: Books[] = _booksdata!.books!.map((book) => ({
      id: book.displayId,
      title: book.title,
      description: book.description,
      language: book.language,
      publicize: book.publicize,
      popularity: book.popularity,
      authorId: book.authorId,
    }));

    return NextResponse.json(
      {
        info: userInfo,
        data: booksdata,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// POST /api/userId/:userId
// body: BooksCreate
// create a new books
export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      userId: string;
    };
  },
) {
  try {
    // get user from session
    const session = await auth();
    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session?.user?.id;
    if (userId !== params.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookinfo: BooksCreate = await req.json();

    // creating a new chat room and return the chat room id
    const [_book] = await db
      .insert(booksTable)
      .values({
        title: bookinfo.title,
        description: bookinfo.description,
        language: bookinfo.language,
        publicize: bookinfo.publicize,
        authorId: userId,
      })
      .returning();

    const newBook: Books = {
      id: _book.displayId,
      title: _book.title,
      description: _book.description,
      language: _book.language,
      publicize: _book.publicize,
      popularity: _book.popularity,
      authorId: _book.authorId,
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

    return NextResponse.json({ data: newBook }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error ", description: error },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      userId: string;
    };
  },
) {
  try {
    // Get user from session
    const session = await auth();
    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session?.user?.id;
    if (userId !== params.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userinfo: UserUpdate = await req.json();

    // return word
    const [_userTemp] = await db
      .update(usersTable)
      .set(userinfo)
      .where(eq(usersTable.displayId, userId))
      .returning();

    const updatedUser: UserPublicInfo = {
      id: _userTemp.displayId,
      username: _userTemp.username,
      about: _userTemp.about,
      experience: _userTemp.experience,
    };

    return NextResponse.json({ data: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
