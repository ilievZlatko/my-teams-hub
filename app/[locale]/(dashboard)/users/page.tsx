"use client"

import { getUserProfile } from "@/actions/user.actions"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Form, FormControl, FormLabel, FormItem, FormField, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EditUserFormData, EditUserSchema } from "@/schemas/edit-user.schema"
import { IUser } from "@/types/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

const User = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [error, setError] = useState<string | null>(null);

  const form = useForm<EditUserFormData>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phoneNumber: '', option: '' },
  });

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
            // phoneNumber: response.phoneNumber ?? '',
            option: '' // default value for select
          })
        }
      })
      .catch((error) => {
        setError(error.message)
      })
  }, [form]);

  return (
    <>
      <div className="flex gap-16">
        <div>
          Photo
        </div>
        <div className="flex flex-col">
          <Card>
            <CardHeader>
              Edit User
            </CardHeader>
            <CardContent className="">
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => console.log(data))}>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="First Name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Last Name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Phone Number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="option"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option</FormLabel>
                        <FormControl>
                          <select {...field}>
                            <option value="" disabled>Select an option</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                            <option value="option4">Option 4</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <button type="submit">Submit</button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default User
