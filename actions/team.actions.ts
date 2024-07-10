'use server'

import routes from '@/api-routes'
import { auth } from '@/config/auth'
import { CreateTeamSchema, CreateTeamType } from '@/schemas/create-team.schema'

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
): Promise<Team[] | { error: string }> {
  try {
    const session = await auth()
    const headers = new Headers()

    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${session?.token?.access_token}`)

    const url = `${process.env.API_BASE_URL}${routes.allOrgsUrl.get}/${session?.user.activeOrg}${routes.allTeamsUrl.get}`

    const res = await fetch(url, {
      method: 'GET',
      headers,
    })
    const allTeams = await res.json()

    revalidateTag('teams')
    
    return allTeams.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.message) {
      return { error: error.message }
    }
    return { error: 'An error has occurred!' }
  }
}