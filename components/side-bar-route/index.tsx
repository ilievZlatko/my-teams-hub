// "use client";
// import {Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
// import Image from "next/image";

// type SideBarRouteProps = {
//     image: string;
//     routeName: string;
//     isOpen: boolean;
// }

// export const SideBarRoute = ({image, routeName, isOpen}:SideBarRouteProps) => {

//   return (
//       <div className="flex items-center gap-6 cursor-pointer">
//         <Image
//           src={image}
//           alt={"side-bar-image"}
//           width={24}
//           height={24}
//         />
//         <p className={`${isOpen ? "block" : "hidden"} mb-0 text-mth-silver-200 hover:text-mth-grey-blue-900 transition duration-300 ease-in-out`}>
//         {routeName}
//         </p>
//       </div>
//   );
// };


"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import Image from "next/image";

type SideBarRouteProps = {
  image: string;
  routeName: string;
  subRoutes?: Array<{ routeName: string; subRoutes?: Array<{ routeName: string }> }>;
  isOpen: boolean;
};

export const SideBarRoute = ({ image, routeName, subRoutes, isOpen }: SideBarRouteProps) => {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex items-center gap-6 cursor-pointer">
        <Image src={image} alt={"side-bar-image"} width={24} height={24} />
        <p className={`${isOpen ? "block" : "hidden"} mb-0 text-mth-silver-200 hover:text-mth-grey-blue-900 transition duration-300 ease-in-out`}>
          {routeName}
        </p>
      </div>
      {subRoutes && (
        <Accordion type="single" collapsible className="w-full">
          {subRoutes.map((subRoute, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className={`${isOpen ? "block" : "hidden"} mb-0 text-mth-silver-200 hover:text-mth-grey-blue-900 transition duration-300 ease-in-out pl-6`}>
                {subRoute.routeName}
              </AccordionTrigger>
              {subRoute.subRoutes && (
                <AccordionContent>
                  {subRoute.subRoutes.map((nestedSubRoute, nestedIndex) => (
                    <div key={nestedIndex} className={`${isOpen ? "block" : "hidden"} mb-0 text-mth-silver-200 hover:text-mth-grey-blue-900 transition duration-300 ease-in-out pl-12`}>
                      {nestedSubRoute.routeName}
                    </div>
                  ))}
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};
