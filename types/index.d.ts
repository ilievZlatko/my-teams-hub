export interface Example {
  someField: string
  anotherField: number
}

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

export interface TeamList {
  total: number
  teams: Team[]
}
export interface Organisation {
  organizationId: string
  organizationName: string
  role: number
}
export interface IUser {
  userId: string
  firstName: string
  lastName: string
  email: string
  status: number
  creationDate?: Date
  phoneNumber?: string
  teams?: IUserTeam[]
}

export interface IUserTeam {
  teamId: string
  name: string
}
