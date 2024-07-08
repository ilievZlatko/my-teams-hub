'use server'

import routes from '@/api-routes'
import { auth } from '@/config/auth'
import { IUser } from '@/types/user'

export async function getAllUsers(): Promise<IUser[] | { error: string }> {
  try {
    const session = await auth()
    const headers = new Headers()

    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${session?.token?.access_token}`)

    const url = `${process.env.API_BASE_URL}${routes.allUsers.get}`
    const res = await fetch(url, {
      method: 'GET',
      headers,
      next: {
        tags: ['users'],
      },
    })

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
