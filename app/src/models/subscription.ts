export interface SubscriptionSessionDto {
  client_secret: string
}

export interface SubscriptionSession {
  clientSecret: string
}

export type SubscriptionPaymentStatus =
  | 'failed'
  | 'requires_action'

export interface SubscriptionPaymentDto {
  client_secret?: string
  status: SubscriptionPaymentStatus
  type: string
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
 * The invoice id only comes back on a decline and there is nothing in
 * the app that settles one, so it is left off until there is.
 */
export function toSubscriptionPayment(dto: SubscriptionPaymentDto): SubscriptionPayment {
  return {
    clientSecret: dto.client_secret ?? '',
    status: dto.status,
  }
}
