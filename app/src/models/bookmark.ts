import { toTag } from '@/models/tag'
import type { Tag, TagDto } from '@/models/tag'

export type BookmarkView = 'expanded' | 'condensed'

export interface BookmarkDto {
  id: number
  is_favorited: boolean
  tags: TagDto[]
  title: string
  url: string
}

export interface Bookmark {
  id: number
  isFavorited: boolean
  tags: Tag[]
  title: string
  url: string
}

export interface BookmarkInput {
  tag_ids?: number[]
  title: string
  url: string
}

export function toBookmark(dto: BookmarkDto): Bookmark {
  return {
    id: dto.id,
    isFavorited: dto.is_favorited,
    tags: dto.tags.map(toTag),
    title: dto.title,
    url: dto.url,
  }
}
