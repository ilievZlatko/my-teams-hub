'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl';
import Image from 'next/image'
import Link from 'next/link'
import { SidenavKeys } from '@/routes';

interface SideNavItemProps {
  image: string
  routeName: SidenavKeys
  isOpen?: boolean
  url?: string
  onToggle?: () => void
  onRouteClick?: (url?: string) => void
}
const SideNavItem: React.FC<SideNavItemProps> = ({
  image,
  routeName,
  isOpen,
  url,
  onToggle,
}) => {
  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([])
const t = useTranslations('navigation.sidenav');

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
            <Link
              href={url as string}
              className={`mb-0 font-poppins text-base font-normal leading-20 text-mth-silver-200 transition duration-300 ease-in-out hover:text-mth-grey-blue-900 ${isOpen ? 'block' : 'hidden'}`}
              style={{ whiteSpace: 'nowrap' }}
            >
              {t(routeName)}
            </Link>
        </div>
      </div>
    </div>
  )
}

export default SideNavItem
