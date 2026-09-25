/**
 * The settings shared code reads. Each app augments this interface in its
 * own models/settings.ts with the fields only it consumes, so the store
 * resolves wider in that app than it does here.
 */
export interface Settings {
  defaultLocale: string
  locales: string[]
  searchMinLength: number
}
