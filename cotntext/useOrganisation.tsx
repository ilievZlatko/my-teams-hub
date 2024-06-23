'use client'

import { Organisation } from '@/types/organisation.types'
import { createContext, useContext } from 'react'

type OrganisationContextType = {
  activeOrg: Organisation | null
  setActiveOrg: (org: Organisation | null) => void
}

const orgInitialValues: OrganisationContextType = {
  activeOrg: null,
  setActiveOrg: () => {},
}

export const OrganisationContext =
  createContext<OrganisationContextType>(orgInitialValues)

export const useOrganisation = () => {
  const state = useContext(OrganisationContext)
  return state
}
