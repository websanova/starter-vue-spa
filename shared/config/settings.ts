export interface Settings {
  locales: string[]
  defaultLocale: string
  defaultTimezone: string
  verification_code_length: number
}

/**
 * Shared settings defaults applied across every app. Merged
 * over the API response and under each app's local config.
 */
export const settings: Partial<Settings> = {}
