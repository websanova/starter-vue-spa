import { settings } from '@/config/settings'

const KEY = 'locale'

/**
 * Reads the stored locale.
 */
export function getLocale() {
  return localStorage.getItem(KEY)
}

/**
 * Stores the active locale.
 */
export function setLocale(locale: string) {
  localStorage.setItem(KEY, locale)
}

/**
 * Best-effort match of the browser's preferred languages to a
 * supported locale, by exact tag then language subtag.
 */
function detectLocale() {
  const supported = settings.locales ?? []
  const prefs = navigator.languages ?? [navigator.language]

  for (const pref of prefs) {
    if (supported.includes(pref)) return pref

    const lang = pref.split('-')[0]
    const match = supported.find((l) => l.split('-')[0] === lang)
    if (match) return match
  }

  return undefined
}

/**
 * Resolves the initial locale: a valid stored value, else a detected
 * one (which is then persisted), else the configured default.
 */
export function resolveLocale() {
  const stored = getLocale()

  if (stored && settings.locales?.includes(stored)) {
    return stored
  }

  const detected = detectLocale()

  if (detected) {
    setLocale(detected)
    return detected
  }

  return settings.defaultLocale!
}
