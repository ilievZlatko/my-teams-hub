// 'use client'

// import { getUserProfile } from '@/actions/user.actions'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader } from '@/components/ui/card'
// import {
//   Form,
//   FormControl,
//   FormLabel,
//   FormItem,
//   FormField,
//   FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { EditUserFormData, EditUserSchema } from '@/schemas/edit-user.schema'
// import { IUser } from '@/types/user'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'

// const User = () => {
//   const [user, setUser] = useState<IUser | null>(null)
//   const [error, setError] = useState<string | null>(null)

//   const form = useForm<EditUserFormData>({
//     resolver: zodResolver(EditUserSchema),
//     defaultValues: { firstName: '', lastName: '', email: '', phoneNumber: '' },
//   })

//   useEffect(() => {
//     getUserProfile()
//       .then((response) => {
//         if ('error' in response) {
//           setError(response.error)
//         } else {
//           setUser(response)
//           form.reset({
//             firstName: response.firstName,
//             lastName: response.lastName,
//             email: response.email,
//             phoneNumber: response.phoneNumber ?? '',
//           })
//         }
//       })
//       .catch((error) => {
//         // return { error }
//         setError(error.message)
//       })
//   }, [form])

//   return (
//     <>
//       <div className="flex gap-16">
//         <div>Photo</div>
//         <div className="flex flex-col">
//           <Card>
//             <CardHeader>Edit User</CardHeader>
//             <CardContent className="">
//               <Form {...form}>
//                 <form onSubmit={form.handleSubmit((data) => console.log(data))}>
//                   <FormField
//                     control={form.control}
//                     name="firstName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>First Name</FormLabel>
//                         <FormControl>
//                           <Input {...field} placeholder="First Name" />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="lastName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Last Name</FormLabel>
//                         <FormControl>
//                           <Input {...field} placeholder="Last Name" />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Email</FormLabel>
//                         <FormControl>
//                           <Input {...field} placeholder="Email" />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="phoneNumber"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Phone Number</FormLabel>
//                         <FormControl>
//                           <Input {...field} placeholder="Phone Number" />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <Button type="submit">Edit</Button>
//                 </form>
//               </Form>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </>
//   )
// }

// export default User

"use client"
import { getUserProfile, updateUserProfile } from '@/actions/user.actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const User = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const form = useForm<EditUserFormData>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phone: '' },
  })

  useEffect(() => {
    getUserProfile()
      .then((response) => {
        if ('error' in response) {
          setError(response.error)
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
      })
  }, [form])

  const onSubmit = async (data: EditUserFormData) => {
    console.log('data')

    setError(null)
    setSuccess(null);

    if (!user) {
      return
    }
    const userData = { ...data, userId: user.userId, status: user.status, title: "" }
    const response = await updateUserProfile(userData)


  }

  return (
    <>
      <Card className="mx-auto w-full border-0 px-0 text-mth-grey-blue-700 shadow-none xl:max-w-[980px]">
        <CardContent className="flex flex-col-reverse items-center justify-center gap-6 max-sm:mx-auto max-sm:px-0 lg:flex-row">
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}
          <Image
            src="/assets/images/team2.svg"
            alt="team image"
            className="w-full max-sm:w-[300px] sm:max-w-[350px] md:max-w-[380px] lg:max-w-[360px] xl:max-w-[445px]"
            width={445}
            height={404}
            priority
          />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col items-center gap-6 font-poppins max-sm:min-w-[70vw] sm:w-[500px] md:min-w-[400px] lg:min-w-[500px]">
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
                      <FormMessage className="text-xs"/>
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
                      <FormMessage className="text-xs"/>
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
                      <FormMessage className="text-xs"/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="space-y-1 *:rounded-xl">Phone Number</FormLabel>
                      <FormControl className="font-normal">
                        <Input {...field} placeholder="Phone Number" />
                      </FormControl>
                      <FormMessage className="text-xs"/>
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">Save</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

export default User
