"use client"
import { Button } from "@/components/ui/button";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useParams } from "next/navigation";
// import memoryDB from "./memory";
import  DeleteBookDialog  from "./_components/deleteBookDialog";
import { useBook } from "@/hooks/useBook";
// import type { Books } from "@/lib/types/db";
import { useRouter } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import AddNewWordsDialog from "./_components/addNewWordsDialog";

function BookPage() {
  const param = useParams();
  const ___bookId = param.bookId as string;
  const router = useRouter();
  const { book, words } = useBook();
  const bookName = book?.title;

  return (
    <div className="w-screen bg-gray-800 text-4xl text-white">
      <div className="flex w-screen">
        <p className="m-6 text-3xl font-bold text-white"> {bookName} </p>
        <DeleteBookDialog bookId={___bookId} />
        <AddNewWordsDialog />
        <Button className="m-6 ml-5 bg-green-600 text-white hover:bg-green-700" onClick = {() => {router.push(`${publicEnv.NEXT_PUBLIC_BASE_URL}/main/learn/${___bookId}`)}}>Learning mode
        </Button>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={words} bookId={___bookId} />
      </div>
    </div>
  );
}

export default BookPage;
