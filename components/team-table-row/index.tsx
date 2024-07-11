'use client'

import Image from 'next/image'
import { Trash2, FilePenLine } from 'lucide-react'

import { TeamMember } from '@/types/team'
import { cn, getRandomNumber } from '@/lib/utils'
import { TableCell, TableRow } from '@/components/ui/table'

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
  let membersSliced: TeamMember[] = []

  if (teamMembers.length > 4) {
    membersSliced = teamMembers.slice(0, 4)
  }

  return (
    <TableRow className="*:text-mth-grey-blue-700">
      <TableCell className="max-w-[50px] truncate">#{teamId}</TableCell>
      <TableCell className="flex items-center gap-2">
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
      </TableCell>
      {/* //TODO: make dynamic  */}
      <TableCell>13/05/2022</TableCell>
      <TableCell>
        <div className="mt-[10px] flex justify-center gap-[18px]">
          <FilePenLine
            className="cursor-pointer bg-transparent text-mth-blue-500"
            onClick={() => {}}
          />
          <Trash2
            className="cursor-pointer bg-transparent text-[#F63333]"
            onClick={() => {}}
          />
        </div>
      </TableCell>
    </TableRow>
  )
}
