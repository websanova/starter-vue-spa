import { ref } from 'vue'
import { useFileDialog } from '@vueuse/core'
import { useHttp } from '@shared/plugins/http'
import { useI18n } from '@shared/plugins/i18n'
import { validationMessage } from '@shared/lib/validationMessage'

interface Options<T> {
  url: string
  field: string
  accept: string
  maxSize: number
  i18nKey?: string
  onSuccess?: (data: T) => void
}

/**
 * Reusable single file upload. Opens the file dialog, validates the
 * picked file against accept and maxSize, posts it as multipart form
 * data, and exposes pending and error state for the view to render. All
 * messages resolve from the i18nKey namespace.
 *
 * Expects these keys under i18nKey: invalid_type, too_large, failed.
 */
export function useFileUpload<T>(options: Options<T>) {
  const { url, field, accept, maxSize, i18nKey = 'features.form.upload', onSuccess } = options

  const i18n = useI18n()
  const http = useHttp()

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
      error.value = i18n.t(`${i18nKey}.invalid_type`)
      reset()
      return
    }

    if (file.size > maxSize) {
      error.value = i18n.t(`${i18nKey}.too_large`)
      reset()
      return
    }

    const form = new FormData()
    form.append(field, file)

    isPending.value = true

    try {
      const data = await http.post<T>(url, form)
      onSuccess?.(data)
    } catch (err) {
      error.value = validationMessage(err) ?? i18n.t(`${i18nKey}.failed`)
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
