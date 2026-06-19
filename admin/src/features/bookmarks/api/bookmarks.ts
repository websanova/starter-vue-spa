import { http } from "@core/lib/http"
import type { Bookmark, BookmarkQuery } from "../types"

/**
* Wire shape for the admin bookmark endpoint. Same base fields as the app plus
* moderation data. Self-contained; the admin service owns its own contract and
* does not share the app DTO.
*/
interface BookmarkDto {
  id: number
  title: string
  url: string
  is_favorited: boolean
  category_id: number | null
  owner_id: number
  created_at: string
}

function toBookmark(dto: BookmarkDto): Bookmark {
  return {
    id: dto.id,
    title: dto.title,
    url: dto.url,
    favorited: dto.is_favorited,
    categoryId: dto.category_id,
    ownerId: dto.owner_id,
    createdAt: new Date(dto.created_at)
  }
}

/**
* HTTP for the admin bookmark resource. Hits the admin route group and returns
* the admin domain type.
*/
export const bookmarksApi = {
  list: async (params?: BookmarkQuery) => (await http.get<BookmarkDto[]>("/admin/bookmarks", { params })).map(toBookmark),
  get: async (id: number) => toBookmark(await http.get<BookmarkDto>(`/admin/bookmarks/${id}`)),
  remove: (id: number) => http.delete<void>(`/admin/bookmarks/${id}`)
}
