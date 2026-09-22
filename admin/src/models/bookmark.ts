import { toTag } from '@/models/tag'
import type { Tag, TagDto } from '@/models/tag'

export interface BookmarkDto {
  id: number
  tags: TagDto[]
  title: string
  url: string
}

export interface Bookmark {
  id: number
  tags: Tag[]
  title: string
  url: string
}

export function toBookmark(dto: BookmarkDto): Bookmark {
  return {
    id: dto.id,
    tags: dto.tags.map(toTag),
    title: dto.title,
    url: dto.url,
  }
}
