"use client";

import Image from "next/image";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const UserMenu = () => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={"/assets/images/profile.svg"}
          alt="hamburger"
          className="cursor-pointer"
          width={60}
          height={60}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
            <div>
                <p>Name:</p>
                <p className="text-xs">email</p>
            </div>
            </DropdownMenuLabel>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    // <div className="relative">
    //   <Image
    //     src={"/assets/images/profile.svg"}
    //     alt="hamburger"
    //     className="cursor-pointer"
    //     width={24}
    //     height={24}
    //     onClick={() => setIsOpen(!isOpen)}
    //   />
    //   {isOpen && (
    //     <div className="absolute top-0 right-0  h-full border rounded-md shadow">

    //         <p>Profile</p>
    //         <p>LogOut</p>
    //     </div>
    //   )}
    // </div>
  );
};
