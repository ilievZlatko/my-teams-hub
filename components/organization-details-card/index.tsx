'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AvatarCirclesComponent } from '@/components/avatar-circles'
import { useState } from 'react'

export type TeamCardProps = {
  teamId: string
  name: string
  description?: string
  teamMembers: TeamMember[]
}

export const OrganisationDetailsCard = ({
  teamId,
  name,
  teamMembers,
}: TeamCardProps) => {
  const t = useTranslations('page.organization.details');

  return (
    <div className="my-1 w-full px-1 max-md:w-[226px] max-sm:mx-auto max-sm:w-[266px] md:w-[220px] lg:my-2 lg:w-[226px] lg:px-2">
      <Card className="space-y-14 overflow-hidden border-0 shadow-md *:space-y-4 *:rounded-xl *:text-center *:font-poppins">
        <CardHeader className="relative h-[90px] items-center bg-mth-blue-100">
          <div className=" flex justify-center content-center w-[97px] h-[97px] absolute top-[38px] rounded-full border-[3px] border-white bg-mth-blue-100 overflow-hidden">
              <h1 className='self-center text-4xl font-bold text-mth-grey-blue-500'>{name.slice(0, 2).toUpperCase()}</h1>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="line-clamp-2 min-h-[64px] text-[20px] font-normal leading-[30px]">
            {name}
          </CardTitle>

          <AvatarCirclesComponent teamMembers={teamMembers} isForCard />

          <CardFooter className="mx-auto flex justify-center py-1">
            <Link
              href={``}
              prefetch
              className="mx-auto w-full max-w-[171px] rounded-xl bg-mth-blue-500 px-3 py-2.5 text-sm text-mth-white-50 transition hover:bg-mth-blue-500/70"
            >
              {t('view_more')}
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  )
}
