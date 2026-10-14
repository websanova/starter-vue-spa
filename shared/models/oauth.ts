export interface OAuthConsentDto {
  client_name: string
  scope: string
}

export interface OAuthConsent {
  clientName: string
  scope: string
}

export function toOAuthConsent(dto: OAuthConsentDto): OAuthConsent {
  return {
    clientName: dto.client_name,
    scope: dto.scope,
  }
}
