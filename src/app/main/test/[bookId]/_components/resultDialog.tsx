import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
// import { useUser } from "@/hooks/useUser";
import { useBook } from "@/hooks/useBook";
import { useWord } from "@/hooks/useWord";
import type { Words } from "@/lib/types/db";

function Result({
  question,
  answer,
  isPrivate,
}: {
  question: Words[];
  answer: string[];
  isPrivate: boolean;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { updateBook, book } = useBook();
  const { bookId, updateWord } = useWord();

  const router = useRouter();

  const [wrongNum, setWrongNum] = useState(0);

  useEffect(() => {
    let totalWrong: number = 0;
    question.forEach((word, index) => {
      if (word.content !== answer[index]) totalWrong += 1;
    });
    setWrongNum(totalWrong);
  }, [question, answer]);

  const handleSubmit = async () => {
    if (isPrivate) {
      question.forEach((word, index) => {
        // TODO add logic of public/private
        if (word.content !== answer[index]) {
          updateWord(word.id, {
            familiarity: word.familiarity > 0 ? word.familiarity - 1 : 0,
          });
        } else {
          updateWord(word.id, {
            familiarity: word.familiarity + 1,
          });
        }
      });
    } else {
      question.forEach((word, index) => {
        // TODO add logic of public/private
        if (word.content !== answer[index]) {
          updateWord(word.id, {
            testNum: word.testNum + 1,
          });
        } else {
          updateWord(word.id, {
            testNum: word.testNum + 1,
            correctNum: word.correctNum + 1,
          });
        }
      });

      updateBook(bookId, { popularity: (book?.popularity as number) + 1 });
    }

    router.push(`/main/books/${bookId}`);
  };

  return (
    <AlertDialog
      open={dialogOpen}
      onOpenChange={() => setDialogOpen(!dialogOpen)}
    >
      <AlertDialogTrigger asChild>
        <Button
          className="border-slate-200 bg-gray-700 text-slate-100 hover:border-slate-300 hover:bg-slate-700 hover:text-slate-300"
          variant="outline"
        >
          Submit
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[80vh] overflow-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Check out your result!</AlertDialogTitle>
          <AlertDialogDescription>
            {wrongNum === 0 ? (
              <div className="mt-4 text-center text-2xl text-green-600">
                All answers are correct!!!
              </div>
            ) : (
              question.map((word, index) => {
                if (word.content !== answer[index])
                  return (
                    <div key={index}>
                      <div className="text-base font-semibold">
                        Problem {index + 1}
                      </div>
                      <div>{word.content}</div>
                      <div>{word.meaning}</div>
                      <div>{answer[index]}</div>
                    </div>
                  );
                else return <div key={word.id}></div>;
              })
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <Button type="submit" onClick={() => handleSubmit()}>
            OK
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default Result;
