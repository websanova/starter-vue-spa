export type SubscriptionStatus =
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'trialing'
  | 'unpaid'

export type IntentType = 'payment' | 'setup'

export interface SubscriptionIntentDto {
  client_secret: string
  type: IntentType
}

export interface SubscriptionIntent {
  clientSecret: string
  type: IntentType
}

export function toSubscriptionIntent(dto: SubscriptionIntentDto): SubscriptionIntent {
  return {
    clientSecret: dto.client_secret,
    type: dto.type,
  }
}
