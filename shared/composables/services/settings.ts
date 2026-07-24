import { computed } from 'vue'

import { settings as localConfig } from '@/config/settings'
import { settings as sharedConfig } from '@shared/config/settings'
import { toSettings } from '@shared/models/settings'
import { useHttp } from '@shared/plugins/http'
import { useSettingsStore } from '@shared/stores/settings'
import type { Settings, SettingsDto } from '@shared/models/settings'

export const useSettingsService = function() {
  const store = useSettingsStore()

  /**
   * Fetches remote settings and merges them under the shared and
   * local config, so local config always wins. Marks the store loaded.
   */
  async function load() {
    const { data } = await useHttp().get<{ data: SettingsDto }>('settings')

    store.data = { ...toSettings(data), ...sharedConfig, ...localConfig } as Settings
    store.isLoaded = true
  }

  return {
    data: computed(() => store.data),
    isLoaded: computed(() => store.isLoaded),
    load,
  }
}
