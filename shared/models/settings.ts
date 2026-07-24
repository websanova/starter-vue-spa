export interface SettingsDto {
  verification_code_length: number
  verification_required: string[]
}

export interface Settings {
  locales: string[]
  defaultLocale: string
  defaultTimezone: string
  verificationCodeLength: number
  verificationRequired: string[]
}

export function toSettings(dto: SettingsDto): Partial<Settings> {
  return {
    verificationCodeLength: dto.verification_code_length,
    verificationRequired: dto.verification_required,
  }
}
