export type Interval = 'monthly' | 'yearly'

export type FeatureValue = string | number | boolean | null

export interface PriceDto {
  amount: number
  currency: string
}

export interface PlanDto {
  features: Record<string, FeatureValue>
  id: number
  name: string
  prices: Partial<Record<Interval, PriceDto>>
  slug: string
  tier: number
}

export interface Price {
  amount: number
  currency: string
}

export interface Plan {
  features: Record<string, FeatureValue>
  id: number
  name: string
  prices: Partial<Record<Interval, Price>>
  slug: string
  tier: number
}

export function toPlan(dto: PlanDto): Plan {
  return {
    features: dto.features,
    id: dto.id,
    name: dto.name,
    prices: dto.prices,
    slug: dto.slug,
    tier: dto.tier,
  }
}
