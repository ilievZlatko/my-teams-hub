"use client";
import Image from "next/image";
import { useState } from "react";

type SideBarRouteProps = {
    image: string;
    routeName: string;
    isOpen: boolean;
}

export const SideBarRoute = ({image, routeName, isOpen}:SideBarRouteProps) => {

  return (
      <div className="flex items-center gap-6 cursor-pointer">
        <Image
          src={image}
          alt={"side-bar-image"}
          width={24}
          height={24}
        />
        <p className={`${isOpen ? "block" : "hidden"} mb-0 text-mth-silver-200 hover:text-mth-grey-blue-900 transition duration-300 ease-in-out`}>
        {routeName}
        </p>
      </div>
  );
};
