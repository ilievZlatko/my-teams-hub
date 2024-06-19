import { auth } from '@/config/auth.config'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetcher<T, B>({
  url,
  method = 'GET',
  body = undefined,
  headers = {},
  cache = 'no-cache',
}: {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: B
  headers?: RequestInit['headers']
  cache?: RequestInit['cache']
}): Promise<T | { error: string }> {
  const controller = new AbortController()
  const session = await auth()

  if (!session || !session.access_token) {
    return { error: 'Unauthorized' }
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
    })
    if (!res.ok) {
      const error = await res.json()
      return { error: `An error with code: ${error.code} has occured` }
    }
    return (await res.json()).data
  } catch (err: any) {
    return { error: err?.message || 'An error has occured' }
  } finally {
    controller.abort()
  }
}
