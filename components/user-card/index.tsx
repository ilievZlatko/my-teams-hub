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
import { IUserTeam } from '@/types/user'

export type UserCardProps = {
  userId: string
  firstName: string
  lastName: string
  email: string
  status: number
  creationDate: Date
  teams: IUserTeam[]
  error?: string
}

export const UserCard = ({
  email,
  firstName,
  lastName,
  teams,
}: UserCardProps) => {
  const t = useTranslations('page.user.index')

  let teamsText = teams[0].name

  if (teams[1] != undefined) {
    teamsText = `${teams[0]}, ${teams[1]}`
  } else if (teams[2] != undefined) {
    teamsText = `${teams[0]}, ${teams[1]}, ...`
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
          <CardTitle className="line-clamp-2 min-h-[44px] text-[20px] font-normal leading-[30px]">
            {`${firstName} ${lastName}`}
          </CardTitle>
          <span>{teamsText}</span>
          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-1 max-sm:items-start">
              <Image
                src="/assets/images/phone.svg"
                width={14}
                height={14}
                alt="phone"
              />
              <p className="text-left text-[12px] font-normal">359 88 888 88</p>
            </span>
            <span className="flex items-center gap-1 max-sm:items-start">
              <Image
                src="/assets/images/email.svg"
                width={14}
                height={14}
                alt="phone"
              />
              <p className="text-left text-[12px] font-normal">{email}</p>
            </span>
          </div>

          <CardFooter className="mx-auto flex justify-center py-1">
            <Link
              href={`/userId/profile`}
              className="flex w-[142px] items-center justify-center rounded-xl bg-mth-blue-500 px-3 py-2.5 text-sm text-mth-white-50 transition hover:bg-mth-blue-500/70"
              prefetch
            >
              {t('see-profile')}
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  )
}
