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
          My Profile
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <div className="flex">
            <p>Name:</p>
            <p>Geotgi</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex">
            <p>Email:</p>
            <p>geotgi@abv.bg</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logout(locale)}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
