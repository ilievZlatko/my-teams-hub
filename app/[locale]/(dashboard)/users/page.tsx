import { GetAllUsersComponent } from '@/components/list-users'
import { getAllUsers } from '@/actions/user.actions'

export default async function UsersPage() {
  const users = await getAllUsers()

  if ('error' in users) {
    return null
  }

  return <GetAllUsersComponent users={users} />
}
