'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import SideNavRoute from '@/components/side-nav-route/index'
import { routes } from '@/routes'

export const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={sidebarRef}
      className={`transition-width hidden h-full bg-mth-grey-blue-600 duration-300 ease-in-out lg:block ${isOpen ? 'w-80' : 'w-22'}`}
    >
      <div className="flex flex-col items-start space-y-10 px-8">
        <Image
          src={'/assets/images/hamburger.svg'}
          alt="hamburger"
          className="cursor-pointer"
          width={24}
          height={24}
          onClick={() => setIsOpen(!isOpen)}
        />
        {routes.map((route, index) => (
          <SideNavRoute
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
          />
        ))}
      </div>
    </div>
  )
}
