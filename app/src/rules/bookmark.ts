import { z } from 'zod'
import { useI18n } from '@shared/plugins/i18n'
import { useSettingsStore } from '@shared/stores/settings'

export const BookmarkRules = {
  description() {
    const i18n = useI18n()

    return z.string()
      .max(1000, i18n.t('rules.max.string', { attribute: i18n.t('rules.attr.description'), max: 1000 }))
  },

  tagIds() {
    const i18n = useI18n()
    const settings = useSettingsStore()

    const max = settings.data.bookmarkMaxTags

    return z.array(z.number())
      .max(max, i18n.t('rules.max.array', { attribute: i18n.t('rules.attr.tags'), max }))
  },

  title() {
    const i18n = useI18n()

    return z.string()
      .min(1, i18n.t('rules.required', { attribute: i18n.t('rules.attr.title') }))
      .max(255, i18n.t('rules.max.string', { attribute: i18n.t('rules.attr.title'), max: 255 }))
  },

  url() {
    const i18n = useI18n()

    return z.string()
      .min(1, i18n.t('rules.required', { attribute: i18n.t('rules.attr.url') }))
      .max(255, i18n.t('rules.max.string', { attribute: i18n.t('rules.attr.url'), max: 255 }))
      .url(i18n.t('rules.url', { attribute: i18n.t('rules.attr.url') }))
  },
}
