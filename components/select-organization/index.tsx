'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '../ui/button'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { CreateOrganizationForm } from '../create-organisation'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export const SelectOrganization = () => {
  const locale = useLocale()
  const t = useTranslations('page')
  const [showCreateOrg, setShowCreateOrg] = useState(false)
  const router = useRouter()
  const { data: session, update } = useSession()

  const organizations = session?.user?.organizations
  const activeOrg = session?.user?.activeOrg

  useEffect(() => {
    if (organizations && organizations?.length > 0) {
      setShowCreateOrg(true)
    }
  }, [session])

  const handleUpdateSession = async (orgId: string) => {
    const updatedSession = {
      ...session,
      user: {
        ...session?.user,
        activeOrg: orgId,
      },
      token: {
        ...session?.token,
        activeOrg: orgId,
      },
    }
    await update(updatedSession)
  }

  return (
    <Card className="h-fit w-[400px] border-0 bg-transparent text-[#3C4B57] shadow-none max-sm:w-full">
      <CardHeader className="flex w-full flex-col items-center justify-center gap-y-3">
        <h1 className="px-0 text-center font-roboto text-[32px] font-medium leading-[38.4px] max-md:max-w-[80%] max-md:text-2xl max-sm:max-w-full max-sm:text-xl">
          {organizations && organizations?.length > 0
            ? t('select.title')
            : t('create.title')}
        </h1>
        <p
          dangerouslySetInnerHTML={
            organizations && organizations?.length > 0
              ? { __html: t.raw('select.subtitle') }
              : { __html: t.raw('create.subtitle') }
          }
          className="px-4 text-center font-poppins text-[12px] leading-[14.4px] max-md:text-xs"
        />
      </CardHeader>

      <CardContent>
        {showCreateOrg ? (
          <div className="flex flex-col gap-y-2">
            <Select onValueChange={handleUpdateSession}>
              <SelectTrigger className="w-full bg-transparent">
                <SelectValue
                  placeholder={t('select.organization_placeholder')}
                />
              </SelectTrigger>
              <SelectContent>
                {organizations?.map((org) => (
                  <SelectItem
                    key={org.organizationId}
                    value={org.organizationId}
                  >
                    {org.organizationName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              type="button"
              className="mt-4 w-full rounded-lg"
              disabled={!activeOrg}
              onClick={() => router.push(`/${locale}`)}
            >
              {t('continue')}
            </Button>
          </div>
        ) : (
          <CreateOrganizationForm />
        )}
        <div className="flex items-center justify-center">
          {showCreateOrg ? (
            <div className="mt-4 flex items-center gap-1 max-sm:flex-wrap max-sm:justify-center">
              <span
                dangerouslySetInnerHTML={{
                  __html: t.raw('select.no_organization_question'),
                }}
                className="text-xs"
              />
              <Button
                type="button"
                variant="link"
                className="h-fit p-0 text-xs text-[#63929E]"
                onClick={() => setShowCreateOrg(false)}
              >
                {t('select.create_organization_btn')}
              </Button>
            </div>
          ) : (
            <div className="mt-1 flex items-center gap-1">
              <span className="text-xs">
                {t('select.already_have_organization_question')}
              </span>
              <Button
                type="button"
                variant="link"
                className="p-0 text-xs text-[#63929E]"
                disabled={!organizations || organizations?.length === 0}
                onClick={() => setShowCreateOrg(true)}
              >
                {t('select.select_organization_btn')}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
