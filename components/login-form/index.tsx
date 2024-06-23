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
import { useRouter } from 'next/router'

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('auth')
  const locale = useLocale()
  const [showPassword, setShowPassword] = useState(false)
  // const router = useRouter()
  
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const onSubmit = (values: LoginFormData) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      login(values).then(data => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })


  }

  return (
    <Card className='max-sm:w-[310px] w-[400px] h-fit bg-transparent border-0 shadow-none text-[#3C4B57]'>
      <CardHeader className='flex flex-col gap-y-3 justify-center items-center w-full'>
        <h1 className='text-[32px] leading-[38.4px] font-medium font-roboto'>
          {t('login.title')}
        </h1>
        <p
          dangerouslySetInnerHTML={{ __html: t.raw('login.subtitle') }}
          className='text-[12px] leading-[14.4px] font-poppins'
        />
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='email'
                        placeholder='john.doe@example.com'
                        className='form-input'
                        disabled={isPending}
                      />
                    </FormControl>
                    <span className='absolute end-0 inset-y-[44px] flex items-center justify-center px-3'>
                      <EnvelopeClosedIcon className='size-5 text-[#63929e]' />
                    </span>
                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder='6 characters'
                        className='form-input'
                        disabled={isPending}
                      />
                    </FormControl>
                    <span className='absolute end-0 inset-y-[44px] flex items-center justify-center px-3'>
                      {showPassword ? (
                        <EyeIcon
                          className='size-5 text-[#63929e] cursor-pointer select-none'
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <EyeOffIcon
                          className='size-5 text-[#63929e] cursor-pointer select-none'
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </span>
                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />

              <div className='flex justify-between items-center'>
                <FormField
                  control={form.control}
                  name='rememberMe'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 border-0 p-4 pl-0'>
                      <FormControl>
                        <Checkbox
                          className='rounded-xs'
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className='text-xs font-normal'>
                        Remember me
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <Link
                  href='#'
                  className='text-xs font-normal'
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button
              type='submit'
              disabled={isPending}
              className='w-full rounded-lg'
            >
              {t('signin')}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className='flex flex-col gap-2 justify-center items-center'>
        <Social label={t('signingoogle')} />
        <BackButton
          questionLabel="Don't have an account?"
          actionLabel='Register'
          href={`/${locale}/register`}
        />
      </CardFooter>
    </Card>
  )
}