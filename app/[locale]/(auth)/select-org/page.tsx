import { SelectOrganization } from '@/components/select-organization'
import { getOrgs } from '@/actions/getOrgs'
import { Organisation } from '@/types/organisation.types'

export default async function SelectOrgPage() {
  const organisations = await getOrgs()

  if (!organisations) {
    return null
  }

  return <SelectOrganization organisations={organisations as Organisation[]} />
}
