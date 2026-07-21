import { computed } from 'vue'

import { settings } from '@/config/settings'
import { useI18n as useI18nPlugin, type Locale } from '@shared/plugins/i18n'
import { useI18nStore, type I18nTier } from '@shared/stores/i18n'
import { setLocale } from '@shared/lib/locale'

type I18nFiles = Partial<Record<I18nTier, string[]>>

const tiers: I18nTier[] = ['layout', 'page', 'site']

const loadedKeys: Record<I18nTier, 'isLayoutLoaded' | 'isPageLoaded' | 'isSiteLoaded'> = {
  layout: 'isLayoutLoaded',
  page: 'isPageLoaded',
  site: 'isSiteLoaded',
}

export const useI18nService = function() {
  const store = useI18nStore()
  const i18n = useI18nPlugin()

  /**
   * Marks a tier fully loaded once every tracked file across
   * all locales for that tier has resolved.
   */
  function setLoaded(tier: I18nTier) {
    const loaded = Object.values(store.localesLoaded[tier]).flatMap((files) => Object.values(files))

    if (loaded.every((isLoaded) => isLoaded)) {
      store[loadedKeys[tier]] = true
    }
  }

  /**
   * Fetches a single locale file and merges it into the active
   * messages. Flags the file loaded on success or failure so a
   * missing file never blocks the tier from completing.
   */
  function fetchFile(tier: I18nTier, locale: string, name: string) {
    store.localesLoaded[tier][locale] ??= {}
    store.localesLoaded[tier][locale][name] = false
    store[loadedKeys[tier]] = false

    const v = import.meta.env.PROD ? __I18N_VERSION__ : Date.now()

    fetch(`/i18n/${locale}/${name}.json?v=${v}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        i18n.mergeLocaleMessage(locale, { [name]: data })
        store.localesLoaded[tier][locale][name] = true
        setLoaded(tier)
      })
      .catch((err) => {
        console.error(`[i18n] Failed to load /i18n/${locale}/${name}.json`, err)
        store.localesLoaded[tier][locale][name] = true
        setLoaded(tier)
      })
  }

  /**
   * Loads the given files for the active locale, adding the
   * fallback locale when it differs. Skips files already tracked
   * and marks empty tiers loaded immediately.
   */
  function load(files: I18nFiles) {
    const locale = i18n.locale.value
    const fallback = settings.defaultLocale!
    const locales = locale === fallback ? [locale] : [fallback, locale]

    tiers.forEach((tier) => {
      const names = files[tier] || []

      if (!names.length) {
        setLoaded(tier)
        return
      }

      names.forEach((name) => {
        locales.forEach((loc) => {
          if (store.localesLoaded[tier][loc]?.[name] !== undefined) {
            return
          }

          fetchFile(tier, loc, name)
        })
      })
    })
  }

  /**
   * Switches the active locale. Reloads the set of files already
   * present for the current locale so the new locale has the same
   * coverage, then persists the choice.
   */
  function switchLocale(locale: Locale) {
    if (i18n.locale.value === locale) {
      return
    }

    const files: I18nFiles = {}

    tiers.forEach((tier) => {
      const names = Object.keys(store.localesLoaded[tier][i18n.locale.value] || {})

      if (names.length) {
        files[tier] = names
      }
    })

    i18n.locale.value = locale
    setLocale(locale)

    load(files)
  }

  return {
    isLayoutLoaded: computed(() => store.isLayoutLoaded),
    isPageLoaded: computed(() => store.isPageLoaded),
    isSiteLoaded: computed(() => store.isSiteLoaded),
    load,
    switchLocale,
  }
}
