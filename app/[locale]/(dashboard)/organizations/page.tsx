import { toast } from 'sonner'

import { auth } from '@/config/auth'
import { getOrgs } from '@/actions/organization.actions'
import { GetAllOrganizations } from '@/components/get-all-organizations'

export default async function Organizations() {
  const session = await auth()

  if (!session?.user) return toast.error('Unauthorized Request')

  const organizations = await getOrgs()

  if (!Array.isArray(organizations)) {
    return toast.error('An Error Occurred!')
  }

  return <GetAllOrganizations organizations={organizations} />
}
