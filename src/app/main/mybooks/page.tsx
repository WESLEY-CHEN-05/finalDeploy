"use client"
import { Button } from "@/components/ui/button";
import type { Books } from "@/lib/types/db";

import Book from "./_components/Book";
import { useBook } from "@/hooks/useBook"

function DocsPage() {
  const { createBook } = useBook();
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
        <Button className="m-6 ml-auto bg-yellow-600 text-black hover:bg-yellow-700">
          Create new books
        </Button>
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
