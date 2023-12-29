
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import DocsLayout from "@/app/main/layout";

function Result({question, answer} : {question: string[]; answer: string[]} ){
    const numOfProblem = question.length;
    const [dialogOpen, setDialogOpen] = useState(false);
    return(
        <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
          <DialogTrigger asChild>
            <Button 
            className="m-6 border-sky-500 bg-gray-800 text-sky-500 hover:border-sky-700 hover:bg-gray-800 hover:text-sky-700"
            variant="outline"
            >
              Submit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter>
              <Button type="submit">Exit</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export default Result;