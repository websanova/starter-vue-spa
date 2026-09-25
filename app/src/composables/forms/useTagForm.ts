import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { useCreateTag, useUpdateTag } from '@/composables/api/tags'
import { TagRules } from '@/rules/tag'
import type { Tag } from '@/models/tag'

export function useTagForm(tag?: Tag, onSuccess?: () => void) {
  const mutation = tag
    ? useUpdateTag(tag.id)
    : useCreateTag()

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
