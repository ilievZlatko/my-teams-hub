'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Trash2, FilePenLine } from 'lucide-react'

import { TeamMember } from '@/types/team'
import { cn, getRandomNumber } from '@/lib/utils'
import { TableCell, TableRow } from '@/components/ui/table'
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export type TeamTableProps = {
  teamId: string
  name: string
  description?: string
  teamMembers: TeamMember[]
}

export const TeamRowElement = ({
  teamId,
  name,
  teamMembers,
}: TeamTableProps) => {
  const t = useTranslations('page.team.index')

  let membersSliced: TeamMember[] = []

  if (teamMembers.length > 4) {
    membersSliced = teamMembers.slice(0, 4)
  }

  return (
    <TableRow className="border-none *:text-mth-grey-blue-700">
      <TableCell className="max-w-[50px] truncate">#{teamId}</TableCell>
      <TableCell className="flex items-center gap-2 max-sm:flex-col max-sm:items-start">
        <Image
          src="/assets/images/team-card-image.svg"
          className="rounded-xl bg-mth-silver-100"
          width={32}
          height={32}
          alt="author"
          priority
        />
        <p>{name}</p>
      </TableCell>
      <TableCell>
        <div className="relative flex items-center justify-start *:border-[1.6px] *:border-mth-white-50 *:bg-mth-silver-100">
          {teamMembers?.length === 0 ? (
            <p className="border-none !bg-transparent text-xs text-mth-dark-300">
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
      </TableCell>
      {/* //TODO: make dynamic or remove?  */}
      <TableCell>13/05/2022</TableCell>
      <TableCell>
        <div className="flex justify-start gap-[18px]">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/teams/${teamId}/edit`}>
                  <FilePenLine
                    strokeWidth={'1.8'}
                    className="cursor-pointer bg-transparent text-mth-blue-500"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('edit')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Trash2
                  strokeWidth={'1.8'}
                  className="cursor-pointer bg-transparent text-[#F63333]"
                  onClick={() => {}}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('delete')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </TableCell>
    </TableRow>
  )
}
