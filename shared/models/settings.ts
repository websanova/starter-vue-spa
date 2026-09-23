export type SubscriptionMode = 'freemium' | 'trial' | 'required'

export interface SettingsDto {
  bookmark_max_tags: number
  subscription_card_upfront: boolean
  subscription_mode: SubscriptionMode
  subscription_trial_days: number
  verification_code_length: number
  verification_required: string[]
}

export interface Settings {
  bookmarkMaxTags: number
  locales: string[]
  defaultBookmarksSortBy: string
  defaultBookmarksSortDir: string
  defaultLocale: string
  defaultTimezone: string
  defaultUsersSortBy: string
  defaultUsersSortDir: string
  searchMinLength: number
  subscriptionCardUpfront: boolean
  subscriptionMode: SubscriptionMode
  subscriptionTrialDays: number
  verificationCodeLength: number
  verificationRequired: string[]
}

export function toSettings(dto: SettingsDto): Partial<Settings> {
  return {
    bookmarkMaxTags: dto.bookmark_max_tags,
    subscriptionCardUpfront: dto.subscription_card_upfront,
    subscriptionMode: dto.subscription_mode,
    subscriptionTrialDays: dto.subscription_trial_days,
    verificationCodeLength: dto.verification_code_length,
    verificationRequired: dto.verification_required,
  }
}
