import type { App } from 'vue'

import { createI18n as createVueI18n } from 'vue-i18n'
import { settings } from '@/config/settings'
import { resolveLocale } from '@shared/lib/locale'
import datetimeFormats from './datetimeFormats'
import numberFormats from './numberFormats'

function buildI18n() {
  return createVueI18n({
    datetimeFormats,
    fallbackLocale: settings.defaultLocale!,
    legacy: false,
    locale: resolveLocale(),
    numberFormats,
  })
}

export type Locale = ReturnType<typeof buildI18n>['global']['locale']['value']

let instance: ReturnType<typeof buildI18n>['global']

/**
 * Builds the default i18n instance with the shared datetime and number
 * formats. The instance is exposed through useI18n for use in non
 * component code.
 */
function createI18n(app: App) {
  const i18n = buildI18n()

  instance = i18n.global

  app.use(i18n)
}

function useI18n() {
  return instance
}

export { createI18n, useI18n }
