import { computed, ref, watch, watchEffect } from 'vue'

/**
 * Color scheme state for the whole app. The mode is one of auto,
 * light, or dark, and is persisted to localStorage under the
 * color-scheme key. Writing to mode is all a caller needs to do. The
 * watchers below handle persistence and the dark class on the html
 * element, including reacting to the operating system preference
 * changing while the app is open.
 *
 * This module is a singleton and its listeners only exist once it has
 * been evaluated, so it is imported for its side effects in main.ts
 * rather than relying on a component to pull it in. Every layout below
 * the root is route level lazy, so without that import the listener
 * would not exist until the first chunk loaded.
 *
 * First paint is not handled here. The inline script in
 * shared/init-cover.html applies the dark class before the bundle
 * parses, which avoids a flash of the wrong scheme. That script reads
 * the same storage key and resolves auto the same way, so the two must
 * be kept in step.
 */

/**
 * Rolled by hand rather than reaching for useColorMode from vueuse.
 * That composable would still need a wrapper for toggle, and the
 * init-cover script would still need to duplicate its resolution
 * logic, so none of the glue goes away. What it does add is its own
 * chain of underlying composables, useStorage and usePreferredDark
 * among them, which is more code under the hood than the handful of
 * lines here.
 */

export type ColorScheme = 'auto' | 'light' | 'dark'

const stored = localStorage.getItem('color-scheme')
const query = window.matchMedia('(prefers-color-scheme: dark)')

const mode = ref<ColorScheme>(stored === 'light' || stored === 'dark' ? stored : 'auto')
const systemDark = ref(query.matches)

query.addEventListener('change', (e) => {
  systemDark.value = e.matches
})

const isDark = computed(() => mode.value === 'dark' || (mode.value === 'auto' && systemDark.value))

watch(mode, (value) => {
  localStorage.setItem('color-scheme', value)
})

watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
})

export const useColorScheme = function() {
  /**
   * Takes an unknown so it can be handed straight to a control's
   * update event. Anything outside the union is ignored, which also
   * covers reka clearing a single select toggle group when the active
   * item is clicked a second time.
   */
  function set(value: unknown) {
    if (value === 'auto' || value === 'light' || value === 'dark') {
      mode.value = value
    }
  }

  function toggle() {
    mode.value = isDark.value ? 'light' : 'dark'
  }

  return {
    mode,
    isDark,
    set,
    toggle,
  }
}
