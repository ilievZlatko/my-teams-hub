'use client'

import Image from 'next/image'

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

// TODO: 'fakeMembers' is used for testing how the team members are displayed on the card
const fakeMembers = [
  {
    memberId: '12377-asss-47t7-87ggcx',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@mail.com',
    phone: '+123569878',
    status: 0,
  },
  {
    memberId: '895-37i7-ass-57t7-87ggcx',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@mail.com',
    phone: '+0003569778',
    status: 2,
  },
  {
    memberId: '10hy77-asss-47t7-87gjix',
    firstName: 'Mark',
    lastName: 'Stale',
    email: 'mark.stale@gmail.com',
    phone: '+3535600078',
    status: 1,
  },
  {
    memberId: '10hy77-asss-47t7-87gjix',
    firstName: 'Alex',
    lastName: 'Bloom',
    email: 'bloom.alex@gmail.com',
    phone: '+1478801078',
    status: 0,
  },
  {
    memberId: 'b78a77-asss-47t7-8788oj',
    firstName: 'Maria',
    lastName: 'Taylor',
    email: 'bloom.alex@gmail.com',
    phone: '+3598981078',
    status: 1,
  },
]

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
  // let membersSliced: TeamMember[] = []
  // if (fakeMembers.length > 4) {
  //   membersSliced = fakeMembers.slice(0, 4)
  // }

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
          <CardTitle className="text-[20px] font-normal leading-[30px]">
            {name}
          </CardTitle>
          <p>{organizationName}</p>

          <div className="relative flex justify-center *:border-[1.6px] *:border-mth-white-50 *:bg-mth-silver-100">
            {teamMembers?.length === 0 ? (
              <p className="!bg-transparent text-xs text-mth-dark-300">
                No Members Yet
              </p>
            ) : teamMembers &&
              teamMembers.length > 0 &&
              teamMembers.length <= 4 ? (
              teamMembers.map((member, i) => (
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
              className="flex h-[36px] w-[122px] items-center justify-center rounded-xl bg-mth-blue-500 text-mth-white-50 transition hover:bg-mth-blue-500/70"
            >
              Edit
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  )
}
