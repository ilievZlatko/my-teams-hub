'use client'

import { getOrgs } from '@/actions/organization.actions'
import { OrganisationContext } from '@/cotntext/useOrganisations'
import { Organisation } from '@/types/organisation.types'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const OrganisationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const locale = useLocale()
  const router = useRouter()
  const [activeOrg, setActiveOrg] = useState<Organisation | null>(null)
  const [organizations, setOrganizations] = useState<Organisation[] | null>(
    null,
  )

  useEffect(() => {
    if (!organizations) {
      getOrgs().then(orgs => {
        if (Array.isArray(orgs)) {
          setOrganizations(orgs)
        } else {
          router.push(`/${locale}/select-org`)
        }
      })
    }
  }, [])

  return (
    <OrganisationContext.Provider
      value={{
        organizations,
        activeOrg,
        setActiveOrg,
        setOrganizations,
      }}
    >
      {children}
    </OrganisationContext.Provider>
  )
}
