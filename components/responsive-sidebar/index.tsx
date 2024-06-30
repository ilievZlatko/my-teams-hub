"use client";

import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { routes } from "../side-bar";
import { SideBarRoute } from "../side-bar-route";


export const ResponsiveSideBar = () => {
    return (
        <div className='block md:hidden h-full'>
            <Sheet>
                <SheetTrigger>
                    <Image
                        src={"/assets/images/hamburger.svg"}
                        alt="hamburger"
                        className="cursor-pointer"
                        width={24}
                        height={24}
                    />
                </SheetTrigger>
                <SheetContent className='bg-mth-grey-blue-600'>
                    {routes.map((route, index) => (
                        <SideBarRoute
                            key={index}
                            image={route.image}
                            routeName={route.routeName}
                            subRoutes={route.subRoutes}
                            url={route.url}
                            isOpen={true}
                        />
                    ))}
                </SheetContent>
            </Sheet>
        </div>
    )
}
