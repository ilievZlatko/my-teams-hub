import Header from '../header'
import { getUserProfile } from '@/actions/user.actions'
import { auth } from '@/config/auth'
import { IUser } from '@/types/user'

export default async function HeaderWrapper() {
  const session = await auth()
  return <Header name={session?.user.firstName ?? ""} email={session?.user.email ?? ""}/>
}
