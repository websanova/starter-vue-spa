import { ref } from 'vue'
import { useFileDialog } from '@vueuse/core'
import { HttpError } from '@shared/plugins/http/client'

interface Options {
  accept: string
  maxSize: number
  field?: string
  messages: {
    invalidType: () => string
    tooLarge: () => string
    failed: () => string
  }
  onSubmit: (file: File) => Promise<unknown>
  onSuccess?: () => void
}

/**
 * Reusable single file upload. Opens the file dialog, validates the
 * picked file against accept and maxSize, hands it to onSubmit for the
 * upload, and exposes pending and error state for the view to render.
 *
 * The caller supplies messages for the client side rejections and the
 * upload failure fallback. A server 422 message for field wins over
 * the failed fallback when present.
 */
export function useFileUpload(options: Options) {
  const { accept, maxSize, field = 'file', messages, onSubmit, onSuccess } = options

  const isPending = ref(false)
  const error = ref<string | null>(null)

  const { open, onChange, reset } = useFileDialog({ accept, multiple: false })

  onChange(async (files) => {
    const file = files?.[0]
    if (!file) {
      return
    }

    error.value = null

    if (!matchesAccept(file, accept)) {
      error.value = messages.invalidType()
      reset()
      return
    }

    if (file.size > maxSize) {
      error.value = messages.tooLarge()
      reset()
      return
    }

    isPending.value = true

    try {
      await onSubmit(file)
      onSuccess?.()
    } catch (err) {
      let message: string | undefined
      if (err instanceof HttpError && err.response.status === 422) {
        message = (err.response.data as { errors: Record<string, string[]> }).errors[field]?.[0]
      }
      error.value = message ?? messages.failed()
    } finally {
      isPending.value = false
      reset()
    }
  })

  return { open, isPending, error }
}

/**
 * Matches a file against an accept string, supporting explicit mime
 * types and wildcard groups such as image/*. The dialog accept attribute
 * is only a hint, so the same string is enforced here.
 */
function matchesAccept(file: File, accept: string): boolean {
  const types = accept.split(',').map((t) => t.trim()).filter(Boolean)
  if (!types.length) {
    return true
  }

  return types.some((type) => {
    if (type.endsWith('/*')) {
      return file.type.startsWith(type.slice(0, -1))
    }

    return file.type === type
  })
}
