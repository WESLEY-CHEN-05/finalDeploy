import { Rubik_Burned } from "next/font/google";

import AuthForm from "./_components/AuthForm";

const rubik = Rubik_Burned({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center bg-slate-800">
      <div className="h-8"></div>
      <div className="m-10 text-8xl text-slate-200">
        <p className={rubik.className}>QUIZZZ</p>
      </div>
      <AuthForm />
    </main>
  );
}
