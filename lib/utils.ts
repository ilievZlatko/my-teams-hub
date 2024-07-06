import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { auth } from '@/config/auth'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetcher<T, B>({
  url,
  method = 'GET',
  body = undefined,
  headers = {},
  cache = 'no-cache',
  revalidateTags = undefined,
}: {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: B
  headers?: RequestInit['headers']
  cache?: RequestInit['cache'],
  revalidateTags?: string[] | undefined,
}): Promise<T | { error: string }> {
  const controller = new AbortController()
  const session = await auth()

  if (!session || !session.access_token) {
    return { error: 'unauthorized_request' }
  }

  try {
    const res = await fetch(`${process.env.API_BASE_URL}${url}`, {
      method,
      signal: controller.signal,
      body: typeof body === 'object' ? JSON.stringify(body) : undefined,
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
        ...headers,
      },
      cache,
      next: {
        tags: revalidateTags ? [...revalidateTags] : undefined,
      }
    })

    const jsonResponse = await res.json()

    if (jsonResponse?.errors && jsonResponse.errors?.length > 0) {
      return { error: 'error_occurred_msg' }
    }

    return jsonResponse?.data ?? null
  } catch (err: unknown) {
    //@ts-expect-error: error type returned from the server is unknown
    return { error: err?.message || 'error_occurred_msg' }
  } finally {
    controller.abort()
  }
}
