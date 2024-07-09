"use client"

import { getUserProfile } from "@/actions/user.actions"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Form, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EditUserFormData, EditUserSchema } from "@/schemas/edit-user.schema"
import { IUser } from "@/types/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

const User = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserProfile()
      .then((response) => {
        if ('error' in response) {
          setError(response.error)
        } else {
          setUser(response)
        }
      })
      .catch((error) => {
        setError(error.message)
      })
  }, []);

  const form = useForm<EditUserFormData>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: { firstName: user?.firstName, lastName: user?.lastName, email: user?.email },
  });

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
                <FormLabel>Name</FormLabel>
                <Input placeholder="name" />
                <FormLabel>Email</FormLabel>
                <Input placeholder="email" />
                <FormLabel>Phone Number</FormLabel>
                <Input placeholder="phone number" />
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default User
