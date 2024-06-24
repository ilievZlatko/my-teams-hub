'use client'

import { getOrgs } from '@/actions/organization.actions'
import { OrganisationContext } from '@/cotntext/useOrganisations'
import { Organization } from '@/types/organization.types'
import { useSession } from 'next-auth/react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const OrganisationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const session = useSession()
  const locale = useLocale()
  const router = useRouter()
  const [activeOrg, setActiveOrg] = useState<Organization | null>(null)
  const [organizations, setOrganizations] = useState<Organization[] | null>(
    null,
  )

  useEffect(() => {
    const fetchOrgs = async () => {
      const orgs = await getOrgs()
      if (Array.isArray(orgs)) {
        setOrganizations(orgs)
      }
    }

    if (!session || session.status !== 'authenticated') {
      return router.push(`/${locale}/login`)
    }

    if (!organizations && session.status === 'authenticated') {
      fetchOrgs()
    }
  }, [locale, organizations, router, session])

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
