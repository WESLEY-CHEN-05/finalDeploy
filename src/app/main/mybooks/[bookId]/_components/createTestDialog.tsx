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
import { useTest } from "@/hooks/useTest";
import type { TestRequest } from "@/lib/types/db";

function CreateTestDialog(){
  const router = useRouter();
  const {createTest} = useTest();
    
  const numberRef = useRef(0);
  const Num: number = numberRef.current;

  const [ repetitive, setRepetitive ] = useState<string>("");
  const [ publicize, setPublicize] = useState<string>("");
  const [ star, setStar ] = useState<string>("");
  const [ hard, setHard ] = useState<string>("");
  
  const handleREP = (e: string ) => {
    setRepetitive(e);
  };
  const handlePUB = (e: string ) => {
    setPublicize(e);
  };
  const handleHARD = (e: string ) => {
    setHard(e);
  };
  const handleSTAR = (e: string ) => {
    setStar(e);
  };
  
  const handleSubmit = () => {
    const Num: number = numberRef.current;
    if (
      Num!== undefined &&
      repetitive !== undefined &&
      publicize !== undefined &&
      hard !== undefined &&
      star !== undefined
    ) {
      const test: TestRequest = {
        num: Num,
        repetitive: repetitive === "Yes" ? true : false,
        publicize: publicize === "Yes" ? true : false,
        hard: hard === "Yes" ? true : false,
        star: star === "Yes" ? true : false,
      };
      // console.log(book);
      //createTest(bookId,test);
      router.push(`/main/test/bookId?num=2& ..`);
    }
    // redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/main/mybooks`);
  };

  return(
    <Dialog>
      <DialogTrigger asChild>
        <Button className="m-6 ml-auto bg-yellow-600 text-black hover:bg-yellow-700">
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input placeholder="Number of problems" name="number" type="number" value={Num} />
          {/* <Input placeholder="Allowed repeated problem?" name="language" ref = {languageRef}/> */}
          <Select onValueChange={(e) => handleREP(e)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Allowed repeated problem?</SelectLabel>
                <SelectItem value="English">Yes</SelectItem>
                <SelectItem value="Korean">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <Input placeholder="publicize, please insert Yes or No" name="publicize" ref = {publicizeRef}/> */}
          <Select onValueChange={(e) => handlePUB(e)}>
            <SelectTrigger>
              <SelectValue placeholder="Publicize the book?" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Publicize</SelectLabel>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <Input placeholder="publicize, please insert Yes or No" name="publicize" ref = {publicizeRef}/> */}
          <Select onValueChange={(e) => handleHARD(e)}>
            <SelectTrigger>
              <SelectValue placeholder="Create problem with hard words first?" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Hard</SelectLabel>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <Input placeholder="publicize, please insert Yes or No" name="publicize" ref = {publicizeRef}/> */}
          <Select onValueChange={(e) => handleSTAR(e)}>
            <SelectTrigger>
              <SelectValue placeholder="Use starred words?" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>STAR</SelectLabel>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button type="submit" onClick={() => handleSubmit()}>Add</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
 export default CreateTestDialog;