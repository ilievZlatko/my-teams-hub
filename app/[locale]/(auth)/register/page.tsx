import { RegisterForm } from '@/components/register-form'
import { auth } from '@/config/auth'
import { redirect } from 'next/navigation'

export default async function RegisterPage() {
  const session = await auth()

  if (session && session.user) {
    if (!session?.user?.activeOrg) return redirect('/select-org')
    return redirect('/')
  }

  return <RegisterForm />
}
