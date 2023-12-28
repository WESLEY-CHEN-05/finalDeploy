"use client";

import { useRef } from "react";
// import { publicEnv } from "@/lib/env/public";
// import { redirect } from "next/navigation";
import { useState } from "react";

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
import { useBook } from "@/hooks/useBook";
import type { BooksCreate } from "@/lib/types/db";

function AddBookDialog() {
  const { createBook } = useBook();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  // const languageRef = useRef<HTMLInputElement>(null);
  // const publicizeRef = useRef<HTMLInputElement>(null);

  const [language, setLanguage] = useState<string>("");
  const [publicize, setPublicize] = useState<string>("");

  const handleChange1 = (e: string) => {
    setLanguage(e);
  };

  const handleChange2 = (e: string) => {
    setPublicize(e);
  };

  const handleSubmit = () => {
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    // const language = languageRef.current?.value;
    // const publicize = publicizeRef.current?.value;
    // console.log(title);
    // console.log(description);
    // console.log(language);
    // console.log(publicize);
    if (
      title !== undefined &&
      description !== undefined &&
      language !== "" &&
      publicize !== ""
    ) {
      const book: BooksCreate = {
        title: title,
        description: description,
        language: language,
        publicize: publicize === "Yes" ? true : false,
      };
      // console.log(book);
      createBook(book);
    }
    // redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/main/mybooks`);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="m-6 ml-auto bg-yellow-600 text-black hover:bg-yellow-700">
          Create new books
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new book</DialogTitle>
          <DialogDescription>
            Insert your information about the book here!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input placeholder="title" name="title" ref={titleRef} />
          <Input
            placeholder="description"
            name="description"
            ref={descriptionRef}
          />
          {/* <Input placeholder="language" name="language" ref = {languageRef}/> */}
          <Select onValueChange={(e) => handleChange1(e)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Korean">Korean</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="Japanese">Japanese</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <Input placeholder="publicize, please insert Yes or No" name="publicize" ref = {publicizeRef}/> */}
          <Select onValueChange={(e) => handleChange2(e)}>
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
          <Button type="submit">Add</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddBookDialog;
