import 'server-only'
import type { Locale } from '@/config/i18n.config'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then(module => module.default),
  bg: () => import('@/dictionaries/bg.json').then(module => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
