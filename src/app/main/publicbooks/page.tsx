"use client"
import { Button } from "@/components/ui/button";
import type { Books } from "@/lib/types/db";

import Book from "./_components/Book";
import { useBook } from "@/hooks/useBook";

function DocsPage() {
  console.log("render");
  const { publicBooks } = useBook();
  // const sampleInfo: Books = {
  //   id: "3jeiofn9eflqwqwjoif",
  //   title: "Sample book",
  //   description: "Sample Description",
  //   language: "English",
  //   publicize: true,
  //   popularity: 0,
  //   authorId: "3jeiofn9eflqwqwjoif",
  // };

  return (
    <div className="w-screen">
      <div className="flex w-screen">
        <p className="m-6 text-3xl font-bold text-white"> Public books </p>
        <Button className="m-6 ml-auto bg-yellow-600 text-black hover:bg-yellow-700">
          Create new books
        </Button>
      </div>
      <div className="flex w-screen flex-wrap justify-start">
        {publicBooks.map((book) => {
          return (
            <div key={book.id}>
              <Book info={book}></Book>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default DocsPage;
