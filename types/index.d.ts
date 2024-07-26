declare interface Organisation {
  organizationId: string
  organizationName: string
  role: number
}

declare interface Team {
  teamId: string
  name: string
  description?: string
  teamMembers: TeamMember[]
}

declare interface TeamMember {
  memberId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  status: number
  role: number
}

declare interface PatchTeamPayload {
  name: string
  description?: string
  teamMembers: { teamMemberId: string; email: string; isLead: boolean }[]
}

declare interface TeamList {
  total: number
  teams: Team[]
}

declare interface IUser {
  userId: string
  firstName: string
  lastName: string
  email: string
  status: number
  creationDate?: Date
  phoneNumber?: string
  teams?: IUserTeam[]
}

declare interface IUserTeam {
  teamId: string
  name: string
}
