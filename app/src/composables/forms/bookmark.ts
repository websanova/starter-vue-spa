import { useValidatedForm } from '@shared/composables/support/useValidatedForm'
import { useCreateBookmark, useUpdateBookmark } from '@/composables/api/bookmarks'
import { BookmarkRules } from '@/rules/bookmark'
import type { Bookmark } from '@/models/bookmark'

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
