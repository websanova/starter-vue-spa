export interface BookmarkDto {
  id: number
  title: string
  url: string
}

export interface Bookmark {
  id: number
  title: string
  url: string
}

export interface BookmarkInput {
  title: string
  url: string
}

export function toBookmark(dto: BookmarkDto): Bookmark {
  return {
    id: dto.id,
    title: dto.title,
    url: dto.url,
  }
}
