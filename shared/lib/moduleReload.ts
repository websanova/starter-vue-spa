import { useRouter } from '@shared/plugins/router'
import { useAppStore } from '@shared/stores/app'

const CHUNK_ERROR_PATTERNS = [
  /Failed to fetch dynamically imported module/i,
  /error loading dynamically imported module/i,
  /Importing a module script failed/i,
]

function isChunkLoadError(message: string) {
  return CHUNK_ERROR_PATTERNS.some((pattern) => pattern.test(message))
}

/**
 * Detects a stale deployed chunk failing to load and surfaces the update-required cover.
 * vite:preloadError covers Vite's own module-preload path; router.onError is a fallback
 * for dynamic import failures that surface through navigation instead.
 */
function registerModuleReload() {
  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault()
    useAppStore().interrupt = { type: 'update' }
  })

  useRouter().onError((err) => {
    if (isChunkLoadError(err.message)) {
      useAppStore().interrupt = { type: 'update' }
    }
  })
}

export { registerModuleReload }
