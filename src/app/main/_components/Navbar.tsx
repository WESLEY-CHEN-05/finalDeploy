// import { AiFillDelete, AiFillFileAdd, AiFillFileText } from "react-icons/ai";
import { Rubik_Burned } from "next/font/google";
// import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import { Setting } from "./Setting";
import { getUserById } from "./action";

// import { createDocument, deleteDocument, getDocuments } from "./actions";

const rubik = Rubik_Burned({ weight: "400", subsets: ["latin"] });

async function Navbar() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  // const userId = session.user.id;
  // const documents = await getDocuments(userId);
  const user = await getUserById(session.user.id);
  const userName = user?.username ?? "User";
  return (
    <nav className="flex h-auto w-full bg-gray-700 p-2 text-slate-300">
      {/* align left */}
      <nav className="sticky top-0 mr-8 flex w-1/6 items-center justify-between pl-3 text-4xl">
        <Link className={rubik.className} href={`/main/mybooks`}>
          QUIZZZZZ
        </Link>
      </nav>

      {/* align right */}
      <nav className="sticky top-0 flex items-center justify-between">
        <div className="flex items-center justify-between px-3 py-1">
          <Link href={`/main/mybooks`} className="mr-4">
            <Button
              variant={"ghost"}
              type={"submit"}
              className="text-lg hover:bg-slate-600 hover:text-slate-300"
            >
              My books
            </Button>
          </Link>

          <Link href={`/main/publicbooks`} className="mr-4">
            <Button
              variant={"ghost"}
              type={"submit"}
              className="text-lg hover:bg-slate-600 hover:text-slate-300"
            >
              Public books
            </Button>
          </Link>
        </div>
      </nav>

      <nav className="sticky top-0 ml-auto flex items-center justify-between">
        <div className="flex w-full items-center justify-between px-3 py-1">
          {/* user information */}
          <div className="mr-6 flex items-center gap-2 text-lg">
            <Setting userName={userName}></Setting>
          </div>

          {/* sign out button */}
          {/* <Link href={`/auth/signout`}>
            <Button
              variant={"ghost"}
              type={"submit"}
              className="text-lg hover:bg-slate-600 hover:text-slate-300"
            >
              Sign Out
            </Button>
          </Link> */}
        </div>
      </nav>
    </nav>
  );
}

export default Navbar;
