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
import { IUser } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { getUserProfile, updateUserProfile } from '@/actions/user.actions'
import { EventType, sendEvent } from '@/actions/component-comunication.actions'
import { toast } from 'sonner'

const EditUserForm: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const form = useForm<EditUserFormData>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phone: '' },
  })

  useEffect(() => {
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
      .catch((error) => {
        setError(error.message)
        toast.error(error.message)
      })
  }, [form, setError, setUser])

  const onSubmit = async (data: EditUserFormData) => {
    setError(null)

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
      sendEvent(EventType.UPDATE_USER, { data: userData })
      toast.success('Profile successfully updated!')
    } catch (err) {
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center gap-6 font-poppins max-sm:min-w-[70vw] sm:w-[500px] md:min-w-[400px] lg:min-w-[500px]"
      >
        <h1 className="w-6/12 border-b-[2px] pb-1 text-center font-roboto text-[32px] leading-[42.2px] max-sm:w-fit max-sm:px-2 max-sm:text-[25px] max-sm:leading-[35px]">
          Edit User
        </h1>
        <div className="space-y-4 max-sm:mx-auto max-sm:w-full sm:w-10/12 md:w-11/12">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="space-y-1 *:rounded-xl">
                <FormLabel className="font-normal">First Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="First Name" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="space-y-1 *:rounded-xl">
                <FormLabel className="font-normal">Last Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Last Name" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1 *:rounded-xl">
                <FormLabel className="font-normal">Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="space-y-1 *:rounded-xl">
                  Phone Number
                </FormLabel>
                <FormControl className="font-normal">
                  <Input {...field} placeholder="Phone Number" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={loading}>
          Save
        </Button>
      </form>
    </Form>
  )
}

export default EditUserForm
