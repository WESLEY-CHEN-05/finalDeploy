"use client";

import { useParams } from "next/navigation";
// import type { Books } from "@/lib/types/db";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useBook } from "@/hooks/useBook";
import { publicEnv } from "@/lib/env/public";

import AddNewWordsDialog from "./_components/addNewWordsDialog";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
// import memoryDB from "./memory";
import DeleteBookDialog from "./_components/deleteBookDialog";
import { useWord } from "@/hooks/useWord";

function BookPage() {
  const param = useParams();
  const bookId = param.bookId as string;
  const router = useRouter();
  const { book, updateBook } = useBook();
  const { words, createWord } = useWord();
  const bookName = book?.title;

  const handlePub = () => {
    if(book?.publicize === false){
      updateBook(bookId, 
        {title: book.title, description: book.description, language: book.language, publicize: true
        , popularity: book.popularity})
    }
  };

  return (
    <div className="w-screen bg-gray-800 text-4xl text-white">
      <div className="flex w-screen">
        <p className="m-6 text-3xl font-bold text-white"> {bookName} </p>
        <Button className="m-6 ml-auto bg-blue-600 text-white hover:bg-blue-700" onClick = {handlePub}>
          Publicize
        </Button>
        <DeleteBookDialog bookId={bookId} />
        <AddNewWordsDialog createWord={createWord}/>
        <Button
          className="m-6 ml-5 bg-green-600 text-white hover:bg-green-700"
          onClick={() => {
            router.push(
              `${publicEnv.NEXT_PUBLIC_BASE_URL}/main/learn/${bookId}`,
            );
          }}
        >
          Learning mode
        </Button>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={words} bookId={bookId} />
      </div>
    </div>
  );
}

export default BookPage;
