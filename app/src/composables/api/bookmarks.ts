import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toBookmark } from '@/models/bookmark'
import { toPaginationMeta } from '@shared/models/pagination'
import type { BookmarkDto, BookmarkInput } from '@/models/bookmark'
import type { PaginationMetaDto } from '@shared/models/pagination'
import type { Ref } from 'vue'

const key = ['bookmarks']

export function useBookmarks(page: Ref<number>) {
  return useQuery({
    queryKey: [...key, { page }],
    queryFn: async () => {
      const { data, meta } = await useHttp().get<{ data: BookmarkDto[], meta: PaginationMetaDto }>('bookmarks', {
        params: { page: page.value },
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
