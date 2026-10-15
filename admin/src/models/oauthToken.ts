export interface OAuthTokenDto {
  client_id: string
  client_name: string
  created_at: string
  expires_at: string | null
  id: string
  scopes: string[]
}

export interface OAuthToken {
  clientId: string
  clientName: string
  createdAt: string
  expiresAt: string | null
  id: string
  scopes: string[]
}

export function toOAuthToken(dto: OAuthTokenDto): OAuthToken {
  return {
    clientId: dto.client_id,
    clientName: dto.client_name,
    createdAt: dto.created_at,
    expiresAt: dto.expires_at,
    id: dto.id,
    scopes: dto.scopes,
  }
}
