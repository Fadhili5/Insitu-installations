import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { LocaleKey } from '../data/installations'
import { useLanguage } from '../state/useLanguage'
import '../App.css'

const languages: { key: LocaleKey; label: string }[] = [
  { key: 'en', label: 'EN' },
  { key: 'zh', label: '简' },
  { key: 'zhHK', label: '繁' },
]

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale, i18n])

  const handleSelect = (key: LocaleKey) => {
    setLocale(key)
  }

  return (
    <div className="lang-switch" role="group" aria-label="Language switcher">
      {languages.map((lang) => (
        <button
          key={lang.key}
          className={`lang-btn ${locale === lang.key ? 'is-active' : ''}`}
          onClick={() => handleSelect(lang.key)}
          aria-pressed={locale === lang.key}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}

