import { computed } from 'vue'
import { settings } from '@/config/settings'
import { useI18n } from '@shared/plugins/i18n'

export function useLocaleOptions() {
  const i18n = useI18n()

  return computed(() => (settings.locales ?? []).map(code => ({
    value: code,
    label: i18n.t(`site.locale.${code}`),
  })))
}
