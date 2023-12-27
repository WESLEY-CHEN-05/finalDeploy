"use client"
// import { Button } from "@/components/ui/button";
import type { Books } from "@/lib/types/db";
import AddBookDialog from "./_components/addBookDialog";
import {useBook} from "@/hooks/useBook";
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import {useRouter} from "next/navigation";

import Book from "./_components/Book";
import { get } from "http";

function DocsPage() {
  const { books } = useBook();
  const sampleInfo: Books = {
    id: "3jeiofn9eflqwqwjoif",
    title: "Sample book",
    description: "Sample Description",
    language: "English",
    publicize: false,
    popularity: 0,
  };


  // const books = getBooks() as unknown as Books[];
  // getBooks();
  // console.log(books);

  return (
    <div className="w-screen bg-gray-800">
      <div className="flex w-screen">
        <p className="m-6 text-3xl font-bold text-white"> My books </p>
        <AddBookDialog />
      </div>
      <div className="flex w-screen flex-wrap justify-start">
        {
          books.map((book) => {
            return (<Book info={book}></Book>)
          })
        }
        {/* <Book info={sampleInfo}></Book>
        <Book info={sampleInfo}></Book>
        <Book info={sampleInfo}></Book>
        <Book info={sampleInfo}></Book>
        <Book info={sampleInfo}></Book>
        <Book info={sampleInfo}></Book>
        <Book info={sampleInfo}></Book>
        <Book info={sampleInfo}></Book>
        <Book info={sampleInfo}></Book>
        <Book info={sampleInfo}></Book>
        <Book info={sampleInfo}></Book>
        <Book info={sampleInfo}></Book>
        <Book info={sampleInfo}></Book>
        <Book info={sampleInfo}></Book>
        <Book info={sampleInfo}></Book>
        <Book info={sampleInfo}></Book>
        <Book info={sampleInfo}></Book>
        <Book info={sampleInfo}></Book> */}
      </div>
    </div>
  );
}
export default DocsPage;
