import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"

import { Button } from "@/components/ui/button";

import memoryDB from "./memory"

function BookPage() {

  const bookName = "SAMPLE book name";
  const ___bookId = "sample_book_id";

  return (
    <div className="w-screen bg-gray-800 text-4xl text-white">
      <div className="flex w-screen">
        <p className="m-6 text-3xl font-bold text-white"> {bookName} </p>
        <Button className="m-6 ml-auto bg-yellow-600 text-black hover:bg-yellow-700">
          Create new word
        </Button>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={memoryDB} bookId={___bookId}/>
      </div>
    </div>
  )
}

export default BookPage;