import { http } from "@shared/lib/http"
import type { AdminBookmark, AdminBookmarkQuery } from "@/types/bookmark"

/**
* Wire shape for the admin bookmark endpoint. Same base fields as the app plus
* moderation data. Self-contained; the admin service owns its own contract and
* does not share the app DTO.
*/
interface AdminBookmarkDto {
  id: number
  title: string
  url: string
  is_favorited: boolean
  category_id: number | null
  owner_id: number
  created_at: string
}

function toAdminBookmark(dto: AdminBookmarkDto): AdminBookmark {
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
  list: async (params?: AdminBookmarkQuery) => (await http.get<AdminBookmarkDto[]>("/admin/bookmarks", { params })).map(toAdminBookmark),
  get: async (id: number) => toAdminBookmark(await http.get<AdminBookmarkDto>(`/admin/bookmarks/${id}`)),
  remove: (id: number) => http.delete<void>(`/admin/bookmarks/${id}`)
}
