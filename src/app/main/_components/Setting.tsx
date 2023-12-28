import { RxAvatar } from "react-icons/rx";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Setting({ userName }: { userName: string }) {
  const splitColor = "slate-500";
  const borderColor = "border-" + splitColor;
  const seperatorColor = "bg-" + splitColor;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <RxAvatar size={30} className="ml--1" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={"mr-8 w-40 bg-gray-600 text-slate-300 " + borderColor}
        >
          <DropdownMenuLabel>{userName}</DropdownMenuLabel>
          <DropdownMenuSeparator className={seperatorColor} />
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <Link href={`/main/setting`}>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className={seperatorColor} />
          <Link href={`/auth/signout`}>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
