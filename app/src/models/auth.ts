export interface AuthDto {
  avatar_url: string | null
  email: string
  email_verified_at: string | null
  first_name: string
  id: number
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
  lastName: string
  locale: string
  role?: string
  timezone: string
  verifiedAt: string | null
  readonly isAvatar: boolean
  readonly isVerified: boolean
}

export function toAuth(dto: AuthDto): Auth {
  return {
    avatarUrl: dto.avatar_url,
    email: dto.email,
    firstName: dto.first_name,
    id: dto.id,
    lastName: dto.last_name,
    locale: dto.locale,
    role: dto.role,
    timezone: dto.timezone,
    verifiedAt: dto.email_verified_at,
    get isAvatar() { return this.avatarUrl !== null },
    get isVerified() { return this.verifiedAt !== null },
  }
}
