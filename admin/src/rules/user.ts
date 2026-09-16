import { z } from 'zod'
import { useI18n } from '@shared/plugins/i18n'

export const UserRules = {
  confirmEmail(email: string) {
    const i18n = useI18n()

    return z.string()
      .min(1, i18n.t('rules.required', { attribute: i18n.t('rules.attr.email') }))
      .refine((value) => value === email, i18n.t('rules.confirmed', { attribute: i18n.t('rules.attr.email') }))
  },
}
