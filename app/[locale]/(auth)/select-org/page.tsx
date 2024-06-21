import { SelectOrgForm } from '@/components/select-org-form'
import { getOrgs } from '@/actions/getOrgs'
import { Organisation } from '@/types/organisation.types'

export default async function SelectOrgPage() {
  const organisations = await getOrgs()

  console.log('ORGANISATIONS: ', organisations)

  if (!organisations) {
    return null
  }

  return <SelectOrgForm organisations={organisations as Organisation[]} />
}
