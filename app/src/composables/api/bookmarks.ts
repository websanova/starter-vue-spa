import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toBookmark } from '@/models/bookmark'
import { toPaginationMeta } from '@shared/models/pagination'
import type { BookmarkDto, BookmarkFilters, BookmarkInput } from '@/models/bookmark'
import type { PaginationMetaDto } from '@shared/models/pagination'
import type { Ref } from 'vue'

const key = ['bookmarks']

export function useBookmarks(filters: Ref<BookmarkFilters>) {
  return useQuery({
    queryKey: [...key, filters],
    queryFn: async () => {
      const { data, meta } = await useHttp().get<{ data: BookmarkDto[], meta: PaginationMetaDto }>('bookmarks', {
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

export function useCreateBookmark() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: BookmarkInput) => useHttp().post('bookmarks', input),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  })
}

export function useUpdateBookmark(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: BookmarkInput) => useHttp().patch(`bookmarks/${id}`, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  })
}

export function useDeleteBookmark() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => useHttp().delete(`bookmarks/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  })
}
