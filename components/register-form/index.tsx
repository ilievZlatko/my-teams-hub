'use client'

import { useState, useTransition } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { HiOutlinePhone } from 'react-icons/hi2'
import { GoPerson } from 'react-icons/go'
import { PhoneInput } from '@/components/phone-input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import { RegisterFormData, RegisterSchema } from '@/schemas/register.schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { BackButton } from '@/components/back-button'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { register } from '@/actions/auth.actions'
import { cn } from '@/lib/utils'

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('auth')

  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      rePassword: '',
    },
  })

  const onSubmit = (values: RegisterFormData) => {
    setError('')
    setSuccess('')

    if (values.password !== values.rePassword) {
      setError(t('register.schema_msg_password_mismatch'))
      return
    }

    startTransition(() => {
      register(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
        if (data?.success) {
          form.reset()
          router.push('/login')
        }
      })
    })
  }

  return (
    <Card className="h-fit w-[400px] border-0 bg-transparent text-[#3C4B57] shadow-none max-sm:m-auto max-sm:w-full">
      <CardHeader className="flex w-full flex-col items-center justify-center gap-y-3">
        <h1 className="font-roboto text-[32px] font-medium leading-[38.4px] max-md:max-w-[80%] max-md:font-medium max-sm:text-xl">
          {t('register.title')}
        </h1>
        <p
          dangerouslySetInnerHTML={{ __html: t.raw('register.subtitle') }}
          className="font-poppins text-[12px] leading-[14.4px] max-sm:text-xs"
        />
      </CardHeader>
      <CardContent className="max-sm:m-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-xs">
                      {t('register.fname_label')}
                    </FormLabel>
                    <FormControl className="">
                      <Input
                        {...field}
                        placeholder={t('register.fname_placeholder')}
                        type="text"
                        className="form-input placeholder:text-xs"
                        disabled={isPending}
                      />
                    </FormControl>
                    <span className="absolute inset-y-[44px] end-0 flex items-center justify-center px-3">
                      <GoPerson className="size-5 text-[#63929e]" />
                    </span>
                    <FormMessage
                      className="text-xs"
                      defaultValue={t('register.schema_msg_fname_require')}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-xs">
                      {t('register.lname_label')}
                    </FormLabel>
                    <FormControl className="">
                      <Input
                        {...field}
                        placeholder={t('register.lname_placeholder')}
                        type="text"
                        className="form-input placeholder:text-xs"
                        disabled={isPending}
                      />
                    </FormControl>
                    <span className="absolute inset-y-[44px] end-0 flex items-center justify-center px-3">
                      <GoPerson className="size-5 text-[#63929e]" />
                    </span>
                    <FormMessage
                      className="text-xs"
                      defaultValue={t('register.schema_msg_lname_require')}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-xs">
                      {t('register.email_label')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="john.doe@mail.com"
                        type="email"
                        className="form-input placeholder:text-xs"
                        disabled={isPending}
                      />
                    </FormControl>
                    <span className="absolute inset-y-[44px] end-0 flex items-center justify-center px-3">
                      <EnvelopeClosedIcon className="size-5 text-[#63929e]" />
                    </span>
                    <FormMessage
                      className="text-xs"
                      defaultValue={t('register.schema_msg_email_require')}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-xs">
                      {t('register.phone_label')}
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        {...field}
                        placeholder="+(123) 456 - 789"
                        className="form-input placeholder:text-xs"
                        disabled={isPending}
                        defaultCountry="BG"
                      />
                    </FormControl>
                    <span className="absolute inset-y-[44px] end-0 flex items-center justify-center px-3">
                      <HiOutlinePhone className="size-5 text-[#63929e]" />
                    </span>
                    <FormMessage
                      className="text-xs"
                      defaultValue={t('register.schema_msg_phone_require')}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-xs">
                      {t('register.password_label')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t('register.password_placeholder')}
                        type={showPassword ? 'text' : 'password'}
                        className="form-input placeholder:text-xs"
                        disabled={isPending}
                      />
                    </FormControl>
                    <span
                      className={cn(
                        'absolute end-0 flex items-center justify-center px-3',
                        form.control.getFieldState('password').error
                          ? 'top-[33.5px]'
                          : 'inset-y-[44px]',
                      )}
                    >
                      {showPassword ? (
                        <EyeIcon
                          className="size-5 cursor-pointer select-none text-[#63929e]"
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <EyeOffIcon
                          className="size-5 cursor-pointer select-none text-[#63929e]"
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </span>
                    <FormMessage
                      className="text-xs"
                      defaultValue={t('register.schema_msg_password_require_6')}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-xs">
                      {t('register.repassword_label')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t('register.password_placeholder')}
                        type={showPassword ? 'text' : 'password'}
                        className="form-input placeholder:text-xs"
                        disabled={isPending}
                      />
                    </FormControl>
                    <span className="absolute inset-y-[44px] end-0 flex items-center justify-center px-3">
                      {showPassword ? (
                        <EyeIcon
                          className="size-5 cursor-pointer select-none text-[#63929e]"
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <EyeOffIcon
                          className="size-5 cursor-pointer select-none text-[#63929e]"
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </span>
                    <FormMessage
                      className="text-xs"
                      defaultValue={t('register.schema_msg_password_mismatch')}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="check"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border-none py-2">
                    <FormControl>
                      <Checkbox
                        className="rounded-xs"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-xs">
                        {t('register.accept_terms_label_1')}{' '}
                        <Link className="font-bold" href="#">
                          {t('register.accept_terms_label_2')}
                        </Link>
                      </FormLabel>
                    </div>
                    <FormMessage
                      className="text-xs"
                      defaultValue={t('register.schema_msg_agree_terms')}
                    />
                  </FormItem>
                )}
              />
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button type="submit" className="w-full">
              {t('signup')}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center">
        <BackButton
          questionLabel={t('register.already_member_question')}
          actionLabel={t('signin')}
          href={`/${locale}/login`}
        />
      </CardFooter>
    </Card>
  )
}
