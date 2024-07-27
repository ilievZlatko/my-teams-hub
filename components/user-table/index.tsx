'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Trash2, FilePenLine } from 'lucide-react'
import { TableCell, TableRow } from '@/components/ui/table'
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useState } from 'react'

export type UserTableProps = {
  userId: string
  firstName: string
  lastName: string
  email: string
  status: number
  creationDate: Date
  teams: IUserTeam[]
  error?: string
}

export const UserTableComponent = ({
  firstName,
  userId,
  lastName,
  creationDate,
  status,
  teams,
}: UserTableProps) => {
  const t = useTranslations('page.user.index')
  const [isActive, setIsActive] = useState(true)
  let teamsText = teams[0].name
  const date = new Date(creationDate)
  const dateString = date.toLocaleDateString()
  const [day, month, year] = dateString.split('.')
  if (teams[1] != undefined) {
    teamsText = `${teams[0]}, ${teams[1]}`
  } else if (teams[2] != undefined) {
    teamsText = `${teams[0]}, ${teams[1]}, ...`
  }

  if (status == 1) {
    setIsActive(false)
  }

  return (
    <TableRow className="border-none *:text-mth-grey-blue-700">
      <TableCell className="max-w-[50px] truncate">{`${firstName} ${lastName}`}</TableCell>
      <TableCell>{teamsText}</TableCell>
      <TableCell>{`${day}/${month}/${year.split(' ')[0]}`}</TableCell>
      <TableCell>
        {isActive ? (
          <p className="bg-customGreenBg text-customGreenText rounded-lg p-1.5 text-center">
            Active
          </p>
        ) : (
          <p className="rounded-lg bg-red-100 p-1.5 text-center text-red-600">
            Not Active
          </p>
        )}
      </TableCell>
      <TableCell>
        <div className="flex justify-start gap-[18px]">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/users/${userId}/edit`}>
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
