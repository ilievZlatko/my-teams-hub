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
    <Card className='max-sm:w-full w-[400px] h-fit bg-transparent border-0 shadow-none text-[#3C4B57]'>
      <CardHeader className='flex flex-col gap-y-3 justify-center items-center w-full'>
        <h1 className='text-[32px] leading-[38.4px] px-0 text-center font-medium font-roboto max-md:max-w-[80%] max-sm:max-w-full max-md:text-2xl max-sm:text-xl'>
          {organizations && organizations?.length > 0
            ? t('select.title') : t('create.title')}
        </h1>
        <p dangerouslySetInnerHTML={
          organizations && organizations?.length > 0
            ? { __html: t.raw('select.subtitle') }
            : { __html: t.raw('create.subtitle') }}
          className='text-[12px] leading-[14.4px] font-poppins text-center px-4 max-md:text-xs'
        />
      </CardHeader>

      <CardContent>
        {showCreateOrg ? (
          <div className='flex flex-col gap-y-2'>
            <Select onValueChange={handleUpdateSession}>
              <SelectTrigger className='w-full bg-transparent'>
                <SelectValue placeholder={t('select.organization_placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {organizations?.map(org => (
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
              type='button'
              className='w-full rounded-lg mt-4'
              disabled={!activeOrg}
              onClick={() => router.push(`/${locale}`)}
            >
              {t('continue')}
            </Button>
          </div>
        ) : (
          <CreateOrganizationForm />
        )}
        <div className='flex items-center justify-center'>
          {showCreateOrg ? (
            <div className='mt-4 flex gap-1 items-center max-sm:flex-wrap max-sm:justify-center'>
              <span
                dangerouslySetInnerHTML={{ __html: t.raw('select.no_organization_question') }}
                className='text-xs'
              />
              <Button
                type='button'
                variant='link'
                className='text-[#63929E] h-fit text-xs p-0'
                onClick={() => setShowCreateOrg(false)}
              >
                {t('select.create_organization_btn')}
              </Button>
            </div>
          ) : (
            <div className='mt-1 flex gap-1 items-center'>
              <span className='text-xs'>{t('select.already_have_organization_question')}</span>
              <Button
                type='button'
                variant='link'
                className='text-[#63929E] p-0 text-xs'
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
