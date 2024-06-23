'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useOrganisations } from '@/cotntext/useOrganisations'

const OrganizationSwitcher = () => {
  const { activeOrg, setActiveOrg, organizations } = useOrganisations()

  return (
    <Select
      onValueChange={val =>
        setActiveOrg(
          organizations?.find(org => org.organizationId === val) ?? null,
        )
      }
      defaultValue={activeOrg?.organizationId}
    >
      <SelectTrigger>
        <SelectValue placeholder='Select organisation'>
          {activeOrg?.organizationName}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {organizations?.map(org => (
          <SelectItem
            key={org.organizationId}
            value={org.organizationId}
          >
            {org.organizationName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default OrganizationSwitcher
