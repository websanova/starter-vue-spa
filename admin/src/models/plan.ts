export interface PlanDto {
  id: number
  name: string
}

export interface Plan {
  id: number
  name: string
}

export type PlanFilters = {
  page?: number
}

export function toPlan(dto: PlanDto): Plan {
  return {
    id: dto.id,
    name: dto.name,
  }
}
