'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateTeamSchema, CreateTeamType } from '@/schemas/create-team.schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Card, CardContent, CardHeader } from '../ui/card'

import Image from 'next/image'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { createTeam } from '@/actions/team.actions'
import { FormError } from '../form-error'
import { useTranslations } from 'next-intl'

export const CreateTeamForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const router = useRouter()
  const t = useTranslations('page')
  const tErrors = useTranslations('apierrors')
  const form = useForm<CreateTeamType>({
    resolver: zodResolver(CreateTeamSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const onSubmit = async (values: CreateTeamType) => {
    setError('')
    startTransition(async () => {
      const response = await createTeam(values)
      if (
        response &&
        typeof response === 'object' &&
        'error' in response &&
        (response.error === 'team_already_exists' ||
          response.error === 'error_occurred_msg')
      ) {
        setError(tErrors(response.error))
      } else {
        router.push('/teams')
      }
    })
  }

  return (
    <div className="flex w-full flex-col lg:max-w-[1180px] lg:flex-row lg:gap-5">
      <Image
        src="/assets/images/team2.svg"
        className="order-1 h-[400px] w-full self-end lg:order-none lg:h-[360px] lg:max-w-[45%]"
        width={444.24}
        height={404}
        alt="team"
        priority
      />
      <Card className="flex basis-[60%] flex-col border-0 bg-transparent shadow-none lg:pt-10">
        <CardHeader className="relative mx-auto mb-2 w-fit lg:mb-10">
          <h1 className="font-roboto text-[32px] font-normal leading-[38.4px]">
            {t('team.create.title')}
          </h1>
          <span className="relative bottom-0 left-[50%] h-[2px] w-[120%] translate-x-[-50%] rounded bg-border"></span>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="text-xs">
                        {t('team.create.name_label')}
                      </FormLabel>
                      <FormControl className="">
                        <Input
                          {...field}
                          placeholder={t('team.create.name_placeholder')}
                          type="text"
                          className="form-input"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage
                        className="text-xs"
                        defaultValue={t('team.create.schema_msg_name_required')}
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
                        {t('team.create.desc_label')}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={t('team.create.desc_placeholder')}
                          className="form-input"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage
                        className="text-xs"
                        defaultValue={t('team.create.schema_msg_desc_required')}
                      />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-between">
                <Button
                  variant="tertiary-outline"
                  type="button"
                  onClick={() => {
                    form.reset()
                    router.push('/teams')
                  }}
                  className="basis-[45%] bg-transparent font-light"
                >
                  {t('cancel')}
                </Button>
                <Button
                  variant="tertiary"
                  type="submit"
                  className="basis-[45%] font-light"
                  disabled={isPending}
                >
                  {t('team.index.create')}
                </Button>
              </div>

              <FormError message={error} />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
