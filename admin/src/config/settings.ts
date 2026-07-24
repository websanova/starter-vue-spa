import type { Settings } from '@shared/models/settings'

/**
 * Admin-specific settings overrides. Merged last, so these win over the API response and the shared config.
 */
export const settings: Partial<Settings> = {
  locales: ['en-US'],
  defaultLocale: 'en-US',
}
