import { SelectOrganization } from '@/components/select-organization'
import { auth } from '@/config/auth'
import { redirect } from 'next/navigation'

export default async function SelectOrgPage() {
  const session = await auth()

  if (session && session?.user?.activeOrg) return redirect('/')
  if (!session || !session.user) return redirect('/login')

  return <SelectOrganization />
}
