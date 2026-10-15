export interface ListMetaDto {
  total: number
}

export interface ListMeta {
  total: number
}

export function toListMeta(dto: ListMetaDto): ListMeta {
  return {
    total: dto.total,
  }
}
