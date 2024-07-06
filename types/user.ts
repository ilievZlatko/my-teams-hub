export interface IUser {
  userId: string
  firstName: string
  lastName: string
  email: string
  status: number
  creationDate: Date
  teams: IUserTeam[]
}

export interface IUserTeam {
  teamId: string
  name: string
}
