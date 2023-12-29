"use client"
import { Button } from "@/components/ui/button";
// import type { Books } from "@/lib/types/db";

import Book from "./_components/Book";
import { useBook } from "@/hooks/useBook";
import { useState } from "react";
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


function DocsPage() {
  console.log("render");
  const { publicBooks } = useBook();
  // const sampleInfo: Books = {
  //   id: "3jeiofn9eflqwqwjoif",
  //   title: "Sample book",
  //   description: "Sample Description",
  //   language: "English",
  //   publicize: true,
  //   popularity: 0,
  //   authorId: "3jeiofn9eflqwqwjoif",
  // };
  const [isLanguage, setIsLanguage] = useState(false);
  const [searchLanguage, setSearchLanguage] = useState("All");
  const [searchTitle, setSearchTitle] = useState("");

  const handleClick = () => {
    if(isLanguage){
      
    }
  };

  return (
    <div className="w-screen">
      <div className="flex w-screen">
        <p className="m-6 text-3xl font-bold text-white"> Public books </p>
        <Select 
        onValueChange={(value) => {
          if(value == "language") setIsLanguage(true);
          else setIsLanguage(false);
        }}
        defaultValue="title"
        >
          <SelectTrigger className = "w-1/8 m-6 mr-1 text-white">
            <SelectValue placeholder = "Sort by"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="language">Language</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {isLanguage ? (
          <Select
            onValueChange={(value) => {
              setSearchLanguage(value);
            }}
            defaultValue="All"
          >
            <SelectTrigger className = "w-1/3 m-6 ml-1 text-white">
              <SelectValue placeholder = "Choose language"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="Korean">Korean</SelectItem>
                <SelectItem value="Japanese">Japanese</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        ):(
          <Input 
            className = "w-1/3 m-6 ml-1 text-white"
            placeholder = "Search books"
            onChange = {(event) => {
              setSearchTitle(event?.target.value);
            }}
          />
        )}
        <Button className="m-6 ml-auto bg-yellow-600 text-black hover:bg-yellow-700">
          Create new books
        </Button>
      </div>
      <div className="flex w-screen flex-wrap justify-start">
        {publicBooks.map((book) => {
          if(isLanguage && searchLanguage == "All"){
            return (
              <div key={book.id}>
                <Book info={book}></Book>
              </div>
            );
          }
          else if (isLanguage && searchLanguage == book.language){
            return (
              <div key={book.id}>
                <Book info={book}></Book>
              </div>
            );
          }
          else if (!isLanguage && book.title.includes(searchTitle)){
            return (
              <div key={book.id}>
                <Book info={book}></Book>
              </div>
            );
          }
          else if (!isLanguage && searchTitle == ""){
            return (
              <div key={book.id}>
                <Book info={book}></Book>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
export default DocsPage;
