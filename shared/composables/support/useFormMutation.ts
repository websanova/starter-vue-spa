import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/vue-query'
import { HttpError } from '@shared/plugins/http/client'
import type { ZodRawShape, ZodObject } from 'zod'

interface Options<TShape extends ZodRawShape> {
  rules: TShape
  onSubmit: (data: z.infer<ZodObject<TShape>>) => Promise<unknown>
  fields?: Partial<Record<keyof TShape, unknown>>
  reset?: boolean
}

export function useFormMutation<TShape extends ZodRawShape>(options: Options<TShape>) {
  type TData = z.infer<ZodObject<TShape>>

  const { rules, onSubmit, fields = {}, reset = false } = options

  const initialValues = Object.fromEntries(
    Object.keys(rules).map((key) => [key, (fields as Record<string, unknown>)[key] ?? ''])
  )

  const { handleSubmit, setErrors, resetForm } = useForm({
    validationSchema: toTypedSchema(z.object(rules)),
    initialValues,
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: onSubmit,
  })

  const submit = handleSubmit(async (values) => {
    try {
      await mutateAsync(values as TData)
      if (reset) resetForm()
    } catch (err) {
      if (err instanceof HttpError && err.response.status === 422) {
        const body = err.response.data as { errors: Record<string, string[]> }
        setErrors(Object.fromEntries(Object.entries(body.errors).map(([f, m]) => [f, m])))
        return
      }
      throw err
    }
  })

  return { submit, isPending }
}
