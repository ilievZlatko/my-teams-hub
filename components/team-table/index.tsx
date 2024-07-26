'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Trash2, FilePenLine } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { AvatarCirclesComponent } from '@/components/avatar-circles'

export type TeamTableProps = {
  teams: Team[]
}

export const TeamTableComponent = ({ teams }: TeamTableProps) => {
  const t = useTranslations('page.team.index')

  return (
    <div className="rounded-xl border-[3px] border-mth-blue-100 px-1 py-10 lg:px-4">
      <Table>
        <TableHeader className="border-none">
          <TableRow className="items-center border-none">
            <TableHead>{t('team_id')}</TableHead>
            <TableHead>
              <span className="flex items-center gap-2 max-sm:items-start">
                {t('name')}
                <Image
                  src="/assets/images/up_and_down_arrow.svg"
                  width={11}
                  height={11}
                  alt="arrow"
                />
              </span>
            </TableHead>
            <TableHead>
              <span className="flex w-[166px] items-center justify-start gap-2 text-left">
                {t('members')}
                <Image
                  src="/assets/images/up_and_down_arrow.svg"
                  width={11}
                  height={11}
                  alt="arrow"
                />
              </span>
            </TableHead>
            <TableHead>
              <span className="flex items-center gap-2">
                {t('creation_date')}
                <Image
                  src="/assets/images/up_and_down_arrow.svg"
                  width={11}
                  height={11}
                  alt="arrow"
                  priority
                />
              </span>
            </TableHead>
            <TableHead>{t('action')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow
              key={team.teamId}
              className="border-none *:text-mth-grey-blue-700"
            >
              <TableCell className="max-w-[50px] truncate">
                #{team.teamId}
              </TableCell>
              <TableCell className="flex items-center gap-2 max-sm:flex-col max-sm:items-start">
                <Image
                  src="/assets/images/team-card-image.svg"
                  className="rounded-xl bg-mth-silver-100"
                  width={32}
                  height={32}
                  alt="author"
                  priority
                />
                <p>{team.name}</p>
              </TableCell>
              <TableCell className="items-center pl-0 text-left">
                <AvatarCirclesComponent
                  teamMembers={team.teamMembers ?? []}
                  isForCard={false}
                />
              </TableCell>
              {/* //TODO: make dynamic or remove?  */}
              <TableCell>13/05/2022</TableCell>
              <TableCell>
                <div className="flex justify-start gap-[18px]">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/teams/${team.teamId}/edit`}>
                          <FilePenLine
                            strokeWidth={'1.8'}
                            className="cursor-pointer bg-transparent text-mth-blue-500"
                          />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{t('edit')}</p>
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
                        <p className="text-xs">{t('delete')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
