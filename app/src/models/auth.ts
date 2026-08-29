import type { Interval } from '@/models/plan'
import type { SubscriptionStatus } from '@/models/subscription'

export interface AuthDto {
  avatar_url: string | null
  billing_address: AuthBillingAddressDto | null
  email: string
  first_name: string
  has_payment_method: boolean
  id: number
  is_on_grace_period: boolean
  is_on_trial: boolean
  is_subscribed: boolean
  is_verification_pending: boolean
  is_verification_required: boolean
  last_name: string
  locale: string
  payment_method: AuthPaymentMethodDto | null
  phone: string | null
  plan: AuthPlanDto | null
  role?: string
  subscription: AuthSubscriptionDto | null
  timezone: string
  trial: AuthTrialDto | null
  verification_pending: string[]
  verification_required: string[]
}

export interface AuthBillingAddressDto {
  city: string
  country: string
  line1: string
  line2: string | null
  name: string | null
  postal_code: string
  state: string | null
}

export interface AuthPaymentMethodDto {
  brand: string
  last_four: string
}

export interface AuthPlanDto {
  id: number
  name: string
  slug: string
  tier: number
}

export interface AuthSubscriptionDto {
  ends_at: string | null
  interval: Interval
  status: SubscriptionStatus
}

export interface AuthTrialDto {
  ends_at: string | null
}

export interface Auth {
  avatarUrl: string | null
  billingAddress: AuthBillingAddress | null
  email: string
  firstName: string
  hasPaymentMethod: boolean
  id: number
  isOnGracePeriod: boolean
  isOnTrial: boolean
  isSubscribed: boolean
  isVerificationPending: boolean
  isVerificationRequired: boolean
  lastName: string
  locale: string
  paymentMethod: AuthPaymentMethod | null
  phone: string | null
  plan: AuthPlan | null
  role?: string
  subscription: AuthSubscription | null
  timezone: string
  trial: AuthTrial | null
  verificationPending: string[]
  verificationRequired: string[]
  readonly isAvatar: boolean
  readonly isBillingAddress: boolean
}

export interface AuthBillingAddress {
  city: string
  country: string
  line1: string
  line2: string | null
  name: string | null
  postalCode: string
  state: string | null
}

export interface AuthPaymentMethod {
  brand: string
  lastFour: string
}

export interface AuthPlan {
  id: number
  name: string
  slug: string
  tier: number
}

export interface AuthSubscription {
  endsAt: string | null
  interval: Interval
  status: SubscriptionStatus
}

export interface AuthTrial {
  endsAt: string | null
}

export function toAuth(dto: AuthDto): Auth {
  return {
    avatarUrl: dto.avatar_url,
    billingAddress: dto.billing_address ? toAuthBillingAddress(dto.billing_address) : null,
    email: dto.email,
    firstName: dto.first_name,
    hasPaymentMethod: dto.has_payment_method,
    id: dto.id,
    isOnGracePeriod: dto.is_on_grace_period,
    isOnTrial: dto.is_on_trial,
    isSubscribed: dto.is_subscribed,
    isVerificationPending: dto.is_verification_pending,
    isVerificationRequired: dto.is_verification_required,
    lastName: dto.last_name,
    locale: dto.locale,
    paymentMethod: dto.payment_method ? toAuthPaymentMethod(dto.payment_method) : null,
    phone: dto.phone,
    plan: dto.plan ? toAuthPlan(dto.plan) : null,
    role: dto.role,
    subscription: dto.subscription ? toAuthSubscription(dto.subscription) : null,
    timezone: dto.timezone,
    trial: dto.trial ? toAuthTrial(dto.trial) : null,
    verificationPending: dto.verification_pending,
    verificationRequired: dto.verification_required,
    get isAvatar() { return this.avatarUrl !== null },
    get isBillingAddress() { return this.billingAddress !== null },
  }
}

export function toAuthBillingAddress(dto: AuthBillingAddressDto): AuthBillingAddress {
  return {
    city: dto.city,
    country: dto.country,
    line1: dto.line1,
    line2: dto.line2,
    name: dto.name,
    postalCode: dto.postal_code,
    state: dto.state,
  }
}

export function toAuthPaymentMethod(dto: AuthPaymentMethodDto): AuthPaymentMethod {
  return {
    brand: dto.brand,
    lastFour: dto.last_four,
  }
}

export function toAuthPlan(dto: AuthPlanDto): AuthPlan {
  return {
    id: dto.id,
    name: dto.name,
    slug: dto.slug,
    tier: dto.tier,
  }
}

export function toAuthSubscription(dto: AuthSubscriptionDto): AuthSubscription {
  return {
    endsAt: dto.ends_at,
    interval: dto.interval,
    status: dto.status,
  }
}

export function toAuthTrial(dto: AuthTrialDto): AuthTrial {
  return {
    endsAt: dto.ends_at,
  }
}
