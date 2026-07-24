export interface AuthDto {
  avatar_url: string | null
  email: string
  first_name: string
  id: number
  is_verification_pending: boolean
  is_verification_required: boolean
  last_name: string
  locale: string
  phone: string | null
  role?: string
  timezone: string
  verification_pending: string[]
  verification_required: string[]
}

export interface Auth {
  avatarUrl: string | null
  email: string
  firstName: string
  id: number
  isVerificationPending: boolean
  isVerificationRequired: boolean
  lastName: string
  locale: string
  phone: string | null
  role?: string
  timezone: string
  verificationPending: string[]
  verificationRequired: string[]
  readonly isAvatar: boolean
}

export function toAuth(dto: AuthDto): Auth {
  return {
    avatarUrl: dto.avatar_url,
    email: dto.email,
    firstName: dto.first_name,
    id: dto.id,
    isVerificationPending: dto.is_verification_pending,
    isVerificationRequired: dto.is_verification_required,
    lastName: dto.last_name,
    locale: dto.locale,
    phone: dto.phone,
    role: dto.role,
    timezone: dto.timezone,
    verificationPending: dto.verification_pending,
    verificationRequired: dto.verification_required,
    get isAvatar() { return this.avatarUrl !== null },
  }
}
