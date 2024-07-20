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
import { IUserTeam } from '@/types/user'

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
    teams
}: UserTableProps) => {
    const t = useTranslations('page.user.index')

    const [year, month, day] = creationDate.split("T")[0].split("-")
    console.log(teams[0].name)



    return (
        <TableRow className="border-none *:text-mth-grey-blue-700">
            <TableCell className="max-w-[50px] truncate">{`${firstName} ${lastName}`}</TableCell>
            <TableCell className="flex items-center gap-2 max-sm:flex-col max-sm:items-start">
                {teams[0].name}
            </TableCell>
            <TableCell>
                {`${day}/${month}/${year}`}
            </TableCell>
            {/* //TODO: make dynamic or remove?  */}
            <TableCell>{status}</TableCell>
            <TableCell>
                <div className="flex justify-start gap-[18px]">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href={`/teams/${userId}/edit`}>
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
                                    onClick={() => { }}
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
