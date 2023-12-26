// import { useCallback, useEffect, useState } from "react";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// import { pusherClient } from "@/lib/pusher/client";

// // import type { Friend } from "@/lib/types/friend";

// export const useUser = () => {
//   const [userId, setUserId] = useState("");
//   //   const [friends, setFriends] = useState<Friend[]>([]);

//   const router = useRouter();

//   // with this hook we can directly get session data
//   const { data: session } = useSession();

//   // get username
//   useEffect(() => {
//     if (!session?.user) return;
//     setUserId(session?.user?.id);
//   }, [session]);

//   // get initial friend
//   const getLatestData = useCallback(() => {
//     if (!userId) return;
//     // console.log("REFETCH FRIENDS");

//     // GET api/users/[userId]/route.ts
//     // we want Friend[] be returned
//     const fetchFriend = async () => {
//       const res = await fetch(`/api/users/${userId}`);
//       if (!res.ok) {
//         // set message null?
//         router.push(`/chats`);
//         return;
//       }

//       const ret = await res.json();
//       //   console.log("CONSOLE", ret.data);

//       //   setFriends(ret.data);
//     };
//     fetchFriend();
//     router.refresh();
//   }, [userId, router]);

//   useEffect(getLatestData, [userId, router, getLatestData]);

//   // subscribe to pusher events
//   useEffect(() => {
//     if (!userId) return;
//     const channelName = `all`;
//     try {
//       const channel = pusherClient.subscribe(channelName);

//       // updat or delete friend
//       channel.bind("friend:change", () => {
//         console.log("CHANGE");
//         getLatestData();
//       });
//       channel.bind("friend:delete", () => {
//         getLatestData();
//         router.push(`/chats`);
//       });
//     } catch (error) {
//       console.log(error);
//       router.push(`/chats`);
//     }

//     return () => {
//       pusherClient.unsubscribe(channelName);
//     };
//   }, [router, userId, getLatestData]);

//   const createFriend = async ({ friendId }: { friendId: string }) => {
//     const res = await fetch(`/api/users/${userId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         friendId,
//       }),
//     });
//     if (!res.ok) {
//       // set message null?
//       router.push(`/chats`);
//       return;
//     }

//     const data: { chatId: string } = await res.json();
//     router.push(`/chats/${data.chatId}`);
//     // in api/chats/${userId}, we trigger pusher and so that
//     // the page will be updated after creating a message
//   };

//   const deleteFriend = async ({ chatId }: { chatId: string }) => {
//     const res = await fetch(`/api/users/${userId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         chatId,
//       }),
//     });
//     if (!res.ok) {
//       // set message null?
//       router.push(`/chats`);
//       return;
//     }

//     // in api/chats/${userId}, we trigger pusher and so that
//     // the page will be updated after creating a message
//   };

//   // given username, we want to return its ID and whether you are friends
//   const getUser = async ({ username }: { username: string }) => {
//     // GET api/find/route.ts
//     // we want {exist, friendId}
//     const res = await fetch(`/api/find`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username,
//       }),
//     });
//     if (!res.ok) {
//       // set message null?
//       router.push(`/chats`);
//       return;
//     }

//     const ret: { exist: boolean; friendId: string } = await res.json();

//     return ret;
//   };

//   return {
//     userId,
//     // friends,
//     createFriend,
//     deleteFriend,
//     getUser,
//   };
// };
