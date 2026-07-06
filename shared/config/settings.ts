export interface Settings {
  auto_login: boolean
}

/**
 * Shared settings defaults applied across every app. Merged over the API response and under each app's local config.
 */
export const settings: Partial<Settings> = {
  auto_login: false,
}
