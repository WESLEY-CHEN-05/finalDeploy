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

import { useToast } from "@/components/ui/use-toast"
import PublicizeBookDialog from "./_components/publicizeDialog";
import { Badge } from "@/components/ui/badge";

function BookPage() {
  const param = useParams();
  const bookId = param.bookId as string;
  const router = useRouter();
  const { book, updateBook } = useBook();
  const { words, createWord } = useWord();

  const { toast } = useToast();

  return (
    <div className="w-screen bg-gray-800 text-4xl text-white">
      <div className="flex w-screen">
        <div>
          <div className="flex">
            <p className="m-6 mb-2 text-3xl font-bold text-white"> {(book?.title) ? book.title : ""} </p>
            <div className="mt-auto mb-2">
            <Badge
              variant="outline"
              className="mr-3 border-slate-800 bg-blue-600 text-slate-100"
            >
              {book?.language}
            </Badge>
            <Badge
              variant="outline"
              className={
                "border-slate-800 text-slate-100 " +
                (book?.publicize ? " bg-green-600 " : " bg-orange-600 ")
              }
            >
              {book?.publicize ? "Public" : "Private"}
            </Badge>
            </div>
          </div>
          <p className="m-6 mt-2 text-base font-light text-slate-300">{(book?.description) ? book.description : ""}</p>
        </div>
        <Button
          className="m-6 ml-auto border-green-600 hover:border-green-700 text-green-600 hover:text-green-700 hover:bg-slate-800"
          onClick={() => {
            if (!words || words.length < 2){
              toast({
                title: "Not enough words",
                description: "At least two words are required in this book.",
              })
            }
            else{
              router.push(
                `${publicEnv.NEXT_PUBLIC_BASE_URL}/main/learn/${bookId}`,
              );
            }
          }}
          variant="outline"
        >
          Learn
        </Button>
        {/* <Button 
          className="m-6 ml-5 border-blue-500 hover:border-blue-600 text-blue-500 hover:text-blue-600 hover:bg-slate-800" 
          onClick = {() => handlePub()}
          variant="outline">
            Publicize
        </Button> */}
        { book?.publicize ?
          <></>
          :
          <PublicizeBookDialog bookId={bookId}  updateBook={updateBook}/>
        }
        <DeleteBookDialog bookId={bookId} />
        <AddNewWordsDialog createWord={createWord}/>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={words} bookId={bookId} />
      </div>
    </div>
  );
}

export default BookPage;
