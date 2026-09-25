/**
 * The settings shared code reads. Only the fields shared components and
 * composables actually touch are declared here, so shared/ stays compilable
 * on its own. Each app widens this same interface through a declare module in
 * its own models/settings.ts, so Settings resolves to more fields inside an
 * app than it does here.
 *
 * Three other files feed it, merged in this order by useSettingsService load():
 * the API response mapped through the app's toSettings(), then
 * shared/config/settings.ts for defaults that apply to every app, then the
 * app's own config/settings.ts, which wins.
 */
export interface Settings {
  defaultLocale: string
  locales: string[]
  searchMinLength: number
}
