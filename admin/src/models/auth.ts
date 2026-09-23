export interface AuthPreferencesDto {
  users_sort_by?: string
  users_sort_dir?: string
}

export interface AuthPreferences {
  usersSortBy?: string
  usersSortDir?: string
}

export interface AuthDto {
  avatar_url: string
  email: string
  first_name: string
  id: number
  is_verification_required: boolean
  last_name: string
  locale: string
  preferences: AuthPreferencesDto
  role?: string
  timezone: string
  verification_pending: string[]
}

export interface Auth {
  avatarUrl: string
  email: string
  firstName: string
  id: number
  isVerificationRequired: boolean
  lastName: string
  locale: string
  preferences: AuthPreferences
  role?: string
  timezone: string
  verificationPending: string[]
}

export function toAuth(dto: AuthDto): Auth {
  return {
    avatarUrl: dto.avatar_url,
    email: dto.email,
    firstName: dto.first_name,
    id: dto.id,
    isVerificationRequired: dto.is_verification_required,
    lastName: dto.last_name,
    locale: dto.locale,
    preferences: toAuthPreferences(dto.preferences),
    role: dto.role,
    timezone: dto.timezone,
    verificationPending: dto.verification_pending,
  }
}

export function toAuthPreferences(dto: AuthPreferencesDto): AuthPreferences {
  return {
    usersSortBy: dto.users_sort_by,
    usersSortDir: dto.users_sort_dir,
  }
}
