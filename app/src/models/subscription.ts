export type SubscriptionStatus =
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'trialing'
  | 'unpaid'

export interface CheckoutSessionDto {
  client_secret: string
}

export interface CheckoutSession {
  clientSecret: string
}

export function toCheckoutSession(dto: CheckoutSessionDto): CheckoutSession {
  return {
    clientSecret: dto.client_secret,
  }
}
