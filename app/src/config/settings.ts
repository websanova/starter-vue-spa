import type { Settings } from '@shared/models/settings'

/**
 * App-specific settings overrides. Merged last, so these win over the API response and the shared config.
 */
export const settings: Partial<Settings> = {
  defaultBookmarksSortBy: 'created_at',
  defaultBookmarksSortDir: 'desc',
  defaultLocale: 'en-US',
  defaultTimezone: 'America/New_York',
  locales: ['en-US', 'en-CA', 'fr-CA'],
  searchMinLength: 3,
}
