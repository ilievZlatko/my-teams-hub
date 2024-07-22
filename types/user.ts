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
