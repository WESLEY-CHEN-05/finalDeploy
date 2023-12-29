import { useCallback, useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import type { UserPublicInfo, UserUpdate } from "@/lib/types/db.ts";

export const useUser = () => {
  const [userId, setUserId] = useState("");
  const [getName, setGetName] = useState("");
  const [userInfo, setUserinfo] = useState<UserPublicInfo>(
    {} as UserPublicInfo,
  );
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) return;
    setUserId(session?.user?.id);
  }, [session]);

  const getinitialUser = useCallback(() => {
    if (!userId) return;
    const getUser = async (userId: string) => {
      const res = await fetch(`/api/user/${userId}`);
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setUserinfo(data.info);
    };
    getUser(userId);
  }, [userId]);

  useEffect(getinitialUser, [userId, getinitialUser]);

  const updateUser = async ({ username, about, experience }: UserUpdate) => {
    const res = await fetch(`/api/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        about,
        experience,
      }),
    });
    if (!res.ok) {
      return;
    }
    const ret = await res.json();
    const updatedUser: UserPublicInfo = ret.data;
    setUserinfo(updatedUser);
  };

  const getUser = async (userId: string) => {
    const res = await fetch(`/api/user/${userId}`);
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    setGetName(data.info.username);
  };

  return { userInfo, updateUser, getUser, getName };
};
