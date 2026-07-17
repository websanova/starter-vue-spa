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

/**
 * Local shorthand for a fieldless action that hits an endpoint and then
 * invalidates the bookmarks list. Keeps the named action hooks below to
 * a single line each without introducing a cross domain helper.
 */
function action(fn: (id: number) => Promise<unknown>) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: fn,
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  })
}

export const useDeleteBookmark = () => action((id) => useHttp().delete(`bookmarks/${id}`))
export const useArchiveBookmark = () => action((id) => useHttp().post(`bookmarks/${id}/archive`))
export const useFavoriteBookmark = () => action((id) => useHttp().post(`bookmarks/${id}/favorite`))
