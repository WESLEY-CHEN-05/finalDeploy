"use client";

import { useState, useEffect } from "react";

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
import type { Books } from "@/lib/types/db";

// import { publicEnv } from "@/lib/env/public";

function EditBookDialog({
  book,
  updateBook,
}: {
  book: Books;
  updateBook: (
    bookId: string,
    {
      title,
      description,
      language,
      publicize,
      popularity,
    }: Partial<Omit<Books, "id">>,
  ) => Promise<void>;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [publicize, setPublicize] = useState(false);
  const [warningTitle, setWarningTitle] = useState(false);
  const [warningDescription, setWarningDescription] = useState(false);

  useEffect(() => {
    if (book){
      setTitle(book.title);
      setDescription(book.description);
      setLanguage(book.language);
      setPublicize(book.publicize);
    }
  }, [book])

  function isWhitespaceOrNewline(inputStr: string) {
      return /^\s*$/.test(inputStr);
  }

  const handleSubmit= () => {
    setWarningTitle(false);
    setWarningDescription(false);
    if (isWhitespaceOrNewline(title)){
      setWarningTitle(true);
      return;
    }
    if (isWhitespaceOrNewline(description)){
      setWarningDescription(true);
      return;
    }
    updateBook(book.id, { 
      title: title,
      description: description,
      language: language,
      publicize: publicize});
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
      <DialogTrigger asChild>
        <Button
          className="m-6 border-slate-300 text-slate-300 hover:border-slate-400 hover:bg-slate-800 hover:text-slate-400"
          variant="outline"
        >
          Edit book
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit book information</DialogTitle>
          <DialogDescription>
            Edit the information of the book here!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input 
            defaultValue={book.title} 
            placeholder="title"
            name="title" 
            onChange={(event) => {
              setTitle(event.target.value);
              setWarningTitle(false);
            }} 
            className={warningTitle ? "border-red-500" : ""}/>
          <Input
            defaultValue={book.description}
            placeholder="description"
            onChange={(event) => {
              setDescription(event.target.value);
              setWarningDescription(false);
            }}
            name="description"
            className={warningDescription ? "border-red-500" : ""}
          />
          {/* <Input placeholder="language" name="language" ref = {languageRef}/> */}
          <Select 
            defaultValue={book.language}
            onValueChange={(val) => setLanguage(val)}>
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
          <Select 
            defaultValue={book.publicize ? "Yes" : "No"}
            onValueChange={(val) => setPublicize(val === "Yes" ? true : false)}>
            <SelectTrigger>
              <SelectValue placeholder="Publicize the book?" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Publicize</SelectLabel> */}
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
    // <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
    //   <DialogTrigger asChild>
    //     <Button
    //       className="m-6 border-blue-500 text-blue-500 hover:border-blue-500 hover:bg-gray-800 hover:text-blue-600"
    //       variant="outline"
    //     >
    //       Publicize
    //     </Button>
    //   </DialogTrigger>
    //   <DialogContent className="bg-slate-100">
    //     <DialogHeader>
    //       <DialogTitle>Publicize this book</DialogTitle>
    //       <DialogDescription>
    //         Are you sure you want to publicize this book?
    //       </DialogDescription>
    //     </DialogHeader>
    //     <div className="flex flex-row gap-4">
    //       <Button
    //         className="ml-auto"
    //         type="submit"
    //         onClick={() => handleOnClick()}
    //       >
    //         Yes
    //       </Button>
    //       {/* <Button type="submit">Cancel</Button> */}
    //     </div>
    //   </DialogContent>
    // </Dialog>
  );
}

export default EditBookDialog;
