// following interfaces are used for 'Edit Team' functionality
export interface Team {
  teamId: string
  name: string
  description?: string
  teamMembers: TeamMember[]
}

export interface TeamMember {
  memberId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  status: number
}

export interface PatchTeam {
  name: string
  description?: string
  teamMembers: { teamMemberId: string; email: string }[]
}
