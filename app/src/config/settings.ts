import type { Settings } from '@shared/models/settings'

/**
 * App-specific settings overrides. Merged last, so these win over the API response and the shared config.
 */
export const settings: Partial<Settings> = {
  locales: ['en-US', 'en-CA', 'fr-CA'],
  defaultLocale: 'en-US',
  defaultTimezone: 'America/New_York',
}
