export interface IUser {
  userId: string
  firstName: string
  lastName: string
  email: string
  status: number
  creationDate: Date
  teams: IUserTeam[]
  error?: string
}

export interface IUserTeam {
  teamId: string
  name: string
}

export interface UserList {
  total: number
  teams: IUser[]
}
