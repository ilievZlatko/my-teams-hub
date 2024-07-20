import { LoginForm } from '@/components/login-form'
import { redirect } from 'next/navigation'
import { auth } from '@/config/auth'

export default async function LoginPage() {
  const session = await auth()

  if (session && session?.user) {
    if (!session.user?.activeOrg) return redirect('/select-org')
    return redirect('/')
  }

  return <LoginForm />
}
