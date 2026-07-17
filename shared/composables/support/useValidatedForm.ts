import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { HttpError } from '@shared/plugins/http/client'
import type { ZodRawShape } from 'zod'

interface Options<TShape extends ZodRawShape> {
  rules: TShape
  initial: Record<string, unknown>
  onSubmit: (values: unknown) => Promise<unknown>
  reset?: boolean
}

/**
 * Binds a set of validation rules to an async submit. It owns the form
 * concerns only: field values, validation, and mapping a 422 response
 * back onto the fields. The submit target is passed in, so this never
 * knows a URI. Pending comes from vee-validate, not a hand rolled ref.
 */
export function useValidatedForm<TShape extends ZodRawShape>(options: Options<TShape>) {
  const { rules, initial, onSubmit, reset = false } = options

  const { handleSubmit, setErrors, resetForm, isSubmitting } = useForm({
    validationSchema: toTypedSchema(z.object(rules)),
    initialValues: initial,
  })

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values)
      if (reset) resetForm()
    } catch (err) {
      if (err instanceof HttpError && err.response.status === 422) {
        setErrors((err.response.data as { errors: Record<string, string[]> }).errors)
        return
      }
      throw err
    }
  })

  return { submit, isPending: isSubmitting }
}
