import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toBookmark } from '@/models/bookmark'
import { toPaginationMeta } from '@shared/models/pagination'
import type { BookmarkDto, BookmarkFilters } from '@/models/bookmark'
import type { PaginationMetaDto } from '@shared/models/pagination'
import type { Ref } from 'vue'

const key = ['bookmarks']

export function useUserBookmarks(userId: number, filters: Ref<BookmarkFilters>) {
  return useQuery({
    queryKey: [...key, userId, filters],
    queryFn: async () => {
      const { data, meta } = await useHttp().get<{ data: BookmarkDto[], meta: PaginationMetaDto }>(`users/${userId}/bookmarks`, {
        params: filters.value,
      })
      return {
        bookmarks: data.map(toBookmark),
        meta: toPaginationMeta(meta),
      }
    },
    placeholderData: keepPreviousData,
  })
}
