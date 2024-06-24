'use client'

import { Organization } from '@/types/organization.types'
import { createContext, useContext } from 'react'

type OrganisationContextType = {
  organizations: Organization[] | null
  activeOrg: Organization | null
  setActiveOrg: (org: Organization | null) => void
  setOrganizations: (orgs: Organization[] | null) => void
}

const orgInitialValues: OrganisationContextType = {
  organizations: null,
  activeOrg: null,
  setActiveOrg: () => {},
  setOrganizations: () => {},
}

export const OrganisationContext =
  createContext<OrganisationContextType>(orgInitialValues)

export const useOrganisations = () => {
  const state = useContext(OrganisationContext)
  return state
}
