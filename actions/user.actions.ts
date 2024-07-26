'use server'

interface CustomError extends Error {
  message: string
}

import routes from '@/api-routes'
import { auth } from '@/config/auth'
import { EditUserFormData } from '@/schemas/edit-user.schema'

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
  } catch (error) {
    const customError = error as CustomError
    if (customError?.message) {
      return { error: customError.message }
    }
    return { error: 'error_occurred_msg' }
  }
}

export const getUserProfile = async (): Promise<IUser | { error: string }> => {
  try {
    const session = await auth()
    if (!session || !session.token?.access_token) {
      return { error: 'Session not found or token is missing' }
    }

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${session.token.access_token}`)

    const url = `${process.env.API_BASE_URL}${routes.me.get}`
    const res = await fetch(url, {
      method: 'GET',
      headers,
    })

    if (!res.ok) {
      return { error: `Network response was not ok: ${res.statusText}` }
    }

    const textResponse = await res.text()
    const jsonResponse = textResponse ? JSON.parse(textResponse) : null

    if (jsonResponse?.errors && jsonResponse.errors.length > 0) {
      return { error: jsonResponse.errors[0]?.message || 'An error occurred' }
    }

    return jsonResponse?.data ?? { error: 'No data returned from the API' }
  } catch (error) {
    const customError = error as CustomError
    return { error: customError.message || 'An unexpected error occurred' }
  }
}

export const updateUserProfile = async (
  userData: EditUserFormData,
): Promise<IUser | { error: string }> => {
  try {
    const session = await auth()
    if (!session || !session.token?.access_token) {
      return { error: 'Session not found or token is missing' }
    }

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${session.token.access_token}`)

    const url = `${process.env.API_BASE_URL}${routes.updateUser.patch}`
    const res = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(userData),
    })
    const jsonResponse = await res.json()

    if (jsonResponse?.errors && jsonResponse.errors?.length > 0) {
      return { error: 'error_occurred_msg' }
    }
    return jsonResponse?.data ?? null
  } catch (error) {
    const customError = error as CustomError
    return { error: customError.message || 'An unexpected error occurred' }
  }
}
