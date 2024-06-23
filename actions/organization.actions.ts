'use server'

import routes from '@/api-routes'
import { auth } from '@/config/auth'
import { CreateOrganizationType } from '@/schemas/create-organization.schema'
import { Organisation } from '@/types/organisation.types'
import { revalidateTag } from 'next/cache'

export async function createOrg(
  data: CreateOrganizationType,
): Promise<Organisation | { error: string }> {
  try {
    const session = await auth()
    const headers = new Headers()

    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${session?.token?.access_token}`)

    const url = `${process.env.API_BASE_URL}${routes.createOrgUrl.post}`
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    const newOrg = await res.json()
    revalidateTag('organizations')
    return newOrg.data
  } catch (error: any) {
    if (error?.message) {
      return { error: error.message }
    }
    return { error: 'An error has occurred!' }
  }
}

export async function getOrgs(): Promise<Organisation[] | { error: string }> {
  try {
    const session = await auth()
    const headers = new Headers()

    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${session?.token?.access_token}`)

    const url = `${process.env.API_BASE_URL}${routes.allOrgsUrl.get}`
    const res = await fetch(url, {
      method: 'GET',
      headers,
      next: {
        tags: ['organizations'],
      },
    })
    const orgs = await res.json()
    return orgs.data
  } catch (error: any) {
    if (error?.message) {
      return { error: error.message }
    }
    return { error: 'An error has occurred!' }
  }
}
