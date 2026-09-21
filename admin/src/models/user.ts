import { toPlan } from '@/models/plan'
import type { Plan, PlanDto } from '@/models/plan'

export interface UserDto {
  avatar_url: string | null
  created_at: string
  deleted_at: string | null
  email: string
  email_verified_at: string | null
  first_name: string
  id: number
  is_on_grace_period: boolean
  is_on_trial: boolean
  is_password_reset_required: boolean
  is_subscribed: boolean
  last_active_at: string | null
  last_name: string
  locale: string
  phone: string | null
  phone_verified_at: string | null
  plan: PlanDto
  role: string | null
  timezone: string
  trial_ends_at: string | null
  updated_at: string
}

export interface User {
  avatarUrl: string | null
  createdAt: string
  deletedAt: string | null
  email: string
  emailVerifiedAt: string | null
  firstName: string
  id: number
  isOnGracePeriod: boolean
  isOnTrial: boolean
  isPasswordResetRequired: boolean
  isSubscribed: boolean
  lastActiveAt: string | null
  lastName: string
  locale: string
  phone: string | null
  phoneVerifiedAt: string | null
  plan: Plan
  role: string | null
  timezone: string
  trialEndsAt: string | null
  updatedAt: string
}

export type UserFilters = {
  page?: number
  search?: string
}

export function toUser(dto: UserDto): User {
  return {
    avatarUrl: dto.avatar_url,
    createdAt: dto.created_at,
    deletedAt: dto.deleted_at,
    email: dto.email,
    emailVerifiedAt: dto.email_verified_at,
    firstName: dto.first_name,
    id: dto.id,
    isOnGracePeriod: dto.is_on_grace_period,
    isOnTrial: dto.is_on_trial,
    isPasswordResetRequired: dto.is_password_reset_required,
    isSubscribed: dto.is_subscribed,
    lastActiveAt: dto.last_active_at,
    lastName: dto.last_name,
    locale: dto.locale,
    phone: dto.phone,
    phoneVerifiedAt: dto.phone_verified_at,
    plan: toPlan(dto.plan),
    role: dto.role,
    timezone: dto.timezone,
    trialEndsAt: dto.trial_ends_at,
    updatedAt: dto.updated_at,
  }
}
