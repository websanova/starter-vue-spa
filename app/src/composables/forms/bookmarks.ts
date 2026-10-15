import { useMutationAction } from '@shared/composables/primitives/useMutationAction'
import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { useCreateBookmark, useDeleteBookmark, useUpdateBookmark } from '@/composables/api/bookmarks'
import { BookmarkRules } from '@/rules/bookmark'
import type { Bookmark } from '@/models/bookmark'

function bookmarkForm(mutation: ReturnType<typeof useCreateBookmark>, onSuccess?: () => void, bookmark?: Bookmark) {
  return {
    ...useValidatedForm({
      rules: {
        title: BookmarkRules.title(),
        url: BookmarkRules.url(),
        tag_ids: BookmarkRules.tagIds(),
      },
      initial: {
        title: bookmark?.title ?? '',
        url: bookmark?.url ?? '',
        tag_ids: bookmark?.tags.map((tag) => tag.id) ?? [],
      },
      onSubmit: mutation.mutateAsync,
      onSuccess,
      reset: !bookmark,
    }),
    error: useMutationError(mutation),
  }
}

export function useCreateBookmarkForm(onSuccess?: () => void) {
  return bookmarkForm(useCreateBookmark(), onSuccess)
}

export function useUpdateBookmarkForm(bookmark: Bookmark, onSuccess?: () => void) {
  return bookmarkForm(useUpdateBookmark(bookmark.id), onSuccess, bookmark)
}

export function useDeleteBookmarkForm(bookmark: Bookmark, onSuccess?: () => void) {
  const mutation = useDeleteBookmark()

  return {
    ...useMutationAction({
      onSubmit: () => mutation.mutateAsync(bookmark.id),
      onSuccess,
    }),
    error: useMutationError(mutation),
  }
}
