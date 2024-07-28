'use server'

import routes from '@/api-routes'
import { auth } from '@/config/auth'
import { CreateOrganizationType } from '@/schemas/create-organization.schema'
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.message) {
      return { error: error.message }
    }
    return { error: 'An error has occurred!' }
  }
}

export async function deleteOrg(
  organizationId: string,
): Promise<null | { error: string }> {
  try {
    const session = await auth()
    const headers = new Headers()

    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${session?.token?.access_token}`)

    const url = `${process.env.API_BASE_URL}${routes.organisation.delete(organizationId)}`
    const res = await fetch(url, {
      method: 'DELETE',
      headers,
    })

    revalidateTag('organisations')

    const jsonResponse = await res.json()

    if (jsonResponse?.errors && jsonResponse.errors?.length > 0) {
      return { error: 'error_occurred_msg' }
    }

    return jsonResponse?.data ?? null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.message) {
      return { error: error.message }
    }
    return { error: 'error_occurred_msg' }
  }
}
