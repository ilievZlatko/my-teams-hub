'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EditUserFormData, EditUserSchema } from '@/schemas/edit-user.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { getUserProfile, updateUserProfile } from '@/actions/user.actions'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader } from '../loader'

const EditUserForm: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const t = useTranslations('page.user.edit')
  const router = useRouter()
  const { data: session, update } = useSession()

  const form = useForm<EditUserFormData>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phone: '' },
  })

  useEffect(() => {
    setLoading(true)
    getUserProfile()
      .then((response) => {
        if ('error' in response) {
          setError(response.error)
          toast.error(response.error)
        } else {
          setUser(response)
          form.reset({
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            phone: response.phoneNumber ?? '',
          })
        }
      })
      .catch((err) => {
        setError(error)
        toast.error(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [form])

  const onSubmit = async (data: EditUserFormData) => {
    setError('')

    if (!user) {
      return
    }
    const userData = {
      ...data,
      userId: user.userId,
      status: user.status,
      title: '',
    }
    setLoading(true)
    try {
      await updateUserProfile(userData)
      await handleUpdateSession(userData)
      toast.success('Profile successfully updated!')
      location.reload()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message)
      console.error(err)
    }
  }

  const handleUpdateSession = async (user: IUser) => {
    if (!session) return

    const newSession = {
      ...session,
      user: {
        ...session?.user,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token: {
        ...session?.token,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    }

    try {
      await update(newSession)
      // location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-6 font-poppins max-sm:min-w-[70vw] sm:w-[500px] md:min-w-[400px] lg:min-w-[500px]"
          >
            <h1 className="w-auto border-b-[2px] pb-1 text-center font-roboto text-[32px] leading-[42.2px] max-sm:w-fit max-sm:px-2 max-sm:text-[25px] max-sm:leading-[35px]">
              {t('title')}
            </h1>
            <div className="space-y-4 max-sm:mx-auto max-sm:w-full sm:w-10/12 md:w-11/12">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="space-y-1 *:rounded-xl">
                    <FormLabel className="font-normal">
                      {t('user_first_name_label')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t('user_first_name_label')}
                      />
                    </FormControl>
                    <FormMessage
                      className="text-xs"
                      defaultValue={t('schema_msg_first_name_require')}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="space-y-1 *:rounded-xl">
                    <FormLabel className="font-normal">
                      {t('user_last_name_label')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t('user_last_name_label')}
                      />
                    </FormControl>
                    <FormMessage
                      className="text-xs"
                      defaultValue={t('schema_msg_last_name_require')}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1 *:rounded-xl">
                    <FormLabel className="font-normal">
                      {t('user_email_label')}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={t('user_email_label')} />
                    </FormControl>
                    <FormMessage
                      className="text-xs"
                      defaultValue={t('schema_msg_email_require')}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="space-y-1 *:rounded-xl">
                      {t('user_phone_number_label')}
                    </FormLabel>
                    <FormControl className="font-normal">
                      <Input
                        {...field}
                        placeholder={t('user_phone_number_label')}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4 flex w-full justify-between sm:w-10/12 md:w-11/12">
              <Button
                type="button"
                className="w-40 border-2 bg-transparent text-mth-blue-500"
                disabled={loading}
                onClick={() => {
                  form.reset()
                  router.push('/')
                }}
              >
                {t('cancel_btn')}
              </Button>
              <Button
                type="submit"
                className="w-40 bg-mth-blue-500"
                disabled={loading}
              >
                {t('save_btn')}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  )
}

export default EditUserForm
