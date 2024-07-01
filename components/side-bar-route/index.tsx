"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import Image from "next/image";

interface SubRoute {
  routeName: string;
  subRoutes?: SubRoute[];
  url?: string;
}

interface SideBarRouteProps {
  image: string;
  routeName: string;
  subRoutes?: SubRoute[];
  isOpen?: boolean;
  url?: string;
  onToggle?: () => void;
  onRouteClick?: (url?: string) => void;
}

const SideBarRoute: React.FC<SideBarRouteProps> = ({
  image,
  routeName,
  subRoutes,
  isOpen,
  url,
  onToggle,
  onRouteClick
}) => {
  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([]);

  const toggleAccordionItem = (value: string) => {
    setOpenAccordionItems((prevOpenItems) =>
      prevOpenItems.includes(value)
        ? prevOpenItems.filter((item) => item !== value)
        : [...prevOpenItems, value]
    );
  };

  const isAccordionItemOpen = (value: string) => openAccordionItems.includes(value);

  const handleRouteClick = (clickedUrl?: string) => {
    if (onRouteClick) {
      onRouteClick(clickedUrl);
    }
  };

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex w-full items-center gap-6 cursor-pointer" onClick={() => toggleAccordionItem(routeName)}>
        <Image src={image} alt="side-bar-image" width={24} height={24} onClick={onToggle} />
        <div className="flex w-40 justify-between">
          <p
            className={`mb-0 text-mth-silver-200 hover:text-mth-grey-blue-900 transition duration-300 ease-in-out font-poppins ${isOpen ? "block" : "hidden"}`}
            onClick={() => handleRouteClick(url)}
          >
            {routeName}
          </p>
          {subRoutes && isOpen && (
            <div className="ml-3 pt-1">
              <Image
                src={isAccordionItemOpen(routeName) ? "/assets/images/arrowup.svg" : "/assets/images/arrowdown.svg"}
                alt={isAccordionItemOpen(routeName) ? "arrowup" : "arrowdown"}
                className="items-center justify-center"
                width={16}
                height={16}
              />
            </div>
          )}
        </div>
      </div>

      {subRoutes && isOpen && (
        <Accordion type="multiple" className={isAccordionItemOpen(routeName) ? "block w-full pt-5" : "hidden"}>
          {subRoutes.map((subRoute, index) => (
            <AccordionItem key={index} value={`${routeName}-${index}`} className="pl-6 justify-between">
              <AccordionTrigger
                className="flex mb-3 pl-6 items-center justify-between text-mth-silver-200 hover:text-mth-grey-blue-900 transition duration-300 ease-in-out "
                onClick={() => toggleAccordionItem(`${routeName}-${index}`)}
              >
                  <p className="block" onClick={() => handleRouteClick(subRoute.url)}>{subRoute.routeName}</p>
                  {subRoute.subRoutes && (
                    <Image
                      src={isAccordionItemOpen(`${routeName}-${index}`) ? "/assets/images/arrowup.svg" : "/assets/images/arrowdown.svg"}
                      alt={isAccordionItemOpen(`${routeName}-${index}`) ? "arrowup" : "arrowdown"}
                      className="block"
                      width={16}
                      height={16}
                    />
                  )}
              </AccordionTrigger>

              {subRoute.subRoutes && (
                <AccordionContent>
                  {subRoute.subRoutes.map((nestedSubRoute, nestedIndex) => (
                    <div
                      key={nestedIndex}
                      className="cursor-pointer mb-2 ml-8 text-mth-silver-200 hover:text-mth-grey-blue-900 transition duration-300 ease-in-out pl-12 text-sm font-normal font-poppins"
                      onClick={() => handleRouteClick(nestedSubRoute.url)}
                    >
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

export default SideBarRoute;
