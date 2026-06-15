import { http } from "@shared/lib/http"
import type { Bookmark, BookmarkQuery } from "@shared/types/bookmark"

/**
* HTTP for the bookmark resource. The only layer that knows endpoint paths
* exist. Stores and composables call these, never fetch directly.
*/
export const bookmarksApi = {
  list: (params?: BookmarkQuery) => http.get<Bookmark[]>("/bookmarks", { params }),
  get: (id: number) => http.get<Bookmark>(`/bookmarks/${id}`),
  remove: (id: number) => http.delete<void>(`/bookmarks/${id}`),
  favorite: (id: number, value: boolean) => http.patch<Bookmark>(`/bookmarks/${id}/favorite`, { value })
}
