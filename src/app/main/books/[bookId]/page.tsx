"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { useParams } from "next/navigation";
// import type { Books } from "@/lib/types/db";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useBook } from "@/hooks/useBook";
import { useWord } from "@/hooks/useWord";
import { publicEnv } from "@/lib/env/public";
import type { Words, WordsUpdate } from "@/lib/types/db";

import AddNewWordsDialog from "./_components/addNewWordsDialog";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
// import memoryDB from "./memory";
import DeleteBookDialog from "./_components/deleteBookDialog";
import EditBookDialog from "./_components/editBookDialog";
import { useUser} from "@/hooks/useUser";

export type wordsAndFunc = Words & {
  update: (
    wordId: string,
    {
      content,
      meaning,
      familiarity,
      star,
      correctNum,
      testNum,
    }: Partial<Omit<Words, "id" | "accuracy">>,
  ) => Promise<Words | undefined>;
  delete: (wordId: string) => Promise<void>;
  updateInfo: (_info: WordsUpdate, _id: string) => void;
};

function BookPage() {
  const param = useParams();
  const bookId = param.bookId as string;
  const router = useRouter();
  const { book, updateBook } = useBook();
  const { words, createWord, updateWord, deleteWord } = useWord();

  const [wordsWithFunction, setWordsWithFunction] = useState<wordsAndFunc[]>();

  const [editWordDialogOpen, setEditDialogOpen] = useState(false);
  const [dialogId, setDialogId] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [dialogMeaning, setDialogMeaning] = useState("");
  const [warningContent, setWarningContent] = useState(false);
  const [warningMeaning, setWarningMeaning] = useState(false);
  const { getUser, getName } = useUser();

  const [userId, setUserId] = useState("");
  const { data: session } = useSession();
  useEffect(() => {
    if (!session?.user) return;
    setUserId(session?.user?.id);
    // console.log(userId);
  }, [session]);
  const bookowner = book?.authorId;
  useEffect(() => {
    getUser(bookowner as string);
  });
  // getUser(bookowner as string);
  const authorName = getName;

  function isWhitespaceOrNewline(inputStr: string) {
    return /^\s*$/.test(inputStr);
  }

  const updateInfo = (_info: WordsUpdate, _id: string) => {
    setEditDialogOpen(true);
    setDialogId(_id);
    setDialogContent(_info.content as string);
    setDialogMeaning(_info.meaning as string);
  };

  useEffect(() => {
    // console.log("FKC", words);
    setWordsWithFunction(
      words.map((word) => {
        return {
          ...word,
          update: updateWord,
          delete: deleteWord,
          updateInfo: updateInfo,
        };
      }),
    );
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
          <p className="mt-2 ml-6 mb-3 text-base font-light text-slate-300">
            {book?.description ? book.description : ""}
          </p>
          <div className = "flex flex-row">
            <p className="ml-6 text-base font-light text-slate-300">
              Book created by:
            </p>
            <p className="ml-6 text-base font-bold text-slate-300">
              {authorName}
            </p>
          </div>
        </div>
        <Button
          className="m-6 ml-auto border-green-600 text-green-600 hover:border-green-700 hover:bg-slate-800 hover:text-green-700"
          onClick={() => {
            if (!words || words.length < 2) {
              toast({
                title: "Not enough words",
                description:
                  "At least two words are required to enter learning mode.",
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
        {(userId == bookowner)?<EditBookDialog book={book} updateBook={updateBook} />:<></>}
        {(userId == bookowner)?<DeleteBookDialog bookId={bookId} />:<></>}
        {(userId == bookowner)?<AddNewWordsDialog createWord={createWord} />:<></>}
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={wordsWithFunction} bookId={bookId} />
      </div>

      {/* for edit word */}
      <Dialog
        open={editWordDialogOpen}
        onOpenChange={() => setEditDialogOpen(!editWordDialogOpen)}
      >
        <DialogContent className="bg-slate-100 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Word</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Word
              </Label>
              <Input
                id="content"
                defaultValue={dialogContent}
                onChange={(event) => {
                  setDialogContent(event?.target.value);
                  setWarningContent(false);
                }}
                className={
                  warningContent ? "col-span-3 border-red-500" : "col-span-3"
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Meaning
              </Label>
              <Input
                id="meaning"
                defaultValue={dialogMeaning}
                onChange={(event) => {
                  setDialogMeaning(event?.target.value);
                  setWarningMeaning(false);
                }}
                className={
                  warningMeaning ? "col-span-3 border-red-500" : "col-span-3"
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                if (isWhitespaceOrNewline(dialogContent)) {
                  setWarningContent(true);
                  return;
                }
                if (isWhitespaceOrNewline(dialogMeaning)) {
                  setWarningMeaning(true);
                  return;
                }
                setWarningContent(false);
                setWarningMeaning(false);
                setEditDialogOpen(false);
                updateWord(dialogId, {
                  content: dialogContent,
                  meaning: dialogMeaning,
                });
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BookPage;
