import { computed, ref } from 'vue'

const isDark = ref<boolean>(
  localStorage.getItem('color-scheme') === 'dark' ||
  (!localStorage.getItem('color-scheme') && window.matchMedia?.('(prefers-color-scheme: dark)').matches)
)

export const useDarkMode = function() {
  function toggle() {
    isDark.value = !isDark.value
    localStorage.setItem('color-scheme', isDark.value ? 'dark' : 'light')
  }

  return {
    isDark,
    isLight: computed(() => !isDark.value),
    toggle,
  }
}
