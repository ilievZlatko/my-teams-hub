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

export const UserMenu = async() => {
  const locale = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={"/assets/images/profile.svg"}
          alt="hamburger"
          className="cursor-pointer relative lg:top-1"
          width={50}
          height={50}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          My Profile
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <div className="flex gap-2">
            <p className="font-semibold">Name:</p>
            <p>Test</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex gap-2">
            <p className="font-semibold">Email:</p>
            <p>test@abv.bg</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logout(locale)}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
