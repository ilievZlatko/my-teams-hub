'use client'

import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Building2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { CreateOrganizationSchema } from '@/schemas/create-organization.schema'
import { createOrg, getOrgs } from '@/actions/organization.actions'
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
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export const CreateOrganizationForm = ({ isPage = false }) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const t = useTranslations('page')
  const { data: session, update } = useSession()
  const form = useForm<z.infer<typeof CreateOrganizationSchema>>({
    resolver: zodResolver(CreateOrganizationSchema),
    defaultValues: { name: '', description: '' },
  })

  const onSubmit = async (values: z.infer<typeof CreateOrganizationSchema>) => {
    startTransition(() => createOrg(values).then())
    const organizations = await getOrgs()

    const updatedSession = {
      ...session,
      user: {
        ...session?.user,
        organizations,
      },
      token: {
        ...session?.token,
        organizations,
      },
    }
    await update(updatedSession)

    if (isPage) {
      router.push('/organizations')
    } else {
      form.reset()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="text-xs">
                  {t('create.name_label')}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('create.name_placeholder')}
                    type="text"
                    className="form-input placeholder:text-xs"
                  />
                </FormControl>
                <span className="absolute inset-y-[44px] end-0 flex items-center justify-center px-3">
                  <Building2 className="size-5 text-[#63929e]" />
                </span>
                <FormMessage
                  defaultValue={t('create.schema_msg_name_required')}
                  className="text-xs"
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="text-xs">
                  {t('create.desc_label')}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={t('create.desc_placeholder')}
                    className="form-input placeholder:text-xs"
                  />
                </FormControl>
                <FormMessage
                  defaultValue={t('create.schema_msg_desc_required')}
                  className="text-xs"
                />
              </FormItem>
            )}
          />
        </div>
        {isPage ? (
          <div className="flex justify-between">
            <Button
              variant="tertiary-outline"
              type="button"
              onClick={() => {
                form.reset()
                router.push('/organizations')
              }}
              className="basis-[45%] bg-transparent font-light"
            >
              Cancel
            </Button>
            <Button
              variant="tertiary"
              type="submit"
              className="basis-[45%] font-light"
              disabled={isPending}
            >
              Create
            </Button>
          </div>
        ) : (
          <Button type="submit" className="w-full">
            {t('save')}
          </Button>
        )}
      </form>
    </Form>
  )
}
