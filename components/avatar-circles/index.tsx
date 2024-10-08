'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { cn, getRandomNumber } from '@/lib/utils'

const _fakeMembers = [
  {
    memberId: '12377-asss-47t7-87ggcx',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@mail.com',
    phone: '+123569878',
    status: 0,
    role: 1,
  },
  {
    memberId: '895-37i7-ass-57t7-87ggcx',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@mail.com',
    phone: '+0003569778',
    status: 2,
    role: 2,
  },
  {
    memberId: '10hy77-asss-47t7-87gjix',
    firstName: 'Mark',
    lastName: 'Stale',
    email: 'mark.stale@gmail.com',
    phone: '+3535600078',
    status: 1,
    role: 2,
  },
  {
    memberId: '10hy77-asss-47t7-87gjix',
    firstName: 'Alex',
    lastName: 'Bloom',
    email: 'bloom.alex@gmail.com',
    phone: '+1478801078',
    status: 0,
    role: 2,
  },
  {
    memberId: 'b78a77-asss-47t7-8788oj',
    firstName: 'Maria',
    lastName: 'Taylor',
    email: 'bloom.alex@gmail.com',
    phone: '+3598981078',
    status: 1,
    role: 2,
  },
]

export type AvatarCirclesComponentProps = {
  teamMembers: TeamMember[]
  isForCard?: boolean
}

export const AvatarCirclesComponent = ({
  teamMembers,
  isForCard = true,
}: AvatarCirclesComponentProps) => {
  const t = useTranslations('page.team.index')

  // TODO: Comment out the row below to see the real team members data from server
  teamMembers = _fakeMembers

  let membersSliced: TeamMember[] = []
  if (teamMembers.length > 4) {
    membersSliced = teamMembers.slice(0, 4)
  }

  return (
    <div
      className={cn(
        'relative min-h-[37px] *:rounded-full',
        isForCard &&
          teamMembers.length === 1 &&
          'ml-[41px] max-md:ml-[48px] max-sm:ml-[70px] lg:ml-[44px]',
        isForCard &&
          teamMembers.length === 2 &&
          'ml-[28px] max-md:ml-[32px] max-sm:ml-[52px] md:ml-[30px]',
        isForCard &&
          teamMembers.length === 3 &&
          'ml-[17px] max-md:ml-[19px] max-sm:ml-[39px]',
        isForCard &&
          teamMembers.length === 4 &&
          'max-md:ml-1 max-sm:ml-[23px] md:ml-[2px] lg:ml-0',
        isForCard && teamMembers.length > 4 && 'max-sm:ml-[19px] lg:-ml-[7px]',
        !isForCard && teamMembers.length <= 3 && 'ml-0',
      )}
    >
      {teamMembers?.length === 0 ? (
        <p className="h-[37px] w-full px-4 pt-2 align-middle text-xs text-mth-dark-300">
          {t('no_members_yet')}
        </p>
      ) : teamMembers && teamMembers.length > 0 && teamMembers.length <= 4 ? (
        teamMembers.map((member, i) => (
          <Image
            key={member.memberId}
            src={'/assets/images/avatars/' + getRandomNumber() + '.svg'}
            alt="avatar"
            height={37}
            width={37}
            className={cn(
              'absolute top-0 h-[37px] w-[37px] border-[1.6px] border-mth-white-50 bg-mth-silver-100',
              i === 0 && 'left-[16px] z-10',
              i === 1 && 'left-[47px] z-20',
              i === 2 && 'left-[78px] z-30',
              i === 3 && 'left-[109px] z-40',
            )}
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
            className={cn(
              'absolute top-0 h-[37px] w-[37px] border-[1.6px] border-mth-white-50 bg-mth-silver-100',
              i === 0 && 'left-[10px] z-0',
              i === 1 && 'left-[42px] z-20',
              i === 2 && 'left-[74px] z-30',
              i === 3 && 'left-[106px] z-40',
            )}
          />
        ))
      )}
      <span
        className={cn(
          'absolute left-[147px] top-[7px] z-50',
          teamMembers.length > 4 ? 'flex items-center' : 'hidden',
        )}
      >
        +{teamMembers.length - 4}
      </span>
    </div>
  )
}
