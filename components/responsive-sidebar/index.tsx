"use client";

import Image from "next/image";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetTitle, SheetTrigger } from "../ui/sheet";
import { routes } from "../side-bar";
import SideBarRoute from "../side-bar-route";
import { UserMenu } from "../user-menu";


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
                <SheetContent className='bg-mth-grey-blue-600 flex flex-col gap-6'>
                    <SheetTitle>
                        <SheetClose>
                            <Image
                                src={"/assets/images/hamburger.svg"}
                                alt="hamburger"
                                className="cursor-pointer"
                                width={24}
                                height={24}
                            />
                        </SheetClose>
                    </SheetTitle>
                    <SheetDescription></SheetDescription>
 
                    {routes.map((route, index) => (
                        <div className="mb-4">
                        <SideBarRoute
                            key={index}
                            image={route.image}
                            routeName={route.routeName}
                            subRoutes={route.subRoutes}
                            url={route.url}
                            isOpen={true}
                        />
                        </div>
                    ))}
                    <SheetFooter className="flex mt-auto w-full">
                        <div className="flex">
                            <div className="w-7 h-7">
                                <UserMenu />
                            </div>
                            <p className="ml-5">My Profile</p>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}
