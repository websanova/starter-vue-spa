export interface AuthDto {
  avatar_url: string | null
  email: string
  first_name: string
  id: number
  is_verification_required: boolean
  last_name: string
  locale: string
  role?: string
  timezone: string
}

export interface Auth {
  avatarUrl: string | null
  email: string
  firstName: string
  id: number
  isVerificationRequired: boolean
  lastName: string
  locale: string
  role?: string
  timezone: string
  readonly isAvatar: boolean
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
    role: dto.role,
    timezone: dto.timezone,
    get isAvatar() { return this.avatarUrl !== null },
  }
}
