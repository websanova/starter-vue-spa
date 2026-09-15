export interface PaginationMetaDto {
  current_page: number
  per_page: number
  total: number
}

export interface PaginationMeta {
  currentPage: number
  perPage: number
  total: number
}

export function toPaginationMeta(dto: PaginationMetaDto): PaginationMeta {
  return {
    currentPage: dto.current_page,
    perPage: dto.per_page,
    total: dto.total,
  }
}
