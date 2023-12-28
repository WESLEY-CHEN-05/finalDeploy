"use client"
import { Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function DeleteBookDiagram() {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="m-6 ml-auto bg-red-600 text-black hover:bg-red-700" >Delete book</Button>
            </DialogTrigger>
        </Dialog>
    )
}

export default DeleteBookDiagram;