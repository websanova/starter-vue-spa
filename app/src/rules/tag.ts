import { z } from 'zod'
import { useI18n } from '@shared/plugins/i18n'

export const TagRules = {
  name() {
    const i18n = useI18n()

    return z.string()
      .min(1, i18n.t('rules.required', { attribute: i18n.t('rules.attr.name') }))
      .max(50, i18n.t('rules.max.string', { attribute: i18n.t('rules.attr.name'), max: 50 }))
  },
}
