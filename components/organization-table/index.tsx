'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Trash2, Users } from 'lucide-react'

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
import { Organisation } from '@/types/organisation.types'

export type OrganizationTableProps = {
  organizations: Organisation[]
}

export const OrganizationTable = ({
  organizations,
}: OrganizationTableProps) => {
  const t = useTranslations('page.organization.index')

  return (
    <div className="rounded-xl border-[3px] border-mth-blue-100 px-1 py-10 lg:px-4">
      <Table>
        <TableHeader className="border-none">
          <TableRow className="items-center border-none">
            <TableHead>
              <span className="flex items-center gap-4 max-sm:items-start">
                {t('name')}
                <Image
                  src="/assets/images/up_and_down_arrow.svg"
                  width={11}
                  height={11}
                  alt="arrow"
                />
              </span>
            </TableHead>
            <TableHead className="flex w-[166px] items-center justify-start text-left">
              {t('description')}
            </TableHead>
            <TableHead>
              <span className="flex items-center gap-4">
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
          {organizations.map((org) => (
            <TableRow
              key={org.organizationId}
              className="border-none *:text-mth-grey-blue-700"
            >
              <TableCell className="flex items-center gap-2 max-sm:flex-col max-sm:items-start">
                <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-mth-blue-100 text-[20px] font-bold text-mth-grey-blue-500">
                  {org.organizationName.substring(0, 1).toUpperCase()}
                </span>
                <p>{org.organizationName}</p>
              </TableCell>
              <TableCell className="max-w-[200px] truncate text-left">
                {/* //TODO: display description when the server does return it */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente, dignissimos.
              </TableCell>
              {/* //TODO: make dynamic when the server does return it  */}
              <TableCell>13/05/2022</TableCell>
              <TableCell>
                <div className="flex justify-start gap-[18px]">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={`/organizations/${org.organizationId}`}
                          prefetch
                        >
                          <Users
                            strokeWidth={'1.8'}
                            className="cursor-pointer bg-transparent text-mth-blue-500"
                          />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{t('see_teams')}</p>
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
