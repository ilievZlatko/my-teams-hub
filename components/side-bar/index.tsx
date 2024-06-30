"use client";
import Image from "next/image";
import { useState } from "react";
import { SideBarRoute } from "@/components/side-bar-route/index";

export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { 
      image: "/assets/images/overview.svg", 
      routeName: "Overview",
    },
    {
      image: "/assets/images/management.svg",
      routeName: "Management",
      subRoutes: [
        { routeName: "Organisation’s chart" },
        { routeName: "Teams",
          subRoutes: [
            { routeName: "View All Teams" },
            { routeName: "Add Team" },
            { routeName: "Edit Team" },
          ],
         },
        {
          routeName: "Users",
          subRoutes: [
            { routeName: "View All Users" },
            { routeName: "Add User" },
            { routeName: "Edit User" },
          ],
        },
      ],
    },
    { 
      image: "/assets/images/evaluation.svg", 
      routeName: "Evaluation",
    },
  ];

  return (
    <div className={`bg-mth-grey-blue-600 h-full transition-width duration-300 ease-in-out ${isOpen ? "w-80" : "w-22"}`}>
      <div className="flex flex-col items-start space-y-10 px-8">
        <Image
          src={"/assets/images/hamburger.svg"}
          alt="hamburger"
          className="cursor-pointer"
          width={24}
          height={24}
          onClick={() => setIsOpen(!isOpen)}
        />
        {routes.map((route, index) => (
          <SideBarRoute key={index} image={route.image} routeName={route.routeName} subRoutes={route.subRoutes} isOpen={isOpen} />
        ))}
      </div>
    </div>
  );
};
