"use client";

import { useState, useRef } from "react";

import { useSession } from "next-auth/react";

import ClickAwayListener from "@mui/material/ClickAwayListener";

import Book from "@/app/main/mybooks/_components/Book";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBook } from "@/hooks/useBook";
import { useUser } from "@/hooks/useUser";

function SettingPage() {
  const { data: session } = useSession();
  const username = session?.user?.username;
  const userId = session?.user?.id;
  console.log(userId);
  const email = session?.user?.email;
  const [editUsername, setEditUsername] = useState<boolean>(false);
  const [inputUsername, setInputUsername] = useState<string>(
    username as string,
  );
  const [inputAbout, setInputAbout] = useState<string>("");
  const [inputExperience, setInputExperience] = useState<string>("");
  const aboutRef = useRef<HTMLTextAreaElement>(null);
  const experienceRef = useRef<HTMLTextAreaElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const { userInfo, updateUser } = useUser();
  const { books } = useBook();

  const handleUpdateUsername = () => {
    setEditUsername(false);
    if(inputUsername !== userInfo.username){
      updateUser({username: inputUsername});
    }
  };

  const handleClickAbout = () => {
    if(inputAbout !== userInfo.about){
      updateUser({about: inputAbout});
    }
  };

  const handleClickExp = () => {
    if(inputExperience !== userInfo.experience){
      updateUser({experience: inputExperience});
    }
  };

  // const handleChange = () => {};

  return (
    <div className="flex w-full flex-row">
      <div className="mt-6 ml-6 flex w-1/3 flex-col">
        {/* <img src = {"./component/unforgiven_cover.png"} className = "w-1/3"></img> */}
        <div className="flex flex-row">
          <p className="mb-3 ml-6 text-2xl font-bold text-white">Email:</p>
          <p className="mb-3 ml-3 text-xl text-white">{email}</p>
        </div>
        <div className="flex flex-row">
          <p className="mb-3 ml-6 mr-3 text-2xl font-bold text-white">
            Username:
          </p>
          {editUsername ? (
            <ClickAwayListener
              onClickAway={handleUpdateUsername}
              className="mt-3"
            >
              <Input
                defaultValue={userInfo.username}
                placeholder="New username"
                className="w-1/2 text-xl text-white"
                ref={usernameRef}
                onChange={(e) => setInputUsername(e.target.value)}
              />
            </ClickAwayListener>
          ) : (
            <Button onClick={() => setEditUsername(true)} className="w-1/2 bg-slate-800 border-slate-800">
              <p className="mr-auto text-xl text-white">{userInfo.username}</p>
            </Button>
          )}
        </div>
        {/* <Button className="ml-5 w-1/2" onClick={() => handleChange()}>
          Change Password
        </Button> */}
      </div>
      <div className="flex w-2/3 flex-col">
        <div className="flex w-full flex-col">
          <p className="m-6 text-2xl font-bold text-white">About Yourself</p>
          <Textarea
            placeholder="About yourself"
            defaultValue={userInfo.about}
            onChange={(e) => setInputAbout(e.target.value)}
            ref={aboutRef}
            className="ml-5 h-1/3 w-3/4 text-white"
          ></Textarea>
          <Button
            className="ml-6 mt-3 w-1/6 bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-gray-900"
            onClick={() => handleClickAbout()}
          >
            Update
          </Button>
        </div>
        <div className="flex w-full flex-col">
          <p className="m-6 text-2xl font-bold text-white">
            Vocabulary Learning Experience
          </p>
          <Textarea
            placeholder="Your learning experience"
            defaultValue={userInfo.experience}
            onChange={(e) => setInputExperience(e.target.value)}
            ref={experienceRef}
            className="ml-5 h-1/3 w-3/4 text-white"
          ></Textarea>
          <Button 
            className="ml-6 mt-3 w-1/6 bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-gray-900" 
            onClick={() => handleClickExp()}>
            Update
          </Button>
        </div>
        <div>
          <p className="mb-3 ml-6 mt-3 text-2xl font-bold text-white">
            Public Vocabulary Books
          </p>
        </div>
        <div className="flex w-full flex-wrap justify-start">
          {books.map((book) => {
            if (book.publicize === true) {
              return (
                <div key={book.id}>
                  <Book info={book}></Book>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
