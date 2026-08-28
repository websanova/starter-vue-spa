export interface SubscriptionSessionDto {
  client_secret: string
}

export interface SubscriptionSession {
  clientSecret: string
}

export type SubscriptionStatus =
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'trialing'
  | 'unpaid'

export function toSubscriptionSession(dto: SubscriptionSessionDto): SubscriptionSession {
  return {
    clientSecret: dto.client_secret,
  }
}
