import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { useCreateBookmark, useUpdateBookmark } from '@/composables/api/bookmarks'
import { BookmarkRules } from '@/rules/bookmark'
import type { Bookmark } from '@/models/bookmark'

export function useBookmarkForm(bookmark?: Bookmark, onSuccess?: () => void) {
  const mutation = bookmark
    ? useUpdateBookmark(bookmark.id)
    : useCreateBookmark()

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
