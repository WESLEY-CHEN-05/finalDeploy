
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useRouter } from "next/navigation";

import type { Words } from "@/lib/types/db";
import { useWord } from "@/hooks/useWord";

function Result({question, answer} : {question: Words[]; answer: string[]} ){

  const [dialogOpen, setDialogOpen] = useState(false);

  const { bookId, updateWord } = useWord();

  const router = useRouter();

  const [wrongNum, setWrongNum] = useState(0);

  useEffect(() => {
    let totalWrong: number = 0;
    question.forEach((word, index) => {
      if (word.content !== answer[index]) totalWrong += 1;
    })
    setWrongNum(totalWrong);
  }, [question, answer])


  const handleSubmit = async () => {
    question.forEach((word, index) => {
      // TODO add logic of public/private
      if (word.content !== answer[index]){
        updateWord(word.id, {
          familiarity: (word.familiarity > 0) ? (word.familiarity - 1) : 0,
        })
      }
      else {
          updateWord(word.id, {
          familiarity: word.familiarity + 1,
        })
      }
    });
    router.push(`/main/mybooks/${bookId}`);
  }

  return(
      <AlertDialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
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
            <AlertDialogTitle>
              Check out your result!
            </AlertDialogTitle>
            <AlertDialogDescription>
              {wrongNum === 0 ?
               <div className="text-center text-2xl mt-4 text-green-600">All answers are correct!!!</div>
               :
                question.map((word, index) => {
                  if (word.content !== answer[index])
                    return (
                      <div key={index}>
                        <div className="text-base font-semibold">Problem {index + 1}</div>
                        <div>{word.content}</div>
                        <div>{word.meaning}</div>
                        <div>{answer[index]}</div>
                      </div>
                    )
                  else 
                    return <div key={word.id}></div>
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <AlertDialogFooter>
            <Button type="submit" onClick={() => handleSubmit()}>OK</Button>
          </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
  );
}
export default Result;