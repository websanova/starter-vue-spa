import { http } from "@shared/lib/http"
import type { Bookmark, BookmarkQuery } from "@/types/bookmark"

/**
* Wire shape for the app bookmark endpoint. Never leaves this file. Nothing
* downstream depends on the API field names; the mapper converts it to the
* domain type.
*/
interface BookmarkDto {
  id: number
  title: string
  url: string
  is_favorited: boolean
  category_id: number | null
}

function toBookmark(dto: BookmarkDto): Bookmark {
  return {
    id: dto.id,
    title: dto.title,
    url: dto.url,
    favorited: dto.is_favorited,
    categoryId: dto.category_id
  }
}

/**
* HTTP for the app bookmark resource. The only layer that knows endpoint paths
* and the wire shape exist. Returns domain types, never DTOs.
*/
export const bookmarksApi = {
  list: async (params?: BookmarkQuery) => (await http.get<BookmarkDto[]>("/bookmarks", { params })).map(toBookmark),
  get: async (id: number) => toBookmark(await http.get<BookmarkDto>(`/bookmarks/${id}`)),
  remove: (id: number) => http.delete<void>(`/bookmarks/${id}`),
  favorite: async (id: number, value: boolean) => toBookmark(await http.patch<BookmarkDto>(`/bookmarks/${id}/favorite`, { value }))
}
