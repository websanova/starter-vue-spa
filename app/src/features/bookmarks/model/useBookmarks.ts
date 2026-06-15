import { computed, toValue, type MaybeRefOrGetter } from "vue"
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/vue-query"
import { toAction } from "@shared/composables/toAction"
import { bookmarksApi } from "../api/bookmarks"
import type { Bookmark, BookmarkQuery } from "../types"

export const bookmarkKeys = {
  all: ["bookmarks"] as const,
  lists: () => [...bookmarkKeys.all, "list"] as const,
  list: (filters: BookmarkQuery) => [...bookmarkKeys.lists(), filters] as const
}

export function useBookmarks(filters: MaybeRefOrGetter<BookmarkQuery> = {}) {
  const client = useQueryClient()
  const invalidate = () => client.invalidateQueries({ queryKey: bookmarkKeys.lists() })

  const query = useQuery({
    queryKey: computed(() => bookmarkKeys.list(toValue(filters))),
    queryFn: () => bookmarksApi.list(toValue(filters)),
    placeholderData: keepPreviousData
  })

  const create = useMutation({
    mutationFn: bookmarksApi.create,
    onSuccess: invalidate
  })

  const remove = useMutation({
    mutationFn: bookmarksApi.remove,
    onSuccess: invalidate
  })

  const favorite = useMutation({
    mutationFn: (b: Bookmark) => bookmarksApi.favorite(b.id, !b.favorited),
    onSuccess: invalidate
  })

  return {
    bookmarks: computed(() => query.data.value ?? []),
    loading: query.isLoading,
    fetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
    create: toAction(create),
    remove: toAction(remove),
    favorite: toAction(favorite)
  }
}
