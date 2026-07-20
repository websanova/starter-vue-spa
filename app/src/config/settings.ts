import type { Settings } from '@shared/config/settings'

/**
 * App-specific settings overrides. Merged last, so these win over the API response and the shared config.
 */
export const settings: Partial<Settings> = {
  locales: ['en-US'],
  defaultLocale: 'en-US',
}
