"use client"
import { Button } from "@/components/ui/button";
import type { Books } from "@/lib/types/db";
import AddBookDialog from "./_components/addBookDialog";

import Book from "./_components/Book";
// import { useBook } from "@/hooks/useBook"

function DocsPage() {
  // const { createBook } = useBook();
  const sampleInfo: Books = {
    id: "3jeiofn9eflqwqwjoif",
    title: "Sample book",
    description: "Sample Description",
    language: "English",
    publicize: false,
    popularity: 0,
  };

  return (
    <div className="w-screen bg-gray-800">
      <div className="flex w-screen">
        <p className="m-6 text-3xl font-bold text-white"> My books </p>
        <AddBookDialog />
      </div>
      <div className="flex w-screen flex-wrap justify-start">
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
        <Book info={sampleInfo}></Book>
        <Book info={sampleInfo}></Book>
      </div>
    </div>
  );
}
export default DocsPage;
