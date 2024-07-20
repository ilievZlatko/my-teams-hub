import Header from '../header'
import { getUserProfile } from '@/actions/user.actions'
import { IUser } from '@/types/user'

export default async function HeaderWrapper() {
  const user = await getUserProfile()
  return <Header user={user as IUser} />
}
