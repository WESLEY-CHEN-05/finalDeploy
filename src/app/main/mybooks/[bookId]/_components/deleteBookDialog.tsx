"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useBook } from "@/hooks/useBook";
import { publicEnv } from "@/lib/env/public";

function DeleteBookDialog({ bookId }: { bookId: string }) {
  const router = useRouter();
  const { deleteBook } = useBook();
  const handleOnClick = () => {
    deleteBook({ bookId });
    router.push(`${publicEnv.NEXT_PUBLIC_BASE_URL}/main/mybooks`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="m-6  bg-red-600 text-white hover:bg-red-700">
          Delete book
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this book</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this book?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-4">
          <Button className="ml-auto" type="submit" onClick={() => handleOnClick()}>
            Delete
          </Button>
          <Button type="submit">Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteBookDialog;
