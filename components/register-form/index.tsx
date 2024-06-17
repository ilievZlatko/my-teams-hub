
"use client"
import routes from '@/api-routes'

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { HiOutlinePhone } from "react-icons/hi2";
import { GoPerson } from "react-icons/go";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { RegisterSchema } from "@/schemas/register.schema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "../ui/card";
import { BackButton } from '@/components/back-button'

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';

export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()
    const router = useRouter();
    const t = useTranslations('auth.register');

    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            rePassword: "",
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError('')
        setSuccess('')

        if (values.password !== values.rePassword) {
            setError('Password and re-password is not the same!')
            return;    
        }

        let fullName = values.name.split(' ');
        let firstName = fullName[0];
        let lastName = fullName[1];

        let data = {
            firstName: firstName,
            lastName: lastName,
            email: values.email,
            phoneNumber: values.phone,
            password: values.password
        }

        startTransition(async () => {
            try {
                const response = await fetch(
                    process.env.API_BASE_URL! + routes.register.post,
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                    cache: 'no-cache',
                  },
                )
                if (!response.ok) return null
      
                const user = await response.json()

                // console.log(user);
                
                return user
              } catch (error) {
                console.error('Error register in: ', error)
              }
              
        })

        router.push("/login");
    };



    return (
        <Card className="max-sm:w-[310px] w-[400px] h-fit bg-transparent border-0 shadow-none text-[#3C4B57]">
            <CardHeader className='flex flex-col gap-y-3 justify-center items-center w-full'>
                <h1 className='text-[32px] leading-[38.4px] font-medium font-roboto'>
                    {t('title')}
                </h1>
                <p
                    dangerouslySetInnerHTML={{ __html: t.raw('subtitle') }}
                    className='text-[12px] leading-[14.4px] font-poppins'
                />
            </CardHeader>
            <CardContent>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="text-xs">Name</FormLabel>
                                        <FormControl className="">
                                            <Input
                                                {...field}
                                                placeholder="John Doe"
                                                type="text"
                                                className='form-input'
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <span className='absolute end-0 inset-y-[44px] flex items-center justify-center px-3'>
                                            <GoPerson className='size-5 text-[#63929e]' />
                                        </span>
                                        <FormMessage />
                                    </FormItem>

                                )}>
                            </FormField>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="text-xs">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="john.doe@mail.com"
                                                type="email"
                                                className='form-input'
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <span className='absolute end-0 inset-y-[44px] flex items-center justify-center px-3'>
                                            <EnvelopeClosedIcon className='size-5 text-[#63929e]' />
                                        </span>
                                        <FormMessage />
                                    </FormItem>

                                )}>
                            </FormField>
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="text-xs">Phone number</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="+(123) 456 - 789"
                                                type="text"
                                                className='form-input'
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <span className='absolute end-0 inset-y-[44px] flex items-center justify-center px-3'>
                                            <HiOutlinePhone className='size-5 text-[#63929e]' />
                                        </span>
                                        <FormMessage />
                                    </FormItem>

                                )}>
                            </FormField>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="text-xs">Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="6 characters"
                                                type={showPassword ? 'text' : 'password'}
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
                                        <FormMessage />
                                    </FormItem>

                                )}>
                            </FormField>
                            <FormField
                                control={form.control}
                                name="rePassword"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="text-xs">Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="6 characters"
                                                type={showPassword ? 'text' : 'password'}
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
                                        <FormMessage />
                                    </FormItem>

                                )}>
                            </FormField>
                            <FormField
                                control={form.control}
                                name="check"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border-none py-2">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-xs">
                                                I accept the <Link className="font-bold" href='#'>Terms and conditions</Link>
                                            </FormLabel>
                                        </div>
                                        <FormMessage />
                                    </FormItem>

                                )}>
                            </FormField>
                        </div>
                        <Button type="submit" className="w-full">Sign Up</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className='flex flex-col gap-2 justify-center items-center'>

            <FormError message={error} />
            <FormSuccess message={success} />
            
                <BackButton
                    questionLabel="Already have an account?"
                    actionLabel='Sign in'
                    href='/login'
                />
            </CardFooter>
        </Card>

    )
}
