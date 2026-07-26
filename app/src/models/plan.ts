export interface PlanDto {
  id: number
  name: string
  price: number
  interval: string
}

export interface Plan {
  id: number
  name: string
  price: number
  interval: string
}

export function toPlan(dto: PlanDto): Plan {
  return {
    id: dto.id,
    name: dto.name,
    price: dto.price,
    interval: dto.interval,
  }
}
