"use client";

import { useEffect, useState } from "react";

// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

function ErrorPage() {
  // const { data: session } = useSession();
  const router = useRouter();

  const { toast } = useToast();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    return () => {
      setShowToast(true);
    };
  }, []);

  useEffect(() => {
    if (showToast) {
      toast({
        title: "Failed",
        description:
          "Wrong username or wrong password. Or this username has been used.",
        variant: "destructive",
      });
    }
  }, [showToast, toast]);

  return (
    <div className="h-screen w-screen bg-slate-800">
      <Toaster />
    </div>
  );
}

export default ErrorPage;
