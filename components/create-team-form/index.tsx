'use client'

import { useTransition } from 'react'
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

export const CreateTeamForm = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<CreateTeamType>({
    resolver: zodResolver(CreateTeamSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const onSubmit = async (values: CreateTeamType) => {
    startTransition(() => createTeam(values).then())
    router.push('/teams')
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
            Add New Team
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
                      <FormLabel className="text-xs">Team Name</FormLabel>
                      <FormControl className="">
                        <Input
                          {...field}
                          placeholder="Marketing Team"
                          type="text"
                          className="form-input"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="text-xs">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Write a short description of your team"
                          className="form-input"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
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
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
