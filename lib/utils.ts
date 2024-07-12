import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { auth } from '@/config/auth'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type RequestConfig = {
  params?: Record<string, string | number> | null
} & RequestInit

export async function fetcher(
  url: string,
  { ...configs }: RequestConfig = {},
): Promise<Response | { error: string }> {
  const session = await auth()

  if (!session || !session.access_token) {
    return { error: 'unauthorized_request' }
  }

  const generatedUrl = new URL(`${process.env.API_BASE_URL}${url}`)

  if (configs?.params) {
    Object.keys(configs.params).forEach((key) => {
      generatedUrl.searchParams.append(key, String(configs?.params?.[key]))
    })
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session.access_token}`,
    ...configs.headers,
  }

  const { params, ...restConfig } = configs

  const config: RequestInit = {
    headers,
    ...restConfig,
  }

  return await fetch(generatedUrl.toString(), config)
}

export function getRandomNumber(): string {
  return (Math.floor(Math.random() * 59) + 1).toString()
}
