'use client'

import { Organisation } from '@/types/organisation.types'
import { createContext, useContext } from 'react'

type OrganisationContextType = {
  currentOrg: Organisation | null
  setCurrentOrg: (org: Organisation | null) => void
}

const orgInitialValues: OrganisationContextType = {
  currentOrg: null,
  setCurrentOrg: () => {},
}

export const OrganisationContext =
  createContext<OrganisationContextType>(orgInitialValues)

export const useOrganisation = () => {
  const state = useContext(OrganisationContext)
  return state
}
