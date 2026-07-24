export interface SettingsDto {
  verification_code_length: number
}

export interface Settings {
  locales: string[]
  defaultLocale: string
  defaultTimezone: string
  verificationCodeLength: number
}

export function toSettings(dto: SettingsDto): Partial<Settings> {
  return {
    verificationCodeLength: dto.verification_code_length,
  }
}
