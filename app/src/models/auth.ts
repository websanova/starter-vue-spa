export interface AuthDto {
  avatar_url: string | null
  email: string
  email_verified_at: string | null
  first_name: string
  id: number
  last_name: string
  role?: string
}

export interface Auth {
  avatarUrl: string | null
  email: string
  firstName: string
  id: number
  isVerified: boolean
  lastName: string
  role?: string
}

export function toAuth(dto: AuthDto): Auth {
  return {
    avatarUrl: dto.avatar_url,
    email: dto.email,
    firstName: dto.first_name,
    id: dto.id,
    isVerified: dto.email_verified_at !== null,
    lastName: dto.last_name,
    role: dto.role,
  }
}
