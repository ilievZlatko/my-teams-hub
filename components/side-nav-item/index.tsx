'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { SidenavKeys } from '@/enums/side-nav'

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
  const t = useTranslations('navigation.sidenav')

  return (
    <div className="flex w-full flex-col justify-between">
      <div className="flex w-full cursor-pointer items-center gap-6">
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
            className={`mb-0 whitespace-nowrap font-poppins text-base font-normal leading-20 text-mth-silver-200 transition duration-300 ease-in-out hover:text-mth-grey-blue-900 ${isOpen ? 'block' : 'hidden'}`}
          >
            {t(routeName)}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SideNavItem
