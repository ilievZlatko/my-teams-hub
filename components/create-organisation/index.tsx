'use client'

import { Form, useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { useTranslations } from 'next-intl'
import { zodResolver } from "@hookform/resolvers/zod"

import { z } from "zod"
import { CreateSchema } from "@/schemas/create.schema"
import { Input } from "../ui/input"
import { Label } from "@radix-ui/react-label"
import { Textarea } from "@/components/ui/textarea"


export const CreateForm = () => {
    const t = useTranslations('page')

    const form = useForm<z.infer<typeof CreateSchema>>({
        resolver: zodResolver(CreateSchema),
        defaultValues: { name: '', description: '', logo: '' },
    })

    const onSubmit = (values: z.infer<typeof CreateSchema>) => {

        console.log(values)
    }

    return (

        <Form {...form}>
            <form  className="space-y-8">

                <div className='space-y-2 '>
                    <Label htmlFor="name">Name</Label>
                    <Input type="name" id="name" placeholder="Name" className="bg-transparent" />
                </div>

                {/* <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}

                <div className="grid w-full gap-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea placeholder="Write a short description of your organisation" id="message" className="bg-transparent" />
                </div>
                <div>
                    <Label htmlFor="picture">Logo</Label>
                    <label className="flex h-[220px] w-full items-center justify-center rounded-md border border-dashed text-sm cursor-pointer">

                        <div className="flex flex-col gap-y-3 items-center justify-center">
                            <svg width="70" height="60" viewBox="0 0 70 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36.6369 14.7458L36.7291 14.7733L36.7332 14.7688C37.1708 14.8481 37.605 14.586 37.7336 14.1519C38.9052 10.2152 42.5963 7.46504 46.7087 7.46504C47.1956 7.46504 47.5905 7.07016 47.5905 6.5833C47.5905 6.09643 47.1956 5.70156 46.7087 5.70156C41.6546 5.70156 37.4074 9.06665 36.0437 13.6493C35.9045 14.1162 36.1704 14.6067 36.6369 14.7458Z" fill="#63929E" stroke="#FEFEFF" stroke-width="0.3" />
                                <path d="M56.9524 42.4384H52.5621C52.1581 42.4384 51.8303 42.1107 51.8303 41.7067C51.8303 41.3027 52.158 40.9749 52.5621 40.9749H56.9524C63.0043 40.9749 67.9283 36.0509 67.9283 29.999C67.9283 23.9471 63.0043 19.023 56.9524 19.023H56.8468C56.6346 19.023 56.4329 18.9311 56.2938 18.7706C56.1548 18.6101 56.0921 18.3974 56.1224 18.1873C56.1877 17.7315 56.2207 17.2737 56.2207 16.8279C56.2207 11.5829 51.953 7.31531 46.7081 7.31531C44.6676 7.31531 42.7217 7.95296 41.0805 9.15978C40.7199 9.42478 40.2077 9.30718 39.9991 8.91047C35.3511 0.0596993 23.2109 -1.12887 16.9169 6.57053C14.2654 9.81417 13.2236 14.0336 14.0584 18.146C14.1504 18.6002 13.8029 19.0236 13.3413 19.0236H13.0481C6.99624 19.0236 2.07217 23.9477 2.07217 29.9996C2.07217 36.0514 6.99624 40.9755 13.0481 40.9755H17.4385C17.8425 40.9755 18.1702 41.3032 18.1702 41.7072C18.1702 42.1113 17.8425 42.439 17.4385 42.439H13.0481C6.18914 42.439 0.608643 36.8585 0.608643 29.9995C0.608643 23.3329 5.88019 17.8742 12.4737 17.5731C11.8544 13.3066 13.0387 9.00295 15.7837 5.64437C22.5224 -2.5996 35.4366 -1.67556 40.8958 7.51707C42.6373 6.42522 44.6302 5.85244 46.7079 5.85244C53.0624 5.85244 58.0978 11.261 57.6572 17.58C64.19 17.9463 69.3915 23.3763 69.3915 29.999C69.3915 36.8585 63.811 42.4384 56.9521 42.4384L56.9524 42.4384Z" fill="#63929E" />
                                <path d="M16.4586 41.2935C16.4586 51.4634 24.7323 59.737 34.9021 59.737C45.0721 59.737 53.3456 51.4633 53.3456 41.2935C53.3456 31.1235 45.0721 22.85 34.9021 22.85C24.7322 22.85 16.4586 31.1237 16.4586 41.2935ZM18.2224 41.2935C18.2224 32.0966 25.7051 24.6138 34.9021 24.6138C44.099 24.6138 51.5818 32.0964 51.5818 41.2935C51.5818 50.4904 44.099 57.9732 34.9021 57.9732C25.7052 57.9732 18.2224 50.4905 18.2224 41.2935Z" fill="#63929E" stroke="#FEFEFF" stroke-width="0.3" />
                                <path d="M34.5509 48.6577C34.5509 49.0363 34.858 49.3434 35.2366 49.3434C35.6152 49.3434 35.9223 49.0367 35.9223 48.6577V34.7291C35.9223 34.3504 35.6153 34.0434 35.2366 34.0434C34.858 34.0434 34.5509 34.3504 34.5509 34.7291V48.6577Z" fill="#63929E" stroke="#63929E" stroke-width="0.3" />
                                <path d="M35.2365 35.7001L31.4358 39.5008L35.2365 35.7001ZM35.2365 35.7001L39.0373 39.5009C39.171 39.6346 39.347 39.7017 39.5221 39.7017L35.2365 35.7001ZM30.466 39.5009C30.7338 39.7687 31.1681 39.7689 31.4357 39.5009L39.5222 39.7017C39.697 39.7017 39.8731 39.6352 40.0071 39.5009C40.2749 39.233 40.2749 38.799 40.007 38.5311L35.7214 34.2455C35.4536 33.9777 35.0192 33.9775 34.7516 34.2455C34.7516 34.2455 34.7515 34.2456 34.7515 34.2456L30.466 38.5311C30.1981 38.799 30.1981 39.233 30.466 39.5009Z" fill="#63929E" stroke="#63929E" stroke-width="0.3" />
                            </svg>
                            <p className="font-normal text-[16px] leading-[24px] text-center">
                                Drag & drop files or <span className="text-[#63929E]">Browse</span>
                            </p>
                            <p className="font-normal text-[12px] leading-[18px] text-center text-[#7A7D7E]">Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
                            </p>
                        </div>

                        <Input type="file" id="picture" className="hidden" />
                    </label>
                </div>

                <Button
                    type='submit'
                    className='w-full'
                >
                    Submit
                </Button>
            </form>
        </Form>
    )
}

