"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useWord } from "@/hooks/useWord";

// import type { WordsCreate } from "@/lib/types/db";

function AddNewWordsDialog() {
  const [content, setContent] = useState<string>("");
  const [meaning, setMeaning] = useState<string>("");
  const { createWord } = useWord();
  const param = useParams();
  const _bookId = param.bookId as string;

  const handleClick = () => {
    if (content !== "" && meaning !== "") {
      createWord(_bookId, { content, meaning });
      setContent("");
      setMeaning("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="m-6 ml-5 bg-yellow-600 text-black hover:bg-yellow-700">
          Create new word
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new word</DialogTitle>
          <DialogDescription>
            <p>Enter the word and its translation.</p>
            <p>You can click on "add another" if you want to add more words.</p>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleClick} className="flex flex-col gap-4">
          <Input
            placeholder="Word"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Input
            placeholder="Translation"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
          />
          <div className="flex flex-row">
            <Button className="ml-auto" onClick={handleClick}>
              Add another
            </Button>
            <Button type="submit" className="ml-4">
              Finish
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewWordsDialog;
