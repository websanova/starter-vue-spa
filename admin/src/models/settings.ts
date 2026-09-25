/**
 * The admin's half of Settings. SettingsDto is the raw API shape, the declare
 * module adds this admin's fields to the shared interface, and toSettings maps
 * one to the other. Fields the API does not send are declared in the
 * augmentation only and come from config/settings.ts instead - which is why
 * these three lists do not match.
 */
export interface SettingsDto {}

declare module '@shared/models/settings' {
  interface Settings {
    defaultUsersSortBy: string
    defaultUsersSortDir: string
  }
}

export function toSettings(dto: SettingsDto) {
  return {}
}
