import Header from '../header'
import { auth } from '@/config/auth'

export default async function HeaderWrapper() {
  const session = await auth()

  return (
    <Header
      name={session?.user.firstName ?? ''}
      email={session?.user.email ?? ''}
    />
  )
}
