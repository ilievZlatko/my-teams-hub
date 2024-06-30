"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SideBarRoute } from "@/components/side-bar-route/index";
import { useRouter } from "next/navigation";

export const routes = [
  {
    image: "/assets/images/overview.svg",
    routeName: "Overview",
    url: "/"
  },
  {
    image: "/assets/images/management.svg",
    routeName: "Management",
    subRoutes: [
      { routeName: "Organisation’s chart", url:"/organisations" },
      {
        routeName: "Teams",
        subRoutes: [
          { routeName: "View All Teams", url:"/view-all-teams" },
          { routeName: "Add Team", url:"/add-team" },
          { routeName: "Edit Team", url:"/edit-team" },
        ],
      },
      {
        routeName: "Users",
        subRoutes: [
          { routeName: "View All Users", url:"/all-users" },
          { routeName: "Add User", url:"/add-user" },
          { routeName: "Edit User", url:"/edit-user" },
        ],
      },
    ],
  },
  {
    image: "/assets/images/evaluation.svg",
    routeName: "Evaluation",
    // url: "/"
  },
];

export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();


  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRouteClick = (url?: string) => {
    if (url) {
      router.push(url);
      // setIsOpen(false); 
    }
  };


  return (
    <div ref={sidebarRef} className={`hidden md:block bg-mth-grey-blue-600 h-full transition-width duration-300 ease-in-out ${isOpen ? "w-80" : "w-22"}`}>
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
          <SideBarRoute
            onToggle={() => {
              if (!isOpen) {
                setIsOpen(true)
              }
            }}
            key={index}
            image={route.image}
            routeName={route.routeName}
            subRoutes={route.subRoutes}
            isOpen={isOpen}
            url={route.url}
      
            onRouteClick={handleRouteClick} />
        ))}
      </div>
    </div>
  );
};
