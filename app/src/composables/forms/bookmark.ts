import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { useCreateBookmark, useUpdateBookmark } from '@/composables/api/bookmarks'
import { BookmarkRules } from '@/rules/bookmark'
import type { Bookmark } from '@/models/bookmark'

export function useBookmarkForm(bookmark?: Bookmark, onSuccess?: () => void) {
  const mutation = bookmark
    ? useUpdateBookmark(bookmark.id)
    : useCreateBookmark()

  const form = useValidatedForm({
    rules: {
      title: BookmarkRules.title(),
      url: BookmarkRules.url(),
      description: BookmarkRules.description(),
    },
    initial: {
      title: bookmark?.title ?? '',
      url: bookmark?.url ?? '',
      description: bookmark?.description ?? '',
    },
    onSubmit: mutation.mutateAsync,
    onSuccess,
    reset: !bookmark,
  })

  function reset() {
    form.resetForm()
    mutation.reset()
  }

  return {
    ...form,
    error: useMutationError(mutation),
    reset,
  }
}
