export interface Settings {
  locales: string[]
  defaultLocale: string
}

/**
 * Shared settings defaults applied across every app. Merged
 * over the API response and under each app's local config.
 */
export const settings: Partial<Settings> = {}
