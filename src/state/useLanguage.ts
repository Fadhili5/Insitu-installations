import { create } from 'zustand'
import type { LocaleKey } from '../data/installations'

const getInitialLocale = (): LocaleKey => {
  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem('locale') as LocaleKey | null
    if (saved === 'en' || saved === 'zh' || saved === 'zhHK') return saved
    const nav = window.navigator.language.toLowerCase()
    if (nav.startsWith('zh-hk') || nav.startsWith('zh-yue')) return 'zhHK'
    if (nav.startsWith('zh')) return 'zh'
  }
  return 'en'
}

type LanguageState = {
  locale: LocaleKey
  setLocale: (locale: LocaleKey) => void
}

export const useLanguage = create<LanguageState>((set) => ({
  locale: getInitialLocale(),
  setLocale: (locale) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('locale', locale)
    }
    set({ locale })
  },
}))

