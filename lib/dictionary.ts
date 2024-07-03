import 'server-only'
import type { Locale } from '@/navigation'

const messages = {
  en: () => import('@/messages/en.json').then((module) => module.default),
  bg: () => import('@/messages/bg.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => messages[locale]()
