/**
 * Wire shape returned by the auth profile endpoint. Stays inside the model layer; nothing downstream depends on these field names.
 */
export interface AuthDto {
  avatar_url: string
  email: string
  email_verified_at: string | null
  first_name: string
  id: number
  last_name: string
  role?: string
}

/**
 * Authenticated identity held in app state. Distinct from the general user resource since it carries auth context rather than list detail.
 */
export interface Auth {
  avatarUrl: string
  email: string
  firstName: string
  id: number
  isVerified: boolean
  lastName: string
  role?: string
}

/**
 * Maps the auth endpoint payload to the domain identity.
 */
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

