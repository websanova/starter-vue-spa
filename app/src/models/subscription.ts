export interface SubscriptionSessionDto {
  client_secret: string
}

export interface SubscriptionSession {
  clientSecret: string
}

export type SubscriptionPaymentStatus =
  | 'failed'
  | 'paid'
  | 'requires_action'

export interface SubscriptionPaymentDto {
  client_secret?: string
  status: SubscriptionPaymentStatus
}

export interface SubscriptionPayment {
  clientSecret: string
  status: SubscriptionPaymentStatus
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

/**
 * The secret only comes back on a challenge and the invoice id only on
 * a decline. The id is left off entirely, since there is nothing in the
 * app that settles one.
 */
export function toSubscriptionPayment(dto: SubscriptionPaymentDto): SubscriptionPayment {
  return {
    clientSecret: dto.client_secret ?? '',
    status: dto.status,
  }
}
