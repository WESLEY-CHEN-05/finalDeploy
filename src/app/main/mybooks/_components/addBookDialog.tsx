"use client"
import { Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
        SelectGroup,
        SelectLabel,
 } from "@/components/ui/select";
import { useState, useEffect, useRef } from "react";
import type { BooksCreate } from "@/lib/types/db";
import { useBook } from "@/hooks/useBook";
import { publicEnv } from "@/lib/env/public";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

function AddBookDialog() {
    const {createBook} = useBook();
    const { data: session } = useSession();

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const languageRef = useRef<HTMLInputElement>(null);
    const publicizeRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        const title = titleRef.current?.value;
        const description = descriptionRef.current?.value;
        const language = languageRef.current?.value;
        const publicize = publicizeRef.current?.value;
        console.log(title);
        console.log(description);
        console.log(language);
        console.log(publicize);
        if(title !== undefined && description !== undefined && language !== undefined && publicize !== undefined){
            const book: BooksCreate = {
                title: title,
                description: description,
                language: language,
                publicize: (publicize==="Yes")?true:false,
            }
            console.log(book);
            createBook(book);
        }

    }
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button className="m-6 ml-auto bg-yellow-600 text-black hover:bg-yellow-700" >Create new books</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a new book</DialogTitle>
                    <DialogDescription>Insert your information about the book here!</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input placeholder="title" name="title" ref = {titleRef}/>
                    <Input placeholder="description" name="description" ref = {descriptionRef}/>
                    <Input type = "select" placeholder="language" name="language" ref = {languageRef}/>
                    <Input placeholder="publicize, please insert Yes or No" name="publicize" ref = {publicizeRef}/>
                    <Button type = "submit" >Add</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddBookDialog;