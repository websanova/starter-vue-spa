import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { useCreateTag } from '@/composables/api/tags'
import { TagRules } from '@/rules/tag'

export function useTagForm(onSuccess?: () => void) {
  const mutation = useCreateTag()

  const form = useValidatedForm({
    rules: {
      name: TagRules.name(),
    },
    initial: {
      name: '',
    },
    onSubmit: mutation.mutateAsync,
    onSuccess,
    reset: true,
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
