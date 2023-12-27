"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Words } from "@/lib/types/db";

export type classedWords = Words & {
  className: string;
};

export const columns: ColumnDef<Words>[] = [
  {
    accessorKey: "content",
    header: ({ column }) => {
      return (
        <div className="ml-10">
          <span> Word </span>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-slate-800"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const content = row.getValue("content") as string;

      return <div className="ml-10 font-medium">{content}</div>;
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
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-slate-800"
          >
            <ArrowUpDown className="h-4 w-4" />
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
