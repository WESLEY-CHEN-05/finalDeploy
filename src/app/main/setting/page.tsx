"use client"
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";


function SettingPage() {
    const { data: session } = useSession();
    const username = session?.user?.username;
    const email = session?.user?.email;
    const [editUsername, setEditUsername] = useState(false);
    const [inputUsername, setInputUsername] = useState(username);
    const usernameRef = useRef<HTMLInputElement>(null);

    const handleUpdateUsername = () => {
        setEditUsername(false);
    }

    return(
        <div className = "w-screen flex flex-row">
            <div className = "flex flex-col w-1/3">
                {/* <img src = {"./component/unforgiven_cover.png"} className = "w-1/3"></img> */}
                <div className = "flex flex-row">
                    <p className = "m-6 text-3xl font-bold text-white">Email:</p>
                    <p className = "m-6 text-3xl font-bold text-white">{email}</p>
                </div>
                <div className = "flex flex-row">
                    <p className = "m-6 text-3xl font-bold text-white">Username:</p>
                    {editUsername ? (
                        <ClickAwayListener onClickAway={handleUpdateUsername} >
                            <Input 
                            defaultValue={username} 
                            placeholder="New username"
                            className = "text=2xl"
                            ref = {usernameRef}
                            onChange = {(e) => setInputUsername(e.target.value)}/>
                        </ClickAwayListener>
                    ):(
                        <Button onClick = {() => setEditUsername(true)}>
                            <p className = "m-6 text-3xl font-bold text-white">{username}</p>
                        </Button>
                    )}
                </div>
                <Button>Change Password</Button>
            </div>
            <div className = "flex flex-col w-2/3">
                <div className = "flex flex-col w-full">
                    <p className = "m-6 text-2xl font-bold text-white">About Yourself</p>
                    <Textarea placeholder = "About yourself" className = "w-3/4 h-1/3 ml-5"></Textarea>
                </div>
                <div className = "flex flex-col w-full">
                    <p className = "m-6 text-2xl font-bold text-white">Vocabulary Learning Experience</p>
                    <Textarea placeholder = "About yourself" className = "w-3/4 h-1/3 ml-5"></Textarea>
                </div>
                <div>
                    <p className = "m-6 text-2xl font-bold text-white">Public Vocabulary Books</p>
                </div>
            </div >
        </div>
    );
}

export default SettingPage;
