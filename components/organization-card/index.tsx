'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Phone, User } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export type OrganizationCardProps = {
  organization: Organisation
}

export const OrganizationCard = ({ organization }: OrganizationCardProps) => {
  const t = useTranslations('page.organization.index')

  return (
    <div className="my-1 w-full px-1 max-md:w-[226px] max-sm:mx-auto max-sm:w-[266px] md:w-[220px] lg:my-2 lg:w-[226px] lg:px-2">
      <Card className="space-y-14 overflow-hidden border-0 shadow-md *:space-y-4 *:rounded-xl *:text-center *:font-poppins">
        <CardHeader className="relative h-[90px] items-center bg-mth-blue-100">
          <span className="absolute top-[38px] h-[97px] w-[97px] rounded-full border-[3px] border-white bg-mth-blue-100 pl-[1px] pt-[7px] text-[49px] font-bold text-mth-grey-blue-500">
            {organization.organizationName.substring(0, 1).toUpperCase()}
          </span>
        </CardHeader>
        <CardContent>
          <CardTitle className="line-clamp-2 min-h-[64px] text-[20px] font-normal leading-[30px]">
            {organization.organizationName}
          </CardTitle>

          <p className="!mt-0.5 mb-2 truncate text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
            consequuntur!
          </p>
          <CardDescription className="space-y-3 text-mth-dark-900">
            <span className="flex items-center justify-start gap-2 text-xs">
              <User size={16} className="text-mth-blue-500" />
              Ivan Ivanov
            </span>
            <span className="flex items-center justify-start gap-2 text-xs">
              <Phone size={16} className="text-mth-blue-500" />
              359 88 888 88
            </span>
          </CardDescription>
          <CardFooter className="px-0 py-1">
            <Link
              href={`/organizations/${organization.organizationId}`}
              prefetch
              className="mx-auto w-full max-w-[171px] rounded-xl bg-mth-blue-500 px-3 py-2.5 text-sm text-mth-white-50 transition hover:bg-mth-blue-500/70"
            >
              {t('see_teams')}
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  )
}
