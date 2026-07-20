import { computed } from 'vue'

import { settings as localConfig } from '@/config/settings'
import { settings as sharedConfig } from '@shared/config/settings'
import { useHttp } from '@shared/plugins/http'
import { useSettingsStore } from '@shared/stores/settings'
import type { Settings } from '@shared/config/settings'

export const useSettingsService = function() {
  const store = useSettingsStore()

  async function load() {
    const data = await useHttp().get<Partial<Settings>>('settings')

    store.data = { ...data, ...sharedConfig, ...localConfig } as Settings
    store.isLoaded = true
  }

  return {
    data: computed(() => store.data),
    isLoaded: computed(() => store.isLoaded),
    load,
  }
}
