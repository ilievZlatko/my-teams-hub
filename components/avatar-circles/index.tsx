'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { cn, getRandomNumber } from '@/lib/utils'
import { TeamMember } from '@/types/team'

const _fakeMembers = [
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
        isForCard && teamMembers.length === 1 && 'ml-[49px]',
        isForCard && teamMembers.length === 2 && 'ml-[33px]',
        isForCard && teamMembers.length === 3 && 'ml-[19px]',

        !isForCard && teamMembers.length <= 3 && 'ml-0',
      )}
    >
      {teamMembers?.length === 0 ? (
        <p className="px-4 text-xs text-mth-dark-300">{t('no_members_yet')}</p>
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
              i === 0 && 'left-[24px] z-10',
              i === 1 && 'left-[55px] z-20',
              i === 2 && 'left-[86px] z-30',
              i === 3 && 'left-[117px] z-40',
              !isForCard && i === 0 && 'left-[16px]',
              !isForCard && i === 1 && 'left-[47px]',
              !isForCard && i === 2 && 'left-[78px]',
              !isForCard && i === 3 && 'left-[109px]',
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
              i === 0 && 'left-[12px] z-0',
              i === 1 && 'left-[44px] z-20',
              i === 2 && 'left-[76px] z-30',
              i === 3 && 'left-[108px] z-40',
              !isForCard && i === 0 && 'left-[10px]',
              !isForCard && i === 1 && 'left-[42px]',
              !isForCard && i === 2 && 'left-[74px]',
              !isForCard && i === 3 && 'left-[106px]',
            )}
          />
        ))
      )}
      <span
        className={cn(
          'absolute left-[146px] top-[7px] z-50',
          teamMembers.length > 4 ? 'flex items-center' : 'hidden',
        )}
      >
        +{teamMembers.length - 4}
      </span>
    </div>
  )
}
