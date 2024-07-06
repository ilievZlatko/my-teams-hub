'use server'

import { revalidateTag } from 'next/cache'

import routes from '@/api-routes'
import { auth } from '@/config/auth'
import { fetcher } from '@/lib/utils'
import { EditTeamType, EditTeamSchema } from '@/schemas/edit-team.schema'
import { PatchTeam, Team } from '@/types/team'

export const editTeam = async (
  organizationId: string,
  teamId: string,
  values: EditTeamType,
) => {
  const session = await auth()
  const validatedFields = EditTeamSchema.omit({ otherUsers: true }).safeParse(
    values,
  )

  if (!session || !session.user.userId) {
    return { error: 'unauthorized_request' }
  }

  if (!validatedFields.success) {
    return { error: 'invalid_fields_msg' }
  }

  try {
    const { name, description, teamMembers } = validatedFields.data
    let members: { teamMemberId: string; email: string }[] = []

    if (teamMembers && teamMembers.length > 0) {
      members = teamMembers.map((member) => ({
        teamMemberId: member.memberId,
        email: member.email,
      }))
    }

    const response = await fetcher<null, PatchTeam>({
      url: routes.team.patch(organizationId, teamId),
      method: 'PATCH',
      body: {
        name,
        description,
        teamMembers: members,
      },
    })

    revalidateTag('teams')

    return response
  } catch (error: unknown) {
    //@ts-expect-error: unknown server error type
    return { error: error?.message || 'error_occurred_msg' }
  }
}

export const getTeam = async (organizationId: string, teamId: string) => {
  const session = await auth()
  if (!session || !session.user.userId) {
    return { error: 'unauthorized_request' }
  }

  try {
    const response = await fetcher<Team, null>({
      url: routes.team.getOne(organizationId, teamId),
      method: 'GET',
      revalidateTags: ['teams']
    })

    return response
  } catch (_: unknown) {
    return { error: 'error_occurred_msg' }
  }
}

export const deleteTeam = async (organizationId: string, teamId: string) => {
  const session = await auth()
  if (!session || !session.user.userId) {
    return { error: 'unauthorized_request' }
  }

  try {
    const response = await fetcher<null, null>({
      url: routes.team.delete(organizationId, teamId),
      method: 'DELETE',
    })

    revalidateTag('teams')

    return response
  } catch (_: unknown) {
    return { error: 'error_occurred_msg' }
  }
}
