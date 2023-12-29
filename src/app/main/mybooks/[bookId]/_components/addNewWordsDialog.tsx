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
import type { Words, WordsCreate } from "@/lib/types/db";

function AddNewWordsDialog({
  createWord,
}: {
  createWord: (
    bookId: string,
    { content, meaning }: WordsCreate,
  ) => Promise<Words | undefined>;
}) {
  const [content, setContent] = useState<string>("");
  const [meaning, setMeaning] = useState<string>("");
  const [warningContent, setWarningContent] = useState(false);
  const [warningMeaning, setWarningMeaning] = useState(false);
  const param = useParams();
  const _bookId = param.bookId as string;

  const [dialogOpen, setDialogOpen] = useState(false);

  function isWhitespaceOrNewline(inputStr: string) {
    return /^\s*$/.test(inputStr);
  }

  const handleClick = (close: boolean) => {
    if (isWhitespaceOrNewline(content)) {
      setWarningContent(true);
      return;
    }
    if (isWhitespaceOrNewline(meaning)) {
      setWarningMeaning(true);
      return;
    }
    if (close) setDialogOpen(false);
    createWord(_bookId, { content, meaning });
    setContent("");
    setMeaning("");
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
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
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Word"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setWarningContent(false);
            }}
            className = {warningContent ? "border-red-500" : ""}
          />
          <Input
            placeholder="Translation"
            value={meaning}
            onChange={(e) => {
              setMeaning(e.target.value);
              setWarningMeaning(false);
            }}
            className = {warningMeaning ? "border-red-500" : ""}
          />
          <div className="flex flex-row">
            <Button className="ml-auto" onClick={() => handleClick(false)}>
              Add another
            </Button>
            <Button
              type="submit"
              className="ml-4"
              onClick={() => handleClick(true)}
            >
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewWordsDialog;
