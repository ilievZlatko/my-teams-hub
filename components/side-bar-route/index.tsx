"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface SubRoute {
  routeName: string;
  subRoutes?: SubRoute[];
  url?: string;
}

type SideBarRouteProps = {
  image: string;
  routeName: string;
  subRoutes?: SubRoute[];
  isOpen?: boolean;
  url?: string
  onToggle?: () => void;
  onRouteClick?: (url?: string) => void;
};

export const SideBarRoute: React.FC<SideBarRouteProps> = ({ image, routeName, subRoutes, isOpen, url, onToggle, onRouteClick }) => {
  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([]);

  const toggleAccordionItem = (value: string) => {
    if (openAccordionItems.includes(value)) {
      setOpenAccordionItems(openAccordionItems.filter(item => item !== value));
    } else {
      setOpenAccordionItems([...openAccordionItems, value]);
    }
  };

  const isAccordionItemOpen = (value: string) => openAccordionItems.includes(value);

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex w-full items-center gap-6 cursor-pointer" onClick={() => toggleAccordionItem(routeName)}>
        <Image src={image} alt={"side-bar-image"} width={24} height={24} onClick={onToggle} />
        <p
          className={`${isOpen ? "block" : "hidden"} mb-0 text-mth-silver-200 hover:text-mth-grey-blue-900 transition duration-300 ease-in-out font-poppins`}
          onClick={(e) => {
            if (onRouteClick) {
              onRouteClick(url)
            }
          }
          }
        >
          {routeName}
        </p>
        {subRoutes && isOpen && (
          <div className="ml-3 pt-1">
            {isAccordionItemOpen(routeName) ? (
              <ChevronUp className="h-5 w-6 transition-transform duration-200 text-mth-silver-200" />
            ) : (
              <ChevronDown className="h-5 w-6 transition-transform duration-200 text-mth-silver-200" />
            )}
          </div>
        )}
      </div>
      {subRoutes && isOpen && (
        <Accordion type="multiple" className={`${isAccordionItemOpen(routeName) ? "block" : "hidden"} w-full pt-5`}>
          {subRoutes.map((subRoute, index) => (
            <AccordionItem key={index} value={`${routeName}-${index}`}>
              <AccordionTrigger
                className="flex justify-between mb-3 ml-6 text-mth-silver-200 hover:text-mth-grey-blue-900 transition duration-300 ease-in-out pl-6"
                onClick={() => toggleAccordionItem(`${routeName}-${index}`)}
              >
                <p onClick={
                  () => {
                    if (onRouteClick) {
                      onRouteClick(subRoute.url)
                    }
                  }}>
                  {subRoute.routeName}
                </p>
                {subRoute.subRoutes && (
                  <div className="ml-3">
                    {isAccordionItemOpen(`${routeName}-${index}`) ? (
                      <ChevronUp className="h-5 w-6 transition-transform duration-200 text-mth-silver-200" />
                    ) : (
                      <ChevronDown className="h-5 w-6 transition-transform duration-200 text-mth-silver-200" />
                    )}
                  </div>
                )}
              </AccordionTrigger>
              {subRoute.subRoutes && (
                <AccordionContent>
                  {subRoute.subRoutes.map((nestedSubRoute, nestedIndex) => (
                    <div
                      key={nestedIndex}
                      className="cursor-pointer mb-2 ml-8 text-mth-silver-200 hover:text-mth-grey-blue-900 transition duration-300 ease-in-out pl-12 text-sm font-normal font-poppins"
                      onClick={
                        () => {
                          if (onRouteClick) {
                            onRouteClick(nestedSubRoute.url)
                          }
                        }}
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
