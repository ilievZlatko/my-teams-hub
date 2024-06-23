'use client'

import { Organisation } from '@/types/organisation.types'
import { createContext, useContext } from 'react'

type OrganisationContextType = {
  organizations: Organisation[] | null
  activeOrg: Organisation | null
  setActiveOrg: (org: Organisation | null) => void
  setOrganizations: (orgs: Organisation[] | null) => void
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
