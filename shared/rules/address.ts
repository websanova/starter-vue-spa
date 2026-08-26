import { z } from 'zod'
import { useI18n } from '@shared/plugins/i18n'

export const AddressRules = {
  city() {
    const i18n = useI18n()

    return z.string()
      .min(1, i18n.t('rules.required', { attribute: i18n.t('rules.attr.city') }))
      .max(255, i18n.t('rules.max.string', { attribute: i18n.t('rules.attr.city'), max: 255 }))
  },

  country() {
    const i18n = useI18n()

    return z.string()
      .min(1, i18n.t('rules.required', { attribute: i18n.t('rules.attr.country') }))
      .max(255, i18n.t('rules.max.string', { attribute: i18n.t('rules.attr.country'), max: 255 }))
  },

  line1() {
    const i18n = useI18n()

    return z.string()
      .min(1, i18n.t('rules.required', { attribute: i18n.t('rules.attr.line1') }))
      .max(255, i18n.t('rules.max.string', { attribute: i18n.t('rules.attr.line1'), max: 255 }))
  },

  line2() {
    const i18n = useI18n()

    return z.string()
      .max(255, i18n.t('rules.max.string', { attribute: i18n.t('rules.attr.line2'), max: 255 }))
  },

  postalCode() {
    const i18n = useI18n()

    return z.string()
      .min(1, i18n.t('rules.required', { attribute: i18n.t('rules.attr.postal_code') }))
      .max(255, i18n.t('rules.max.string', { attribute: i18n.t('rules.attr.postal_code'), max: 255 }))
  },
}
