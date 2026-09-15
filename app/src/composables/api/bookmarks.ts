import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toBookmark } from '@/models/bookmark'
import type { BookmarkDto, BookmarkInput } from '@/models/bookmark'

const key = ['bookmarks']

export function useBookmarks() {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data } = await useHttp().get<{ data: BookmarkDto[] }>('bookmarks')
      return data.map(toBookmark)
    },
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
