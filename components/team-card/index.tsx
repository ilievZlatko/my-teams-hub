'use client'

import Image from 'next/image'
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

export type TeamCardProps = {
  orgName: string
  teamId: string
  name: string
  description?: string
  teamMembers: TeamMember[]
}

export const TeamCard = ({
  orgName,
  teamId,
  name,
  teamMembers,
}: TeamCardProps) => {
  const t = useTranslations('page.team.index')

  return (
    <div className="my-1 w-full px-1 max-md:w-[226px] max-sm:mx-auto max-sm:w-[266px] md:w-[220px] lg:my-2 lg:w-[226px] lg:px-2">
      <Card className="space-y-14 overflow-hidden border-0 shadow-md *:space-y-4 *:rounded-xl *:text-center *:font-poppins">
        <CardHeader className="relative h-[90px] items-center bg-mth-blue-100">
          <Image
            src="/assets/images/team-card-image.svg"
            width={97}
            height={97}
            alt="Team card feature image"
            priority
            className="absolute top-[38px] rounded-full border-[3px] border-white"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="line-clamp-2 min-h-[64px] text-[20px] font-normal leading-[30px]">
            {name}
          </CardTitle>
          {orgName !== '' && <p>{orgName}</p>}

          <AvatarCirclesComponent teamMembers={teamMembers} isForCard />

          <CardFooter className="px-0 py-1">
            <Link
              href={`/teams/${teamId}/edit`}
              className="mx-auto w-full max-w-[171px] rounded-xl bg-mth-blue-500 px-3 py-2.5 text-sm text-mth-white-50 transition hover:bg-mth-blue-500/70"
              prefetch
            >
              {t('edit')}
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  )
}
