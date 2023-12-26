import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { Books } from "@/lib/types/db";

function Book({ info }: { info: Books }) {
  function getLength(str: string) {
    return str.replace(/[^\x20-\xff]/g, "OO").length;
  }

  function cutString(str: string, limit: number) {
    let current = 0;
    let ret = "";
    for (let i = 0; i < str.length; i++) {
      const len = getLength(str[i]);
      if (current + len > limit) {
        ret += "...";
        break;
      }
      ret += str[i];
      current += len;
    }
    return ret;
  }

  return (
    <Link href={`/main/publicbooks/${info.id}`}>
      <div className="m-3 rounded-lg border-2 border-slate-600 text-slate-100">
        <div className="w-80 flex-col p-4">
          <div
            className="p-2 text-xl font-bold text-slate-200"
            style={{ position: "relative" }}
          >
            <p>{cutString(info.title, 25)}</p>
          </div>
          <div className="h-16 p-2 text-slate-500">
            <p>{cutString(info.description, 65)}</p>
          </div>
          <div className="flex-col p-2">
            <Badge
              variant="outline"
              className="mr-3 border-slate-800 bg-blue-600 text-slate-100"
            >
              {info.language}
            </Badge>
            <Badge
              variant="outline"
              className="border-slate-800 bg-green-600 text-slate-100"
            >
              {"Popularity: " + info.popularity}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default Book;
