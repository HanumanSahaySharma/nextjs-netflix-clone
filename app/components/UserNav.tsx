"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const UserNav = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="relative w-10 h-10 rounded-sm p-2">
          <Avatar>
            <AvatarImage
              className="rounded-full"
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback className="rounded-sm">HS</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#333]">
        <DropdownMenuLabel className="flex items-center">
          <Avatar className="w-10 h-10 rounded-full mr-4">
            <AvatarImage
              className="w-10 h-10 rounded-full rounded-full"
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback className="rounded-sm">HS</AvatarFallback>
          </Avatar>
          <div className="text-sm font-normal">
            <p>Hi, Hanuman Sahay</p>
            <p>hani1989sharma@gmail.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserNav;
