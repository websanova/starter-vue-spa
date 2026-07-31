export type SubscriptionMode = 'freemium' | 'trial' | 'required'

export interface SettingsDto {
  subscription_card_upfront: boolean
  subscription_mode: SubscriptionMode
  subscription_trial_days: number
  verification_code_length: number
  verification_required: string[]
}

export interface Settings {
  locales: string[]
  defaultLocale: string
  defaultTimezone: string
  subscriptionCardUpfront: boolean
  subscriptionMode: SubscriptionMode
  subscriptionTrialDays: number
  verificationCodeLength: number
  verificationRequired: string[]
}

export function toSettings(dto: SettingsDto): Partial<Settings> {
  return {
    subscriptionCardUpfront: dto.subscription_card_upfront,
    subscriptionMode: dto.subscription_mode,
    subscriptionTrialDays: dto.subscription_trial_days,
    verificationCodeLength: dto.verification_code_length,
    verificationRequired: dto.verification_required,
  }
}
