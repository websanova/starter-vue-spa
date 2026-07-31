import type { Interval } from '@/models/plan'

export interface AuthDto {
  avatar_url: string | null
  email: string
  first_name: string
  id: number
  is_on_grace_period: boolean
  is_verification_pending: boolean
  is_verification_required: boolean
  last_name: string
  locale: string
  phone: string | null
  plan: AuthPlanDto | null
  role?: string
  subscription: AuthSubscriptionDto | null
  timezone: string
  verification_pending: string[]
  verification_required: string[]
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
}

export interface Auth {
  avatarUrl: string | null
  email: string
  firstName: string
  id: number
  isOnGracePeriod: boolean
  isVerificationPending: boolean
  isVerificationRequired: boolean
  lastName: string
  locale: string
  phone: string | null
  plan: AuthPlan | null
  role?: string
  subscription: AuthSubscription | null
  timezone: string
  verificationPending: string[]
  verificationRequired: string[]
  readonly isAvatar: boolean
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
}

export function toAuth(dto: AuthDto): Auth {
  return {
    avatarUrl: dto.avatar_url,
    email: dto.email,
    firstName: dto.first_name,
    id: dto.id,
    isOnGracePeriod: dto.is_on_grace_period,
    isVerificationPending: dto.is_verification_pending,
    isVerificationRequired: dto.is_verification_required,
    lastName: dto.last_name,
    locale: dto.locale,
    phone: dto.phone,
    plan: dto.plan ? toAuthPlan(dto.plan) : null,
    role: dto.role,
    subscription: dto.subscription ? toAuthSubscription(dto.subscription) : null,
    timezone: dto.timezone,
    verificationPending: dto.verification_pending,
    verificationRequired: dto.verification_required,
    get isAvatar() { return this.avatarUrl !== null },
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
  }
}
