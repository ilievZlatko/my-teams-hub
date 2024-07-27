'use server'

import { revalidateTag } from 'next/cache'
import routes from '@/api-routes'
import { auth } from '@/config/auth'
import { CreateTeamSchema, CreateTeamType } from '@/schemas/create-team.schema'
import { EditTeamSchema, EditTeamType } from '@/schemas/edit-team.schema'

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
export async function editTeam(
  organizationId: string,
  teamId: string,
  values: EditTeamType,
): Promise<null | { error: string }> {
  try {
    const session = await auth()

    const validatedFields = EditTeamSchema.omit({ otherUsers: true }).safeParse(
      values,
    )

    if (!validatedFields.success) {
      return { error: 'invalid_fields_msg' }
    }

    const { name, description, teamMembers } = validatedFields.data
    let members: { teamMemberId: string; email: string; isLead: boolean }[] = []

    if (teamMembers && teamMembers.length > 0) {
      members = teamMembers.map((member) => ({
        teamMemberId: member.memberId,
        email: member.email,
        isLead: member.role !== 2 ? true : false,
      }))
    }

    const data: PatchTeamPayload = { name, description, teamMembers: members }

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${session?.token?.access_token}`)

    const url = `${process.env.API_BASE_URL}${routes.team.patch(organizationId, teamId)}`

    const res = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    })

    revalidateTag('teams')

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

export async function getTeam(
  organizationId: string,
  teamId: string,
): Promise<Team | { error: string }> {
  try {
    const session = await auth()
    const headers = new Headers()

    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${session?.token?.access_token}`)

    const url = `${process.env.API_BASE_URL}${routes.team.getOne(organizationId, teamId)}`
    const res = await fetch(url, {
      method: 'GET',
      headers,
      next: {
        tags: ['teams'],
      },
    })

    const jsonResponse = await res.json()

    if (jsonResponse?.errors && jsonResponse.errors?.length > 0) {
      return { error: 'error_occurred_msg' }
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

export async function deleteTeam(
  organizationId: string,
  teamId: string,
): Promise<null | { error: string }> {
  try {
    const session = await auth()
    const headers = new Headers()

    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${session?.token?.access_token}`)

    const url = `${process.env.API_BASE_URL}${routes.team.delete(organizationId, teamId)}`
    const res = await fetch(url, {
      method: 'DELETE',
      headers,
    })

    revalidateTag('teams')

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
