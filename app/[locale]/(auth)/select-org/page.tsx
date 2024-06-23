import { SelectOrganization } from '@/components/select-organization'
import { getOrgs } from '@/actions/organization.actions'
import { Organisation } from '@/types/organisation.types'

export default async function SelectOrgPage() {
  const organisations = await getOrgs()
  return <SelectOrganization organisations={organisations as Organisation[]} />
}
