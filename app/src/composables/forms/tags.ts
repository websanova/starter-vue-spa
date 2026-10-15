import { useMutationAction } from '@shared/composables/primitives/useMutationAction'
import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { useCreateTag, useDeleteTag, useUpdateTag } from '@/composables/api/tags'
import { TagRules } from '@/rules/tag'
import type { Tag } from '@/models/tag'

function tagForm(mutation: ReturnType<typeof useCreateTag>, onSuccess?: () => void, tag?: Tag) {
  return {
    ...useValidatedForm({
      rules: {
        name: TagRules.name(),
      },
      initial: {
        name: tag?.name ?? '',
      },
      onSubmit: mutation.mutateAsync,
      onSuccess,
      reset: !tag,
    }),
    error: useMutationError(mutation),
  }
}

export function useCreateTagForm(onSuccess?: () => void) {
  return tagForm(useCreateTag(), onSuccess)
}

export function useUpdateTagForm(tag: Tag, onSuccess?: () => void) {
  return tagForm(useUpdateTag(tag.id), onSuccess, tag)
}

export function useDeleteTagForm(tag: Tag, onSuccess?: () => void) {
  const mutation = useDeleteTag()

  return {
    ...useMutationAction({
      onSubmit: () => mutation.mutateAsync(tag.id),
      onSuccess,
    }),
    error: useMutationError(mutation),
  }
}
