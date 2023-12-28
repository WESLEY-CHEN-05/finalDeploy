"use client";

import { useState, useRef } from "react";

import { useSession } from "next-auth/react";

import ClickAwayListener from "@mui/material/ClickAwayListener";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  const { userInfo } = useUser();

  const handleUpdateUsername = () => {
    setEditUsername(false);
  };

  return (
    <div className="flex w-full flex-row">
      <div className="mt-auto flex w-1/3 flex-col">
        {/* <img src = {"./component/unforgiven_cover.png"} className = "w-1/3"></img> */}
        <div className="flex flex-row">
          <p className="mb-3 ml-6 text-2xl font-bold text-white">Email:</p>
          <p className="mb-3 ml-3 text-2xl font-bold text-white">{email}</p>
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
                defaultValue={username}
                placeholder="New username"
                className="w-1/2 text-2xl text-white"
                ref={usernameRef}
                onChange={(e) => setInputUsername(e.target.value)}
              />
            </ClickAwayListener>
          ) : (
            <Button onClick={() => setEditUsername(true)} className="w-1/2">
              <p className="ml-0 text-2xl font-bold text-white">{username}</p>
            </Button>
          )}
        </div>
        <Button className="ml-5 w-1/2">Change Password</Button>
      </div>
      <div className="flex w-2/3 flex-col">
        <div className="flex w-full flex-col">
          <p className="m-6 text-2xl font-bold text-white">About Yourself</p>
          <Textarea
            placeholder="About yourself"
            defaultValue={userInfo.about}
            ref={aboutRef}
            className="ml-5 h-1/3 w-3/4"
          ></Textarea>
          <Button className="ml-6 mt-3 w-10">Save</Button>
        </div>
        <div className="flex w-full flex-col">
          <p className="m-6 text-2xl font-bold text-white">
            Vocabulary Learning Experience
          </p>
          <Textarea
            placeholder="Your learning experience"
            defaultValue={userInfo.experience}
            ref={experienceRef}
            className="ml-5 h-1/3 w-3/4"
          ></Textarea>
          <Button className="ml-6 mt-3 w-10">Save</Button>
        </div>
        <div>
          <p className="m-6 text-2xl font-bold text-white">
            Public Vocabulary Books
          </p>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
