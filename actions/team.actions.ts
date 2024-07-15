'use server'

import routes from '@/api-routes'
import { auth } from '@/config/auth'
import { CreateTeamSchema, CreateTeamType } from '@/schemas/create-team.schema'
import { TeamList } from '@/types/team'

import { Team } from '@/types/team.types'
import { revalidateTag } from 'next/cache'

export async function createTeam(
  data: CreateTeamType,
): Promise<Team | { error: string }> {
  const validatedFields = CreateTeamSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }
  try {
    const session = await auth()
    const headers = new Headers()

    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${session?.token?.access_token}`)

    const url = `${process.env.API_BASE_URL}${routes.allOrgsUrl.get}/${session?.user.activeOrg}${routes.createTeamUrl.post}`

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    const newTeam = await res.json()

    revalidateTag('teams')
    return newTeam.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.message) {
      return { error: error.message }
    }
    return { error: 'An error has occurred!' }
  }
}

export async function getAllTeams(
  organizationId: string,
): Promise<TeamList | { error: string }> {
  try {
    const session = await auth()
    const headers = new Headers()

    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${session?.token?.access_token}`)

    const url = `${process.env.API_BASE_URL}${routes.team.get(organizationId)}`

    const res = await fetch(url, {
      method: 'GET',
      headers,
      next: { tags: ['teams'] },
    })

    const jsonResponse = await res.json()

    if (jsonResponse?.errors && jsonResponse.errors?.length > 0) {
      return { error: jsonResponse.errors[0]?.code || 'error_occurred_msg' }
    }

    return jsonResponse?.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.message) {
      return { error: error.message }
    }
    return { error: 'error_occurred_msg' }
  }
}
