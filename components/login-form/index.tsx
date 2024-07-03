'use client'

import Link from 'next/link'
import { useTransition, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormData, LoginSchema } from '@/schemas/login.schema'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/ui/form'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

import { Social } from '@/components/social'
import { BackButton } from '@/components/back-button'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { login } from '@/actions/login'

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('auth')
  const locale = useLocale()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const onSubmit = (values: LoginFormData) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <Card className="h-fit w-[400px] border-0 bg-transparent text-[#3C4B57] shadow-none max-sm:m-auto max-sm:w-full">
      <CardHeader className="flex w-full flex-col items-center justify-center gap-y-3">
        <h1 className="font-roboto text-[32px] font-medium leading-[38.4px] max-md:max-w-[90%] max-md:font-medium max-sm:text-xl">
          {t('login.title')}
        </h1>
        <p
          dangerouslySetInnerHTML={{ __html: t.raw('login.subtitle') }}
          className="font-poppins text-[12px] leading-[14.4px] max-sm:text-xs"
        />
      </CardHeader>

      <CardContent className="max-sm:m-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>{t('login.email_label')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="john.doe@example.com"
                        className="form-input placeholder:text-xs"
                        disabled={isPending}
                      />
                    </FormControl>
                    <span className="absolute inset-y-[44px] end-0 flex items-center justify-center px-3">
                      <EnvelopeClosedIcon className="size-5 text-[#63929e]" />
                    </span>
                    <FormMessage
                      className="text-xs"
                      defaultValue={t('login.schema_msg_email_require')}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>{t('login.password_label')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('login.password_placeholder')}
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
                      defaultValue={t('login.schema_msg_password_require')}
                    />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 border-0 p-4 pl-0">
                      <FormControl>
                        <Checkbox
                          className="rounded-xs"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-xs font-normal">
                        {t('login.remember_me_label')}
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <Link href="#" className="text-xs font-normal">
                  {t('login.forgot_password_link')}
                </Link>
              </div>
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg"
            >
              {t('signin')}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col items-center justify-center gap-2">
        <Social label={t('signingoogle')} />
        <BackButton
          questionLabel={t('login.not_member_question')}
          actionLabel={t('signup')}
          href={`/${locale}/register`}
        />
      </CardFooter>
    </Card>
  )
}
