"use client";

import { useState, useRef } from "react";
import { useRouter} from "next/navigation";
import { useSession } from "next-auth/react";

import ClickAwayListener from "@mui/material/ClickAwayListener";

import Book from "@/app/main/mybooks/_components/Book";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBook } from "@/hooks/useBook";
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/components/ui/use-toast";
// import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";

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
  const usernameRef = useRef<HTMLInputElement>(null);
  const { userInfo, updateUser } = useUser();
  const { books } = useBook();
  const [editingAbout, setEditingAbout] = useState<boolean>(true);
  const [editingExp, setEditingExp] = useState<boolean>(true);

  const { toast } = useToast();

  const router = useRouter();

  const handleUpdateUsername = () => {
    setEditUsername(false);
    if (inputUsername !== userInfo.username) {
      updateUser({ username: inputUsername });
      toast({
        title: "Username",
        description: "Username updated!",
      });
      router.refresh();
    }
  };

  const handleClickAbout = () => {
    if (inputAbout !== userInfo.about) {
      updateUser({ about: inputAbout });
      setEditingAbout(true);
      toast({
        title: "Learning Goal",
        description: "Learning goal updated!",
      });
    }
  };

  const handleClickExp = () => {
    if (inputExperience !== userInfo.experience) {
      updateUser({ experience: inputExperience });
      setEditingExp(true);
      toast({
        title: "Learning Technique",
        description: "Learning technique updated!",
      });
    }
  };

  // const handleChange = () => {};

  return (
    <>
      <Toaster />
      <div className = "flex flex-col">
        <div className="flex w-full flex-row">
          <div className="ml-6 mt-6 flex w-1/3 flex-col ">
            {/* <p className = "w-full mt-6 mb-6"></p> */}
            {/* <p className = "w-full mt-6 mb-6"></p> */}
            {/* <img src = {"./component/unforgiven_cover.png"} className = "w-1/3"></img> */}
            <div>
              <p className = "ml-6 mb-6 text-3xl font-bold text-white">Profile</p>
            </div>
            <div className="flex flex-row">
              <p className="mb-2 ml-6 text-xl font-bold text-white">Email:</p>
              <p className="mb-2 ml-3 text-xl text-gray-300">{email}</p>
            </div>
            <div className="flex flex-row">
              <p className="mt-1 mb-3 ml-6 mr-3 text-xl font-bold text-white">
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
                    className="w-1/2 text-xl text-gray-300"
                    ref={usernameRef}
                    onChange={(e) => setInputUsername(e.target.value)}
                  />
                </ClickAwayListener>
              ) : (
                <Button
                  onClick={() => setEditUsername(true)}
                  className="w-1/2 border-slate-800 bg-slate-800 hover:bg-slate-800 hover:border-slate-800"
                >
                  <p className="mr-auto text-xl text-gray-300">{userInfo.username}</p>
                </Button>
              )}
            </div>
            {/* <Button className="ml-5 w-1/2" onClick={() => handleChange()}>
              Change Password
            </Button> */}
          </div>
          <div className="flex w-2/3 flex-col">
            <div className="flex w-full flex-col">
              {/* <p className = "w-full mt-6 mb-6"></p> */}
              {/* <p className = "w-full mt-6 mb-6"></p> */}
              <p className="m-6 text-2xl font-bold text-white">Learning Goal</p>
              <Textarea
                placeholder="Talk about your goal!!!"
                defaultValue={userInfo.about}
                onChange={(e) => {
                  setInputAbout(e.target.value);
                  setEditingAbout(false);
                }}
                className="ml-3 h-1/3 w-3/4 text-gray-300 border-gray-800 hover:border-white text-lg"
              ></Textarea>
              {editingAbout ? (
                <></>
              ):(
                <div className = "flex flex-row ml-6">
                  <p className = "w-7/12"></p>
                  <Button
                    disabled={editingAbout}
                    className={editingAbout?
                      "ml-2 mr-6 mt-3 w-1/6 bg-slate-800 text-slate-800 hover:bg-slate-800 hover:text-slate-800"
                      :"ml-2 mr-6 mt-3 w-1/6 bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-gray-900"}
                    onClick={() => handleClickAbout()}
                  >
                    Update
                  </Button>
                </div>
              )}
            </div>
            <div className="flex w-full flex-col">
              <p className="m-6 text-2xl font-bold text-white">
                Vocabulary Learning Technique
              </p>
              <Textarea
                placeholder="Your learning technique"
                defaultValue={userInfo.experience}
                onChange={(e) => {
                  setInputExperience(e.target.value);
                  setEditingExp(false);
                }}
                className="ml-3 h-1/3 w-3/4 text-gray-300 border-gray-800 hover:border-white text-lg"
              ></Textarea>
              {editingExp ? (
                <></>
              ):(
                <div className = "flex flex-row ml-6">
                  <p className = "w-7/12"></p>
                  <Button 
                    disabled={editingExp}
                    className={editingExp?
                      "ml-2 mt-3 w-1/6 bg-slate-800 text-slate-800 hover:bg-slate-800 hover:text-slate-800":
                      "ml-2 mt-3 w-1/6 bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-gray-900"} 
                    onClick={() => handleClickExp()}>
                    Update
                  </Button>
                </div>
              )}
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
      </div>
    </>
    
  );
}

export default SettingPage;
