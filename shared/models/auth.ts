import type { User } from './user'

/**
 * Wire shape returned by the auth profile endpoint. Stays inside the model layer; nothing downstream depends on these field names.
 */
export interface AuthDto {
  id: number
  name: string
  email: string
  role: string
  email_verified_at: string | null
}

/**
 * Authenticated identity held in app state. Distinct from the general user resource since it carries auth context rather than list detail.
 */
export interface Auth {
  id: number
  name: string
  email: string
  role: string
  isVerified: boolean
}

/**
 * Maps the auth endpoint payload to the domain identity.
 */
export function toAuth(dto: AuthDto): Auth {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    role: dto.role,
    isVerified: dto.email_verified_at !== null,
  }
}

/**
 * Derives the general user resource from an authenticated identity.
 */
export function toUser(auth: Auth): User {
  return {
    id: auth.id,
    name: auth.name,
    email: auth.email,
  }
}
