import { z } from 'zod'
import { useI18n } from '@shared/plugins/i18n'

export const BookmarkRules = {
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
