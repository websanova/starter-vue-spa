export interface AuthDto {
  avatar_url: string
  email: string
  first_name: string
  id: number
  last_name: string
  role?: string
}

export interface Auth {
  avatarUrl: string
  email: string
  firstName: string
  id: number
  lastName: string
  role?: string
}

export function toAuth(dto: AuthDto): Auth {
  return {
    avatarUrl: dto.avatar_url,
    email: dto.email,
    firstName: dto.first_name,
    id: dto.id,
    lastName: dto.last_name,
    role: dto.role,
  }
}
