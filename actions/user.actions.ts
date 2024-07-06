'use server'

import routes from '@/api-routes'
import { fetcher } from '@/lib/utils'
import { IUser } from '@/types/user'

export const getAllUsers = async () => {
  try {
    const response = await fetcher<IUser[], null>({
      url: routes.allUsers.get,
      method: 'GET',
      revalidateTags: ['teams']
    })

    return response
  } catch (_error: unknown) {
    return { error: 'error_occurred_msg' }
  }
}
