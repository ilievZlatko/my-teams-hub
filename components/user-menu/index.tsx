"use client";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logout } from "@/actions/logout";
import { useLocale } from "next-intl";

export const UserMenu = () => {
  const locale = useLocale()

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
        <DropdownMenuItem onClick={() => logout(locale)}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
