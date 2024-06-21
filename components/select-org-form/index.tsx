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
import { useOrganisation } from '@/cotntext/useOrganisation'
import { useRouter } from 'next/navigation'

interface SelectOrgFormProps {
  organisations?: Organisation[]
}

export const SelectOrgForm = ({ organisations }: SelectOrgFormProps) => {
  const t = useTranslations('page')
  const { currentOrg, setCurrentOrg } = useOrganisation()
  const router = useRouter()

  return (
    <Card className='max-sm:w-[310px] w-[400px] h-fit bg-transparent border-0 shadow-none text-[#3C4B57]'>
      <CardHeader className='flex flex-col gap-y-3 justify-center items-center w-full'>
        <h1 className='text-[32px] leading-[38.4px] font-medium font-roboto'>
          {t('select.title')}
        </h1>
        <p
          dangerouslySetInnerHTML={{ __html: t.raw('select.subtitle') }}
          className='text-[12px] leading-[14.4px] font-poppins'
        />
      </CardHeader>

      <CardContent>
        {organisations && (
          <div className='flex flex-col gap-y-2'>
            <label className='text-xs'>Select organisation</label>
            <Select
              onValueChange={val =>
                setCurrentOrg(
                  organisations?.find(org => org.organizationId === val) ??
                    null,
                )
              }
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select organisation' />
              </SelectTrigger>
              <SelectContent>
                {organisations.map(org => (
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
              disabled={!currentOrg}
              onClick={() => router.push('/dashboard')}
            >
              Continue
            </Button>
          </div>
        )}
        {/* <Form {...form}>
          <form className='space-y-6'>
            <div className='mb-6'>
              <label
                htmlFor='organisation'
                className='block text-sm font-medium text-gray-700'
              >
                Organisation
              </label>
              <select
                id='organisation'
                name='organisation'
                className='mt-1 relative w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              >
                <option>option 1</option>
                <option>option 2</option>
                <option>option 3</option>
                <option>option 4</option>
              </select>
            </div>

            <Button
              type='submit'
              className='w-full rounded-lg'
            >
              {t('continue')}
            </Button>
          </form>
        </Form> */}
      </CardContent>
    </Card>
  )
}
