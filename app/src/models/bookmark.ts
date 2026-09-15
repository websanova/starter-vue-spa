import { toTag } from '@/models/tag'
import type { Tag, TagDto } from '@/models/tag'

export interface BookmarkDto {
  description: string | null
  id: number
  tags: TagDto[]
  title: string
  url: string
}

export interface Bookmark {
  description: string | null
  id: number
  tags: Tag[]
  title: string
  url: string
}

export interface BookmarkInput {
  description?: string
  title: string
  url: string
}

export function toBookmark(dto: BookmarkDto): Bookmark {
  return {
    description: dto.description,
    id: dto.id,
    tags: dto.tags.map(toTag),
    title: dto.title,
    url: dto.url,
  }
}
