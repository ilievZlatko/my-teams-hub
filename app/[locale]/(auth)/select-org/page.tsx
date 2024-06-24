import { SelectOrganization } from '@/components/select-organization'
import { getOrgs } from '@/actions/organization.actions'
import { Organization } from '@/types/organization.types'

export default async function SelectOrgPage() {
  const organizations = await getOrgs()
  return <SelectOrganization organizations={organizations as Organization[]} />
}
