'use client'

import { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import Image from 'next/image'
import Link from 'next/link'

interface SubRoute {
  routeName: string
  subRoutes?: SubRoute[]
  url?: string
}

interface SideNavItemProps {
  image: string
  routeName: string
  subRoutes?: SubRoute[]
  isOpen?: boolean
  url?: string
  onToggle?: () => void
  onRouteClick?: (url?: string) => void
}

const SideNavItem: React.FC<SideNavItemProps> = ({
  image,
  routeName,
  subRoutes,
  isOpen,
  url,
  onToggle,
}) => {
  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([])

  useEffect(() => {
    if (isOpen && subRoutes) {
      setOpenAccordionItems(
        subRoutes.map((_, index) => `${routeName}-${index}`),
      )
    } else {
      setOpenAccordionItems([])
    }
  }, [isOpen, routeName, subRoutes])

  const toggleAccordionItem = (value: string) => {
    setOpenAccordionItems((prevOpenItems) =>
      prevOpenItems.includes(value)
        ? prevOpenItems.filter((item) => item !== value)
        : [...prevOpenItems, value],
    )
  }

  const isAccordionItemOpen = (value: string) =>
    openAccordionItems.includes(value)

  return (
    <div className="flex w-full flex-col justify-between">
      <div
        className="flex w-full cursor-pointer items-center gap-6"
        onClick={() => toggleAccordionItem(routeName)}
      >
        <Image
          src={image}
          alt="side-bar-image"
          width={24}
          height={24}
          onClick={onToggle}
        />
        <div className="flex w-44 justify-between">
          {url ? (
            <Link
              href={url as string}
              className={`mb-0 font-poppins text-base font-normal leading-20 text-mth-silver-200 transition duration-300 ease-in-out hover:text-mth-grey-blue-900 lg:text-20 ${isOpen ? 'block' : 'hidden'}`}
            >
              {routeName}
            </Link>
          ) : (
            <p
              className={`mb-0 font-poppins text-base font-normal leading-20 text-mth-silver-200 transition duration-300 ease-in-out hover:text-mth-grey-blue-900 lg:text-20 ${isOpen ? 'block' : 'hidden'}`}
            >
              {routeName}
            </p>
          )}

          {subRoutes && isOpen && (
            <div className="ml-3 pt-1">
              <Image
                src={
                  isAccordionItemOpen(routeName)
                    ? '/assets/images/arrowup.svg'
                    : '/assets/images/arrowdown.svg'
                }
                alt={isAccordionItemOpen(routeName) ? 'arrowup' : 'arrowdown'}
                width={16}
                height={16}
              />
            </div>
          )}
        </div>
      </div>

      {subRoutes && isOpen && (
        <Accordion
          type="multiple"
          className={
            isAccordionItemOpen(routeName) ? 'block w-full pt-5' : 'hidden'
          }
        >
          {subRoutes.map((subRoute, index) => (
            <AccordionItem
              key={index}
              value={`${routeName}-${index}`}
              className="mb-6 w-full"
            >
              {/* {subRoute.url} */}
              <AccordionTrigger
                className="mb-3 ml-12 mr-4 flex w-44 justify-between gap-y-4 text-mth-silver-200 transition duration-300 ease-in-out hover:text-mth-grey-blue-900"
                onClick={() => toggleAccordionItem(`${routeName}-${index}`)}
              >
                {subRoute.url ? (
                  <Link
                    className="text-base font-normal leading-20 lg:text-base"
                    href={subRoute.url as string}
                  >
                    {subRoute.routeName}
                  </Link>
                ) : (
                  <p className="text-base font-normal leading-20 lg:text-base">
                    {subRoute.routeName}
                  </p>
                )}

                {subRoute.subRoutes && (
                  <Image
                    src={
                      isAccordionItemOpen(`${routeName}-${index}`)
                        ? '/assets/images/arrowdown.svg'
                        : '/assets/images/arrowup.svg'
                    }
                    alt={
                      isAccordionItemOpen(`${routeName}-${index}`)
                        ? 'arrowdown'
                        : 'arrowup'
                    }
                    className="my-auto block"
                    width={16}
                    height={16}
                  />
                )}
              </AccordionTrigger>

              {subRoute.subRoutes && (
                <AccordionContent>
                  {subRoute.subRoutes.map((nestedSubRoute, nestedIndex) =>
                    nestedSubRoute.url ? (
                      <Link
                        key={nestedIndex}
                        className="mb-2 ml-8 block cursor-pointer pl-12 font-poppins text-sm font-normal leading-20 text-mth-silver-200 transition duration-300 ease-in-out hover:text-mth-grey-blue-900 lg:text-sm"
                        href={nestedSubRoute.url as string}
                      >
                        {nestedSubRoute.routeName}
                      </Link>
                    ) : (
                      <p
                        key={nestedIndex}
                        className="mb-2 ml-8 cursor-pointer pl-12 font-poppins text-sm font-normal leading-20 text-mth-silver-200 transition duration-300 ease-in-out hover:text-mth-grey-blue-900 lg:text-sm"
                      >
                        {nestedSubRoute.routeName}
                      </p>
                    ),
                  )}
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}

export default SideNavItem
