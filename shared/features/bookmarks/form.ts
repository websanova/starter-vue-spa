import { useValidatedForm } from '@shared/composables/support/useValidatedForm'
import { useCreateBookmark, useUpdateBookmark } from './api'
import { BookmarkRules } from './rules'
import type { Bookmark } from './model'

export function useBookmarkForm(bookmark?: Bookmark) {
  const mutation = bookmark
    ? useUpdateBookmark(bookmark.id)
    : useCreateBookmark()

  return useValidatedForm({
    rules: {
      title: BookmarkRules.title(),
      url: BookmarkRules.url(),
    },
    initial: {
      title: bookmark?.title ?? '',
      url: bookmark?.url ?? '',
    },
    onSubmit: mutation.mutateAsync,
    reset: !bookmark,
  })
}
