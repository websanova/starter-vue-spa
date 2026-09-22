import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toBookmark } from '@/models/bookmark'
import { toPaginationMeta } from '@shared/models/pagination'
import type { BookmarkParams } from '@/composables/params/bookmarks'
import type { BookmarkDto } from '@/models/bookmark'
import type { PaginationMetaDto } from '@shared/models/pagination'

const key = ['bookmarks']

export function useUserBookmarks(userId: number, params: BookmarkParams) {
  return useQuery({
    queryKey: [...key, userId, params],
    queryFn: async () => {
      const { data, meta } = await useHttp().get<{ data: BookmarkDto[], meta: PaginationMetaDto }>(`users/${userId}/bookmarks`, {
        params: {
          page: params.page.value,
          search: params.search.value,
        },
      })
      return {
        bookmarks: data.map(toBookmark),
        meta: toPaginationMeta(meta),
      }
    },
    placeholderData: keepPreviousData,
  })
}
