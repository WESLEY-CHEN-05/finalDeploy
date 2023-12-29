"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Books } from "@/lib/types/db";

// import { publicEnv } from "@/lib/env/public";

function PublicizeBookDialog({
  bookId,
  updateBook,
}: {
  bookId: string;
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

  const handleOnClick = () => {
    updateBook(bookId, { publicize: true });
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
      <DialogTrigger asChild>
        <Button
          className="m-6 border-blue-500 text-blue-500 hover:border-blue-500 hover:bg-gray-800 hover:text-blue-600"
          variant="outline"
        >
          Publicize
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-100">
        <DialogHeader>
          <DialogTitle>Publicize this book</DialogTitle>
          <DialogDescription>
            Are you sure you want to publicize this book?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-4">
          <Button
            className="ml-auto"
            type="submit"
            onClick={() => handleOnClick()}
          >
            Yes
          </Button>
          {/* <Button type="submit">Cancel</Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PublicizeBookDialog;
