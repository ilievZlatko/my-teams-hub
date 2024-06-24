'use client'

import { getOrgs } from '@/actions/organization.actions'
import { OrganisationContext } from '@/cotntext/useOrganisations'
import { Organisation } from '@/types/organisation.types'
import { useEffect, useState } from 'react'

export const OrganisationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [activeOrg, setActiveOrg] = useState<Organisation | null>(null)

  return (
    <OrganisationContext.Provider
      value={{
        activeOrg,
        setActiveOrg,
      }}
    >
      {children}
    </OrganisationContext.Provider>
  )
}
