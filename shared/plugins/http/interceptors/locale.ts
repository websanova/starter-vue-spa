import { getLocale } from '@shared/lib/locale'

import type { RequestInterceptor } from '@shared/plugins/http/client'

/**
 * Sends the active locale so the API can localize responses such as
 * validation messages, mailables, and notifications.
 */
export const request: RequestInterceptor = (config) => {
  const locale = getLocale()

  if (locale) {
    config.headers['Accept-Language'] = locale
  }

  return config
}
