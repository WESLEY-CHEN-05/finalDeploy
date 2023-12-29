"use client";

import { useParams } from "next/navigation";
// import type { Books } from "@/lib/types/db";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useBook } from "@/hooks/useBook";
import { useWord } from "@/hooks/useWord";
import { publicEnv } from "@/lib/env/public";

import AddNewWordsDialog from "./_components/addNewWordsDialog";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
// import memoryDB from "./memory";
import DeleteBookDialog from "./_components/deleteBookDialog";
import EditBookDialog from "./_components/editBookDialog";
import type { Words, WordsUpdate } from "@/lib/types/db";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export type wordsAndFunc = Words & {
  update: (wordId: string, { content, meaning, familiarity, star, correctNum, testNum }: Partial<Omit<Words, "id" | "accuracy">>) => Promise<Words | undefined>,
  delete: (wordId: string) => Promise<void>,
  updateInfo: (_info: WordsUpdate, _id: string) => void;
}

function BookPage() {
  const param = useParams();
  const bookId = param.bookId as string;
  const router = useRouter();
  const { book, updateBook } = useBook();
  const { words, createWord, updateWord, deleteWord } = useWord();

  const [ wordsWithFunction, setWordsWithFunction ] = useState<wordsAndFunc[]>();

  const [ editWordDialogOpen, setEditDialogOpen ] = useState(false);
  const [ dialogId, setDialogId ] = useState("");
  const [ dialogContent, setDialogContent ] = useState("");
  const [ dialogMeaning, setDialogMeaning ] = useState("");

  const updateInfo = (_info: WordsUpdate, _id: string) => {
    setEditDialogOpen(true);
    setDialogId(_id);
    setDialogContent(_info.content as string);
    setDialogMeaning(_info.meaning as string);
  }

  useEffect(() => {
    console.log("FKC",words);
    setWordsWithFunction(words.map((word) => {
      return {
        ...word,
        update: updateWord,
        delete: deleteWord,
        updateInfo: updateInfo,
      }
    }))
  }, [words, updateWord, deleteWord]);

  const { toast } = useToast();

  if (!book || !words || !wordsWithFunction) {
    return <></>;
  }

  return (
    <div className="w-screen bg-gray-800 text-4xl text-white">
      <div className="flex w-screen">
        <div>
          <div className="flex">
            <p className="m-6 mb-2 text-3xl font-bold text-white">
              {" "}
              {book?.title ? book.title : ""}{" "}
            </p>
            <div className="mb-2 mt-auto">
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
          <p className="m-6 mt-2 text-base font-light text-slate-300">
            {book?.description ? book.description : ""}
          </p>
        </div>
        <Button
          className="m-6 ml-auto border-green-600 text-green-600 hover:border-green-700 hover:bg-slate-800 hover:text-green-700"
          onClick={() => {
            if (!words || words.length < 2) {
              toast({
                title: "Not enough words",
                description: "At least two words are required in this book.",
              });
            } else {
              router.push(
                `${publicEnv.NEXT_PUBLIC_BASE_URL}/main/learn/${bookId}`,
              );
            }
          }}
          variant="outline"
        >
          Learn
        </Button>
        <EditBookDialog book={book} updateBook={updateBook} />
        <DeleteBookDialog bookId={bookId} />
        <AddNewWordsDialog createWord={createWord} />
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={wordsWithFunction} bookId={bookId} />
      </div>

      {/* for edit word */}
      <Dialog open={editWordDialogOpen} onOpenChange={() => setEditDialogOpen(!editWordDialogOpen)}>
        <DialogContent className="sm:max-w-[425px] bg-slate-100">
          <DialogHeader>
            <DialogTitle>Edit Word</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Word
              </Label>
              <Input
                id="name"
                defaultValue={dialogContent}
                className="col-span-3"
                onChange={(event) => {
                  setDialogContent(event?.target.value)
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Meaning
              </Label>
              <Input
                id="username"
                defaultValue={dialogMeaning}
                className="col-span-3"
                onChange={(event) => {
                  setDialogMeaning(event?.target.value)
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => {
              setEditDialogOpen(false);
              updateWord(dialogId, {
                content: dialogContent,
                meaning: dialogMeaning,
              })
            }}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BookPage;
