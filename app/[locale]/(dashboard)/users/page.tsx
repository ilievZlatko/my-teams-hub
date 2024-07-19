import React from 'react'
import { GetAllUsersComponent } from '@/components/list-users'
import { getAllUsers } from '@/actions/user.actions'
import { toast } from 'sonner'

export default async function Teams() {
  const users = await getAllUsers()

  if ('error' in users) {
    return toast.error(users.error)
  }

  return <GetAllUsersComponent users={users} />
}
