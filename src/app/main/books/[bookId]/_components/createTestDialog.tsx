"use client";

// import { useRef } from "react";
// import { publicEnv } from "@/lib/env/public";
// import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

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
import { Switch } from "@/components/ui/switch";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
//   SelectGroup,
//   SelectLabel,
// } from "@/components/ui/select";
// import { useBook } from "@/hooks/useBook";
import { useWord } from "@/hooks/useWord";
import type { TestRequest } from "@/lib/types/db";

function CreateTestDialog({ bookId }: { bookId: string }) {
  const router = useRouter();

  // const { book } = useBook();
  const { words } = useWord();

  const [starInBook, setStarInBook] = useState(0);

  const [num, setNum] = useState<string>("0");
  const [repetitive, setRepetitive] = useState(false);
  // const [publicize, setPublicize] = useState(false);
  const [star, setStar] = useState(false);
  const [hard, setHard] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [warningNum, setWarningNum] = useState(false);

  useEffect(() => {
    let cont = 0;
    words.forEach((word) => {
      if (word.star) cont += 1;
    });
    setStarInBook(cont);
  }, [words]);

  const isInteger = (str: string) => Number.isInteger(parseInt(str));

  const handleSubmit = () => {
    setWarningNum(false);
    if (!isInteger(num)) {
      setWarningNum(true);
      return;
    }

    const ret = parseInt(num);
    if (
      ret <= 0 ||
      (star && starInBook <= 0) ||
      (!repetitive && ret > words.length) ||
      (!repetitive && star && ret > starInBook)
    ) {
      setWarningNum(true);
      return;
    }

    const test: Omit<TestRequest, "publicize"> = {
      num: parseInt(num),
      repetitive: repetitive,
      hard: hard,
      star: star,
    };
    // console.log(book);
    //createTest(bookId,test);
    router.push(
      `/main/test/${bookId}?num=${test.num}&repetitive=${test.repetitive}&hard=${test.hard}&star=${test.star}`,
    );
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
      <DialogTrigger asChild>
        <Button
          className="m-6 border-sky-500 bg-gray-800 text-sky-500 hover:border-sky-700 hover:bg-gray-800 hover:text-sky-700"
          variant="outline"
        >
          Quiz
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a quiz</DialogTitle>
          <DialogDescription>create a unique quiz for you!</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <span className="mt-1">Number of problems</span>
            <Input
              defaultValue={"0"}
              name="number"
              onChange={(event) => {
                setNum(event?.target.value);
                setWarningNum(false);
              }}
              className={
                "ml-auto w-20 text-right " +
                (warningNum ? "border-red-500" : "")
              }
            />
          </div>
          <div className="flex">
            <p>Repetitive</p>
            <Switch
              checked={repetitive}
              onCheckedChange={(val) => setRepetitive(val)}
              className="ml-auto"
            />
          </div>
          <div className="flex">
            <p>Hard mode</p>
            <Switch
              checked={hard}
              onCheckedChange={(val) => setHard(val)}
              className="ml-auto"
            />
          </div>
          <div className="flex">
            <p>Starred words only</p>
            <Switch
              checked={star}
              onCheckedChange={(val) => setStar(val)}
              className="ml-auto"
            />
          </div>
          {/* <p className="text-sm">Allowed repeated problem?</p>
          <Select
            onValueChange={(val) => setRepetitive(val)}
            defaultValue="Yes"
          >
            <SelectTrigger>
              <SelectValue placeholder="Allowed repeated problem?" />
            </SelectTrigger>
            <SelectContent defaultValue="No">
              <SelectGroup>
                <SelectLabel>Allowed repeated problem?</SelectLabel>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}
          {/* <Input placeholder="publicize, please insert Yes or No" name="publicize" ref = {publicizeRef}/> */}
          {/* <p className="text-sm">The type of the book</p>
          <Select onValueChange={(val) => setPublicize(val)} defaultValue="Yes">
            <SelectTrigger>
              <SelectValue placeholder="Publicize the book?" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Publicize the book?</SelectLabel>
                <SelectItem value="Yes">Public</SelectItem>
                <SelectItem value="No">Private</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}
          {/* <Input placeholder="publicize, please insert Yes or No" name="publicize" ref = {publicizeRef}/> */}
          {/* <p className="text-sm">Create problem set with hard words first?</p>
          <Select onValueChange={(val) => setHard(val)} defaultValue="Yes">
            <SelectTrigger>
              <SelectValue placeholder="Create problem with hard words first?" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Create problem with hard words first?</SelectLabel>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <Input placeholder="publicize, please insert Yes or No" name="publicize" ref = {publicizeRef}/> */}
          {/* <p className="text-sm">Use starred words?</p>
          <Select onValueChange={(val) => setStar(val)} defaultValue="Yes">
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
          </Select> */}
          <Button type="submit" onClick={() => handleSubmit()}>
            Create Quiz
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default CreateTestDialog;
