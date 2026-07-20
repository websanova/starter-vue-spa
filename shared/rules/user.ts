import { z } from 'zod'
import { useI18n } from '@shared/plugins/i18n'

export const UserRules = {
  firstName() {
    const i18n = useI18n()

    return z.string()
      .min(1, i18n.t('rules.required', { attribute: i18n.t('rules.attr.first_name') }))
      .max(255, i18n.t('rules.max.string', { attribute: i18n.t('rules.attr.first_name'), max: 255 }))
  },

  lastName() {
    const i18n = useI18n()

    return z.string()
      .min(1, i18n.t('rules.required', { attribute: i18n.t('rules.attr.last_name') }))
      .max(255, i18n.t('rules.max.string', { attribute: i18n.t('rules.attr.last_name'), max: 255 }))
  },

  locale() {
    const i18n = useI18n()

    return z.enum(['en-US', 'en-CA'], {
      message: i18n.t('rules.required', { attribute: i18n.t('rules.attr.language') }),
    })
  },

  timezone() {
    const i18n = useI18n()

    return z.enum(['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'Europe/London'], {
      message: i18n.t('rules.required', { attribute: i18n.t('rules.attr.timezone') }),
    })
  },
}
