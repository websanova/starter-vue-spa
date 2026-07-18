import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { HttpError } from '@shared/plugins/http/client'
import type { ZodObject, ZodRawShape, ZodTypeAny } from 'zod'

interface Options<TShape extends ZodRawShape> {
  rules: TShape
  initial: z.infer<ZodObject<TShape>>
  onSubmit: (values: z.infer<ZodObject<TShape>>) => Promise<unknown>
  onSuccess?: () => void
  refine?: (schema: ZodObject<TShape>) => ZodTypeAny
  reset?: boolean
}

/**
 * Binds a set of validation rules to an async submit. It owns the form
 * concerns only: field values, validation, and mapping a 422 response
 * back onto the fields. The submit target is passed in, so this never
 * knows a URI. Pending comes from vee-validate, not a hand rolled ref.
 */
export function useValidatedForm<TShape extends ZodRawShape>(options: Options<TShape>) {
  type TData = z.infer<ZodObject<TShape>>

  const { rules, initial, onSubmit, onSuccess, refine, reset = false } = options

  const baseSchema = z.object(rules)

  const { handleSubmit, setErrors, resetForm, isSubmitting } = useForm<TData>({
    validationSchema: toTypedSchema(refine ? refine(baseSchema) : baseSchema),
    initialValues: initial as never
  })

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values)
      if (reset) resetForm()
      onSuccess?.()
    } catch (err) {
      if (err instanceof HttpError && err.response.status === 422) {
        setErrors((err.response.data as { errors: Parameters<typeof setErrors>[0] }).errors)
        return
      }
      throw err
    }
  })

  return { submit, isPending: isSubmitting }
}
