import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Settings } from '@shared/config/settings'

export const useSettingsStore = defineStore('settings', () => {
  const isLoaded = ref<boolean>(false)
  const data = ref<Settings>({} as Settings)

  return {
    isLoaded,
    data,
  }
})
