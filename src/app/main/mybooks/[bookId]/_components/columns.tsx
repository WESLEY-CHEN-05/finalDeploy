"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Words } from "@/lib/types/db";

export type classedWords = Words & {
  className: string;
};

const handleOnClick = (wordId: string) => {
  console.log(wordId);
};

export const columns: ColumnDef<Words>[] = [
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

      return (
        <>
          <Star
            fill={star ? "yellow" : "#334155"}
            strokeWidth={star ? 0 : 1}
            onClick={(event) => {
              event.stopPropagation();
              handleOnClick(wordId);
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
];
