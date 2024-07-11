'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TeamMember } from '@/types/team'
import Link from 'next/link'
import { cn, getRandomNumber } from '@/lib/utils'

export type TeamCardProps = {
  organizationName: string
  teamId: string
  name: string
  description?: string
  teamMembers: TeamMember[]
}

export const TeamCard = ({
  organizationName,
  teamId,
  name,
  teamMembers,
}: TeamCardProps) => {
  const t = useTranslations('page.team.index')

  let membersSliced: TeamMember[] = []
  if (teamMembers.length > 4) {
    membersSliced = teamMembers.slice(0, 4)
  }

  return (
    <div>
      <Card className="flex h-full w-[226px] flex-col space-y-14 border-0 shadow-md *:space-y-4 *:rounded-xl *:text-center *:font-poppins">
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
          {organizationName !== '' && <p>{organizationName}</p>}

          <div className="relative flex min-h-[37px] justify-center *:border-[1.6px] *:border-mth-white-50 *:bg-mth-silver-100">
            {teamMembers?.length === 0 ? (
              <p className="!bg-transparent text-xs text-mth-dark-300">
                {t('no_members_yet')}
              </p>
            ) : teamMembers &&
              teamMembers.length > 0 &&
              teamMembers.length <= 4 ? (
              teamMembers.map((member) => (
                <Image
                  key={member.memberId}
                  src={'/assets/images/avatars/' + getRandomNumber() + '.svg'}
                  alt="avatar"
                  height={37}
                  width={37}
                  className="rounded-full"
                />
              ))
            ) : (
              membersSliced.map((member, i) => (
                <Image
                  key={`${member.memberId}-${i}`}
                  src={'/assets/images/avatars/' + getRandomNumber() + '.svg'}
                  alt="avatar"
                  height={37}
                  width={37}
                  className="rounded-full"
                />
              ))
            )}
            <span
              className={cn(
                'text-normal',
                teamMembers.length > 4 ? 'flex items-center' : 'hidden',
              )}
            >
              + {teamMembers.length - 4}
            </span>
          </div>
          <CardFooter className="mx-auto flex justify-center py-1">
            <Link
              href={`/teams/${teamId}/edit`}
              className="flex h-[36px] w-[142px] items-center justify-center rounded-xl bg-mth-blue-500 text-mth-white-50 transition hover:bg-mth-blue-500/70"
            >
              {t('edit')}
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  )
}
