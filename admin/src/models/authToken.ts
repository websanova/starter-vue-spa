export interface AuthTokenDto {
  abilities: string[]
  created_at: string
  expires_at: string | null
  id: number
  last_used_at: string | null
  name: string
}

export interface AuthToken {
  abilities: string[]
  createdAt: string
  expiresAt: string | null
  id: number
  lastUsedAt: string | null
  name: string
}

export function toAuthToken(dto: AuthTokenDto): AuthToken {
  return {
    abilities: dto.abilities,
    createdAt: dto.created_at,
    expiresAt: dto.expires_at,
    id: dto.id,
    lastUsedAt: dto.last_used_at,
    name: dto.name,
  }
}
