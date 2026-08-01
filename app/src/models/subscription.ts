export type SubscriptionStatus =
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'trialing'
  | 'unpaid'

export interface SubscriptionCheckoutDto {
  client_secret: string
}

export interface SubscriptionCheckout {
  clientSecret: string
}

export function toSubscriptionCheckout(dto: SubscriptionCheckoutDto): SubscriptionCheckout {
  return {
    clientSecret: dto.client_secret,
  }
}
