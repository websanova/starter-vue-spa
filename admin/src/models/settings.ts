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
