import { z } from 'zod'
import { useI18n } from '@shared/plugins/i18n'

export const AuthRules = {
  name() {
    const i18n = useI18n()

    return z.string()
      .min(1, i18n.t('rules.required', { attribute: i18n.t('rules.attr.first_name') }))
      .max(255, i18n.t('rules.max.string', { attribute: i18n.t('rules.attr.first_name'), max: 255 }))
      .optional()
  },

  email() {
    const i18n = useI18n()

    return z.string()
      .min(1, i18n.t('rules.required', { attribute: i18n.t('rules.attr.email') }))
      .max(255, i18n.t('rules.max.string', { attribute: i18n.t('rules.attr.email'), max: 255 }))
      .email(i18n.t('rules.email', { attribute: i18n.t('rules.attr.email') }))
  },

  password() {
    const i18n = useI18n()

    return z.string()
      .min(1, i18n.t('rules.required', { attribute: i18n.t('rules.attr.password') }))
      .max(255, i18n.t('rules.max.string', { attribute: i18n.t('rules.attr.password'), max: 255 }))
  },

  passwordsMatch<T extends { password: string; password_confirmation: string }>(schema: z.ZodType<T>) {
    const i18n = useI18n()

    return schema.refine((data) => data.password === data.password_confirmation, {
      message: i18n.t('rules.confirmed', { attribute: i18n.t('rules.attr.password') }),
      path: ['password_confirmation'],
    })
  },
}
