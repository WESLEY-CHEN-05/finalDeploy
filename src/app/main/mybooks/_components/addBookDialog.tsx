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
import type { BooksCreate } from "@/lib/types/db";
import { create } from "domain";

function AddBookDialog({
  createBook,
}: {
  createBook: ({
    title,
    description,
    language,
    publicize,
  }: BooksCreate) => Promise<BooksCreate | undefined>;
}) {
  // const languageRef = useRef<HTMLInputElement>(null);
  // const publicizeRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [language, setLanguage] = useState<string>("English");
  const [publicize, setPublicize] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [warningTitle, setWarningTitle] = useState(false);
  const [warningDescription, setWarningDescription] = useState(false);

  function isWhitespaceOrNewline(inputStr: string) {
    return /^\s*$/.test(inputStr);
  }

  const handleSubmit = () => {
    setWarningDescription(false);
    setWarningTitle(false);
    // const language = languageRef.current?.value;
    // const publicize = publicizeRef.current?.value;
    // console.log(title);
    // console.log(description);
    // console.log(language);
    // console.log(publicize);
    if (isWhitespaceOrNewline(title)) {
      setWarningTitle(true);
      return;
    }
    if (isWhitespaceOrNewline(description)) {
      setWarningDescription(true);
      return;
    }
    createBook({ title, description, language, publicize });
    setDialogOpen(false);
    // redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/main/mybooks`);
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
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
        <div className="flex flex-col gap-4">
          <Input 
            placeholder="title" 
            name="title" 
            onChange = {(event) => {
              setTitle(event?.target.value)
              setWarningTitle(false);
            }}
            className={warningTitle ? "border-red-500" : ""} />
          <Input
            placeholder="description"
            name="description"
            onChange = {(event) => {
              setDescription(event?.target.value)
              setWarningDescription(false);
            }}
            className={warningDescription ? "border-red-500" : ""}
          />
          {/* <Input placeholder="language" name="language" ref = {languageRef}/> */}
          <Select onValueChange={(val) => setLanguage(val)} defaultValue="English">
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
          <Select onValueChange={(val) => setPublicize(val === "Yes" ? true : false)} defaultValue="No">
            <SelectTrigger>
              <SelectValue placeholder="Publicize the book?" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Publicize</SelectLabel>
                <SelectItem value="Yes">Public</SelectItem>
                <SelectItem value="No">Private</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button type="submit" onClick={() => handleSubmit()}>
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddBookDialog;
