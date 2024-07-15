'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import * as z from 'zod'
import { Trash2Icon, UserCircle2 } from 'lucide-react'
import { toast } from 'sonner'

import { EditTeamSchema, EditTeamType } from '@/schemas/edit-team.schema'
import { cn } from '@/lib/utils'
import { Team, TeamMember } from '@/types/team'
import { IUser } from '@/types/user'
import { editTeam, deleteTeam } from '@/actions/edit-team.actions'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/ui/form'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Loader } from '@/components/loader'

// TODO: handle 'team ownership' - not implemented on the server yet.
export const EditTeamForm = ({
  organizationId,
  team,
  users,
}: {
  organizationId: string
  team: Team
  users: IUser[]
}) => {
  const router = useRouter()
  const t = useTranslations('page.team.edit')

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [notMemberUsers, setNotMemberUsers] = useState<IUser[]>(users)

  const [userToInviteEmail, setUserToInviteEmail] = useState<
    string | undefined
  >(undefined)

  const [error, setError] = useState<string | undefined>('')
  const [isPending, setIsPending] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [memberToRemoveId, setMemberToRemoveId] = useState<string | undefined>(
    undefined,
  )
  const [teamToDeleteId, setTeamToDeleteId] = useState<string | undefined>(
    undefined,
  )

  useEffect(() => {
    setTeamMembers(team.teamMembers)
    setIsPending(false)
  }, [])

  useEffect(() => {
    const notMembers: IUser[] = []

    if (teamMembers.length > 0) {
      users.forEach((user) => {
        teamMembers.forEach((member) => {
          if (member.memberId !== user.userId) notMembers.push(user)
        })
      })

      setNotMemberUsers(notMembers)
    } else {
      setNotMemberUsers(users)
    }
  }, [teamMembers])

  const form = useForm<z.infer<typeof EditTeamSchema>>({
    resolver: zodResolver(EditTeamSchema),
    defaultValues: { ...team, otherUsers: notMemberUsers },
  })

  useEffect(() => {
    const email = form.getValues('otherUsers')?.[0]?.email
    setUserToInviteEmail(email)
  }, [form.watch('otherUsers')])

  // TODO: implement 'invite logic'
  const handleInviteUser = () => {
    if (!userToInviteEmail) return
    toast.info(t('work_in_progress'))
    form.resetField('otherUsers', { keepDirty: false })

    setUserToInviteEmail(undefined)
  }

  const onSubmit = async (values: EditTeamType) => {
    setError('')
    setIsSubmitting(true)

    if (!team || !team.teamId) {
      router.back()
      return
    }

    try {
      const responseBody = await editTeam(organizationId, team.teamId, {
        name: values.name,
        description: values.description,
        teamMembers:
          teamMembers.length !== team.teamMembers.length ? teamMembers : [],
      })

      setIsSubmitting(false)

      if (responseBody === null) {
        form.reset()
        router.push(`/teams`)
        toast.success(t('success_message'))
      }

      if (responseBody && responseBody.error) {
        setError(responseBody.error)
      }
    } catch (_: unknown) {
      setError(t('error_message'))
      setIsSubmitting(false)
    }
  }

  function removeTeamMember(id: string | undefined) {
    if (!id) return

    const filteredMembers = teamMembers.filter(
      (member) => member.memberId !== id,
    )
    setTeamMembers(filteredMembers)
    setMemberToRemoveId(undefined)
  }

  async function onDeleteTeam(id: string | undefined) {
    if (!id) return
    setIsSubmitting(true)

    try {
      const response = await deleteTeam(organizationId, id)

      if (response === null) {
        setIsSubmitting(false)

        router.push('/teams')
        toast.info(t('team_deleted_msg'))
      }
    } catch (_: unknown) {
      setError(t('error_message'))
      setIsSubmitting(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Card className="mx-auto w-full border-0 px-0 text-mth-grey-blue-700 shadow-none xl:max-w-[980px]">
        <CardContent className="flex flex-col-reverse items-center justify-center gap-6 max-sm:mx-auto max-sm:px-0 lg:flex-row">
          <Image
            src="/assets/images/team2.svg"
            alt="team image"
            className="w-full max-sm:w-[300px] sm:max-w-[350px] md:max-w-[380px] lg:max-w-[360px] xl:max-w-[445px]"
            width={445}
            height={404}
            priority
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col items-center gap-6 font-poppins max-sm:min-w-[70vw] sm:w-[500px] md:min-w-[400px] lg:min-w-[500px]"
            >
              <h1 className="w-6/12 border-b-[2px] pb-1 text-center font-roboto text-[32px] leading-[42.2px] max-sm:w-fit max-sm:px-2 max-sm:text-[25px] max-sm:leading-[35px]">
                {t('title')}
              </h1>
              <div className="space-y-4 max-sm:mx-auto max-sm:w-full sm:w-10/12 md:w-11/12">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-1 *:rounded-xl">
                      <FormLabel className="font-normal">
                        {t('team_name_label')}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage
                        className="text-xs"
                        defaultValue={t('schema_msg_name_require')}
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-1 *:rounded-xl">
                      <FormLabel className="font-normal">
                        {t('team_description_label')}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="resize-none overflow-y-auto"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <div className="flex items-end gap-4 max-md:space-y-2">
                  <FormField
                    control={form.control}
                    name="otherUsers"
                    render={({ field }) => (
                      <FormItem className="w-full max-w-[420px] space-y-1 *:rounded-xl max-md:max-w-full">
                        <FormLabel className="text-xs font-normal">
                          {t('invite_team_member_label')}
                        </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={t('member_to_invite_placeholder')}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-[50vh]">
                            {notMemberUsers?.length > 0 ? (
                              notMemberUsers.map((user: IUser, i) => (
                                <SelectItem key={i} value={user.email}>
                                  {user.firstName + ' ' + user.lastName}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="0" disabled>
                                {t('no_users_to_select')}
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="tertiary-outline"
                    className="w-full max-w-20 rounded-xl font-normal"
                    disabled={isPending || isSubmitting}
                    onClick={handleInviteUser}
                  >
                    {t('invite_btn')}
                  </Button>
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="teamMembers"
                    render={() => (
                      <FormItem className="mt-6 rounded-xl border-[4px] border-mth-silver-100 p-3">
                        <FormLabel className="flex justify-between px-4 !text-sm font-normal max-sm:px-2">
                          <p>{t('team_members_label')}</p>
                          {t('team_members_remove_label')}
                        </FormLabel>
                        <ScrollArea
                          className={cn(
                            'pt-3',
                            !isPending && teamMembers.length === 0
                              ? 'h-[100px]'
                              : 'h-[230px]',
                          )}
                        >
                          <div className="w-full space-y-3 px-4 text-sm max-sm:px-1">
                            {isPending ? (
                              <Loader className="mt-10" />
                            ) : teamMembers && teamMembers.length > 0 ? (
                              teamMembers.map((member, i) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-between"
                                >
                                  <div className="flex cursor-default items-center gap-4">
                                    <UserCircle2
                                      size={44}
                                      strokeWidth={1}
                                      className="text-mth-blue-500"
                                    />
                                    <div>
                                      <p className="leading-[21px]">
                                        {member.firstName +
                                          ' ' +
                                          member.lastName}
                                      </p>
                                      <p className="text-[12px] leading-[18px] text-mth-grey-blue-400">
                                        {member.email}
                                      </p>
                                    </div>
                                  </div>
                                  <Trash2Icon
                                    role="button"
                                    size={22}
                                    className="cursor-pointer text-destructive sm:me-2"
                                    onClick={() => {
                                      setMemberToRemoveId(member.memberId)
                                    }}
                                  />
                                </div>
                              ))
                            ) : (
                              <p>{t('no_team_members')}</p>
                            )}
                          </div>
                        </ScrollArea>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2 *:rounded-xl max-sm:w-full sm:w-10/12 md:w-11/12">
                <FormError message={error} />

                <div className="flex justify-between *:rounded-xl max-sm:gap-6 sm:gap-8 lg:gap-10">
                  <Button
                    type="button"
                    disabled={isPending || isSubmitting}
                    variant={'tertiary-outline'}
                    className="sm:max-w-4/12 flex w-full font-normal"
                    onClick={() => {
                      setTeamToDeleteId(team.teamId)
                    }}
                  >
                    <Loader
                      className={cn(
                        'm-2',
                        isPending || isSubmitting ? 'block' : 'hidden',
                      )}
                      size={20}
                    />
                    {t('delete_team_btn')}
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending || isSubmitting}
                    variant={'tertiary'}
                    className="sm:max-w-4/12 flex w-full font-normal"
                  >
                    <Loader
                      className={cn(
                        'm-2',
                        isPending || isSubmitting ? 'block' : 'hidden',
                      )}
                      size={20}
                    />
                    {t('save_btn')}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <ConfirmDialog
        isOpen={!!memberToRemoveId}
        onClose={() => setMemberToRemoveId(undefined)}
        title={t('confirm_team_member_remove_title', { teamName: team.name })}
        handleClick={() => removeTeamMember(memberToRemoveId)}
      />
      <ConfirmDialog
        isOpen={!!teamToDeleteId}
        onClose={() => setTeamToDeleteId(undefined)}
        title={t('confirm_team_delete_title')}
        handleClick={() => onDeleteTeam(team.teamId)}
      />
    </>
  )
}
