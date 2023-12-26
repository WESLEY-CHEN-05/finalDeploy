"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";
import Image from "next/image";

// Run: npx shadcn-ui@latest add button
import { Button } from "@/components/ui/button";
// Run: npx shadcn-ui@latest add card
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { publicEnv } from "@/lib/env/public";

import AuthInput from "./AuthInput";

function AuthForm() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: sign in logic
    signIn("credentials", {
      email,
      username,
      password,
      callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/main`,
    });
  };
  return (
    <Card className="min-w-[300px] border-gray-900 bg-slate-600 text-slate-300">
      <CardContent className=" flex flex-col gap-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Tabs
            defaultValue="signin"
            className="mt-3 w-full"
            onValueChange={(value) => {
              setIsSignUp(value === "signup");
            }}
          >
            <TabsList className="w-full bg-slate-700">
              <TabsTrigger
                value="signin"
                className={"w-full " + (isSignUp ? "" : "bg-slate-500")}
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className={"w-full " + (isSignUp ? "bg-slate-500" : "")}
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <AuthInput
            label="Email"
            type="email"
            value={email}
            setValue={setEmail}
          />
          {isSignUp && (
            <AuthInput
              label="Username"
              type="text"
              value={username}
              setValue={setUsername}
            />
          )}
          <AuthInput
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          {isSignUp && (
            <AuthInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              setValue={setConfirmPassword}
            />
          )}

          <Button
            type="submit"
            className="mt-3 w-full bg-green-600 text-gray-200 hover:bg-green-700"
          >
            Sign {isSignUp ? "Up" : "In"}
          </Button>
        </form>
        <div className="flex w-full items-center gap-1 py-2">
          <div className="h-[1px] grow border-t border-slate-300"></div>
          <p className="text-xs text-gray-400">or</p>
          <div className="h-[1px] grow border-t border-slate-300"></div>
        </div>

        <Button
          onClick={async () => {
            // TODO: sign in with github
            signIn("github", {
              callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/main`,
            });
          }}
          className="flex w-full bg-slate-200 text-slate-800 hover:bg-slate-300"
          variant={"outline"}
        >
          {/* Remember to copy "github.png" to ./public folder */}
          <Image src="/github.png" alt="github icon" width={20} height={20} />
          <span className="grow">Sign In with Github</span>
        </Button>
      </CardContent>
    </Card>
  );
}

export default AuthForm;
