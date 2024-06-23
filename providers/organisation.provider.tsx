'use client'

import { OrganisationContext } from '@/cotntext/useOrganisation'
import { Organisation } from '@/types/organisation.types'
import { useState } from 'react'

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
