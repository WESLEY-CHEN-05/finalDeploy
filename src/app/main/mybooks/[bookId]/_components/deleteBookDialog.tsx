"use client"
import { Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBook } from "@/hooks/useBook";
import { useRouter } from "next/navigation";
// import { publicEnv } from "@/lib/env/public";

function DeleteBookDialog({bookId}: {bookId: string}) {
    const router = useRouter();
    const {deleteBook} = useBook();
    const handleOnClick = () => {
        console.log("anan");
        deleteBook({bookId});
        // router.push(`${publicEnv.NEXT_PUBLIC_BASE_URL}/main/mybooks`);
        router.push("/main/mybooks/");
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="m-6 ml-auto bg-red-600 text-white hover:bg-red-700" >Delete book</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete this book</DialogTitle>
                    <DialogDescription>Are you sure you want to delete this book?</DialogDescription>
                </DialogHeader>
                <form className="flex flex-row gap-4">
                    <Button className="ml-auto" type = "submit" onClick = {handleOnClick}>Delete</Button>
                    <Button type = "submit">Cancel</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteBookDialog;