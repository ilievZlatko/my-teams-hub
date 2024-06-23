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
import { useTranslations } from 'next-intl'
import { Organisation } from '@/types/organisation.types'
import { useOrganisations } from '@/cotntext/useOrganisations'
import { useRouter } from 'next/navigation'
import { CreateOrganizationForm } from '../create-organisation'
import { useEffect, useState } from 'react'

interface SelectOrgFormProps {
  organisations?: Organisation[]
}

export const SelectOrganization = ({ organisations }: SelectOrgFormProps) => {
  const t = useTranslations('page')
  const { activeOrg, setActiveOrg, setOrganizations } = useOrganisations()
  const [showCreateOrg, setShowCreateOrg] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (organisations && organisations?.length > 0) {
      setShowCreateOrg(true)
    }
  }, [])

  useEffect(() => {
    if (organisations && organisations?.length > 0) {
      setOrganizations(organisations)
    }
  }, [organisations, setOrganizations])

  return (
    <Card className='max-sm:w-[310px] w-[400px] h-fit bg-transparent border-0 shadow-none text-[#3C4B57]'>
      <CardHeader className='flex flex-col gap-y-3 justify-center items-center w-full'>
        <h1 className='text-[32px] leading-[38.4px] font-medium font-roboto'>
          {organisations && organisations?.length > 0
            ? t('select.title')
            : t('create.title')}
        </h1>
        <p
          dangerouslySetInnerHTML={{ __html: t.raw('create.subtitle') }}
          className='text-[12px] leading-[14.4px] font-poppins'
        />
      </CardHeader>

      <CardContent>
        {showCreateOrg ? (
          <div className='flex flex-col gap-y-2'>
            <label className='text-xs'>Select organisation</label>
            <Select
              onValueChange={val =>
                setActiveOrg(
                  organisations?.find(org => org.organizationId === val) ??
                    null,
                )
              }
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select organisation' />
              </SelectTrigger>
              <SelectContent>
                {organisations?.map(org => (
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
              onClick={() => router.push('/dashboard')}
            >
              Continue
            </Button>
          </div>
        ) : (
          <CreateOrganizationForm />
        )}
        <div className='flex items-center justify-center gap-2'>
          {showCreateOrg ? (
            <>
              <span className='text-xs'>Don&apos;t have organisation?</span>
              <Button
                type='button'
                variant='link'
                className='text-[#63929E] text-xs p-0'
                onClick={() => setShowCreateOrg(false)}
              >
                Create organisation
              </Button>
            </>
          ) : (
            <>
              <span className='text-xs'>Already have an organization?</span>
              <Button
                type='button'
                variant='link'
                className='text-[#63929E] p-0 text-xs'
                disabled={!organisations || organisations?.length === 0}
                onClick={() => setShowCreateOrg(true)}
              >
                Select organisation
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
