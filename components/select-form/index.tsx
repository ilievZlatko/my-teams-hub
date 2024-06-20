'use client'

import { Form, useForm } from "react-hook-form"
import { Card, CardContent, CardHeader } from "../ui/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from '../ui/input'
import { EnvelopeClosedIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"
import { SelectSchema } from "@/schemas/select.schema"
import { z } from "zod"
import { FormError } from "../form-error"
import { error } from "console"
import { FormSuccess } from "../form-success"
import { useRouter } from "next/router"


export const SelectForm = () => {

    const t = useTranslations('page')

    const form = useForm<z.infer<typeof SelectSchema>>({
        resolver: zodResolver(SelectSchema),
        defaultValues: { organisation: '' },
    })

    const onSubmit = (values: z.infer<typeof SelectSchema>) => {

        return "";
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
                        className='space-y-6'
                    >
                        <div className="mb-6">
                            <label htmlFor="organisation" className="block text-sm font-medium text-gray-700">Organisation</label>
                            <select id="organisation" name="organisation" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option>option 1</option>
                                <option>option 2</option>
                                <option>option 3</option>
                                <option>option 4</option>
                                
                            </select>
                        </div>

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