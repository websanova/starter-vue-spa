export interface TagDto {
  id: number
  name: string
  slug: string
}

export interface Tag {
  id: number
  name: string
  slug: string
}

export interface TagInput {
  name: string
}

export function toTag(dto: TagDto): Tag {
  return {
    id: dto.id,
    name: dto.name,
    slug: dto.slug,
  }
}
