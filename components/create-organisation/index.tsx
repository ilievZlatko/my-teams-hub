'use client'

import { Controller, Form, useForm, useFormContext } from "react-hook-form"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Button } from "../ui/button"
import { useTranslations } from 'next-intl'
import { zodResolver } from "@hookform/resolvers/zod"

import { z } from "zod"
import { CreateSchema } from "@/schemas/create.schema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useTransition } from "react"



export const CreateForm = () => {

    const t = useTranslations('page')
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof CreateSchema>>({
        resolver: zodResolver(CreateSchema),
        defaultValues: { name: '', description: '', logo: '' },
    })


    const onSubmit = (values: z.infer<typeof CreateSchema>) => {
        startTransition(() => {

        })
        return ""

    }




    return (
        <Card className='max-sm:w-[310px] w-[400px] h-fit bg-transparent border-0 shadow-none text-[#3C4B57]'>
            <CardHeader className='flex flex-col gap-y-3 justify-center items-center w-full'>
                <h1 className='text-[32px] leading-[38.4px] font-medium font-roboto'>
                    {t('create.title')}

                </h1>
                <p
                    dangerouslySetInnerHTML={{ __html: t.raw('create.subtitle') }}
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
                                name='name'
                                render={({ field }) => (
                                    <FormItem className='relative'>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='text'
                                                placeholder='John Doe'
                                                className='form-input'
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs' />
                                    </FormItem>
                                )}
                            />
                        </div>



                        {/* <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <Controller
                                name="description"
                                control={form.control}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        id="description"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                )}
                            />
                            {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>}
                        </div> */}

                        {/* <div>
                            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Logo</label>
                            <Controller
                                name="logo"
                                control={form.control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="file"
                                        id="logo"
                                        accept="image/*"
                                        className="mt-1 block w-full text-gray-900 border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                )}
                            />
                        </div> */}

                        <Button
                            type='submit'
                            className='w-full rounded-lg'
                        >
                            {t('continue')}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

