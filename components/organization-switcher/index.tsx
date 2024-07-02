'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSession } from 'next-auth/react'

const OrganizationSwitcher = () => {
  const { data: session, update } = useSession()

  const organizations = session?.user?.organizations
  const activeOrg = session?.user?.activeOrg

  const handleUpdateSession = async (orgId: string) => {
    const updatedSession = {
      ...session,
      user: {
        ...session?.user,
        activeOrg: orgId,
      },
      token: {
        ...session?.token,
        activeOrg: orgId,
      },
    }
    await update(updatedSession)
  }

  return (
    <Select
      onValueChange={handleUpdateSession}
      defaultValue={activeOrg ?? undefined}
      value={activeOrg ?? undefined}
    >
      <SelectTrigger className='bg-transparent border-transparent md:border-mth-silver-100 text-mth-silver-200 md:border-opacity-50'>
        <SelectValue placeholder='Select organisation'>
          {
            organizations?.find(org => org.organizationId === activeOrg)
              ?.organizationName
          }
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
