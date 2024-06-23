'use client'

import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'
import { CreateOrganizationSchema } from '@/schemas/create-organization.schema'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Building2 } from 'lucide-react'
import { createOrg } from '@/actions/organization.actions'

export const CreateOrganizationForm = () => {
  const t = useTranslations('page')

  const form = useForm<z.infer<typeof CreateOrganizationSchema>>({
    resolver: zodResolver(CreateOrganizationSchema),
    defaultValues: { name: '', description: '' },
  })

  const onSubmit = async (values: z.infer<typeof CreateOrganizationSchema>) => {
    await createOrg(values).then(() => {
      form.reset()
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormLabel className='text-xs'>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Acme Inc.'
                    type='text'
                    className='form-input'
                  />
                </FormControl>
                <span className='absolute end-0 inset-y-[44px] flex items-center justify-center px-3'>
                  <Building2 className='size-5 text-[#63929e]' />
                </span>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormLabel className='text-xs'>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder='Acme Inc description'
                    className='form-input'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type='submit'
          className='w-full'
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
