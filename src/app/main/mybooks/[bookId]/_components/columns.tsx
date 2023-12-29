"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Star } from "lucide-react";
import { SlOptions } from "react-icons/sl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button";
// import type { Words } from "@/lib/types/db";

import type { wordsAndFunc } from "../page";

export const columns: ColumnDef<wordsAndFunc>[] = [
  {
    accessorKey: "id",
    header: () => {
      return <></>;
    },
    cell: () => {
      return <></>;
    },
  },
  {
    accessorKey: "star",
    header: ({ column }) => {
      return (
        <div className="text-left">
          <Button
            variant="ghost"
            onClick={() => {
              if (!column.getIsSorted()) {
                column.toggleSorting(true);
              } else {
                column.clearSorting();
              }
            }}
            className="px-1 hover:bg-slate-800"
          >
            <Star
              className={
                "h-4 w-4 " +
                (column.getIsSorted()
                  ? "text-slate-800 hover:text-slate-500"
                  : "")
              }
              fill={column.getIsSorted() ? "#f1f5f9" : "#1e293b"}
            />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const star = row.getValue("star") as boolean;
      const wordId = row.getValue("id") as string;
      const updateWord = row.original.update;

      return (
        <>
          <Star
            fill={star ? "yellow" : "#334155"}
            strokeWidth={star ? 0 : 1}
            onClick={(event) => {
              event.stopPropagation();
              updateWord(wordId, {star: !star});
            }}
          />
        </>
      );
    },
  },
  {
    accessorKey: "content",
    header: ({ column }) => {
      return (
        <div className="">
          <span> Word </span>
          <Button
            variant="ghost"
            onClick={() => {
              if (!column.getIsSorted()) {
                column.toggleSorting(false);
              } else {
                column.clearSorting();
              }
            }}
            className="hover:bg-slate-800"
          >
            <ArrowUpDown
              className={
                "h-4 w-4 " + (column.getIsSorted() ? "text-slate-100" : "")
              }
            />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const content = row.getValue("content") as string;

      return <div className="font-medium">{content}</div>;
    },
  },
  {
    accessorKey: "meaning",
    header: () => <div className="text-center">Meaning</div>,
    cell: ({ row }) => {
      const meaning = row.getValue("meaning") as string;

      return <div className="text-center font-medium">{meaning}</div>;
    },
  },
  {
    accessorKey: "familiarity",
    header: ({ column }) => {
      return (
        <div className="ml-10 text-center">
          <span> Familiarity </span>
          <Button
            variant="ghost"
            onClick={() => {
              if (!column.getIsSorted()) {
                column.toggleSorting(false);
              } else {
                column.clearSorting();
              }
            }}
            className="hover:bg-slate-800"
          >
            <ArrowUpDown
              className={
                "h-4 w-4 " + (column.getIsSorted() ? "text-slate-100" : "")
              }
            />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("familiarity"));

      return <div className="text-center">{amount}</div>;
    },
  },
  {
    id: "options",
    cell: ({ row }) => {
      
      const wordId = row.original.id;
      const content = row.original.content;
      const meaning = row.original.meaning;
      const deleteWord = row.original.delete;
      const updateWord = row.original.updateInfo;
 
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-6 w-6 p-0 hover:bg-slate-600">
                <span className="sr-only">Open menu</span>
                <SlOptions className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-600 text-slate-300 border-slate-500">
              <DropdownMenuItem
                onClick={() => {
                  updateWord({
                    content: content,
                    meaning: meaning,
                  }, wordId);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-500 hover:text-red-500"
                onClick={() => deleteWord(wordId)}
                >
                  Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  }
];
