"use client";

import { useRef } from "react";
// import { publicEnv } from "@/lib/env/public";
// import { redirect } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { useBook } from "@/hooks/useBook"

import type { TestRequest } from "@/lib/types/db";

function CreateTestDialog( { bookId }: { bookId: string } ){
  const router = useRouter();
  
  const [ num, setNum ] = useState<string>("0");
  const [ repetitive, setRepetitive ] = useState<string>("Yes");
  const [ publicize, setPublicize] = useState<string>("Yes");
  const [ star, setStar ] = useState<string>("Yes");
  const [ hard, setHard ] = useState<string>("Yes");
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [warningNum, setWarningNum] = useState(false);

  function isWhitespaceOrNewline(inputNum: string) {
    return /^\s*$/.test(inputNum);
  }

  // const handleREP = (e: string ) => {
  //   setRepetitive(e);
  // };
  // const handlePUB = (e: string ) => {
  //   setPublicize(e);
  // };
  // const handleHARD = (e: string ) => {
  //   setHard(e);
  // };
  // const handleSTAR = (e: string ) => {
  //   setStar(e);
  // };
  
  const handleSubmit = () => {
    setWarningNum(false);
    if (isWhitespaceOrNewline(num)) {
      setWarningNum(true);
      return;
    }

    if (
      num!== undefined &&
      repetitive !== undefined &&
      publicize !== undefined &&
      hard !== undefined &&
      star !== undefined
    ) {
      const test: TestRequest = {
        num: Number(num),
        repetitive: repetitive === "Yes" ? true : false,
        publicize: publicize === "Yes" ? true : false,
        hard: hard === "Yes" ? true : false,
        star: star === "Yes" ? true : false,
      };
      // console.log(book);
      //createTest(bookId,test);
      router.push(`/main/test/${bookId}?num=${test.num}&repetitive=${test.repetitive}&publicize=${test.publicize}&hard=${test.hard}&star=${test.star}`);
      setDialogOpen(false);
    }
    // redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/main/mybooks`);
  };

  return(
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
      <DialogTrigger asChild>
        <Button 
        className="m-6 bg-gray-800 border-sky-500 text-sky-500 hover:border-sky-700 hover:bg-gray-800 hover:text-sky-700"
        variant="outline">
          Quiz
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a quiz</DialogTitle>
          <DialogDescription>
            create a unique quiz for you!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
         <Input
            placeholder="Number of problems..."
            name="number"
            onChange={(event) => {
              setNum(event?.target.value);
              setWarningNum(false);
            }}
            className={warningNum ? "border-red-500" : ""}
          />
          {/* <Input placeholder="Allowed repeated problem?" name="language" ref = {languageRef}/> */}
          <p className="text-sm" >Allowed repeated problem?</p>
          <Select
            onValueChange={(val) => setRepetitive(val)}
            defaultValue="Yes"
          >
            <SelectTrigger>
              <SelectValue placeholder="Allowed repeated problem?" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Allowed repeated problem?</SelectLabel>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <Input placeholder="publicize, please insert Yes or No" name="publicize" ref = {publicizeRef}/> */}
          <p className="text-sm">The type of the book</p>
          <Select 
            onValueChange={(val) => setPublicize(val)}
            defaultValue="Yes"
          >
            <SelectTrigger>
              <SelectValue placeholder="Publicize the book?" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Publicize the book?</SelectLabel> */}
                <SelectItem value="Yes">Public</SelectItem>
                <SelectItem value="No">Private</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <Input placeholder="publicize, please insert Yes or No" name="publicize" ref = {publicizeRef}/> */}
          <p className="text-sm">Create problem set with hard words first?</p>
          <Select 
            onValueChange={(val) => setHard(val)}
            defaultValue="Yes"
          >
            <SelectTrigger>
              <SelectValue placeholder="Create problem with hard words first?" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Create problem with hard words first?</SelectLabel> */}
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <Input placeholder="publicize, please insert Yes or No" name="publicize" ref = {publicizeRef}/> */}
          <p className="text-sm">Use starred words?</p>
          <Select 
            onValueChange={(val) => setStar(val)}
            defaultValue="Yes"
          >
            <SelectTrigger>
              <SelectValue placeholder="Use starred words?" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Use starred words?</SelectLabel>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button type="submit" onClick={() => handleSubmit()}>Create Quiz</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
 export default CreateTestDialog;