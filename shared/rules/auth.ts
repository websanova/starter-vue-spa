import { z } from 'zod'

export const AuthRules = {
  name() {
    return z.string()
      .max(255, 'Name is too long.')
      .optional()
  },

  email() {
    return z.string()
      .min(1, 'Email is required.')
      .max(255, 'Email is too long.')
      .email('Enter a valid email.')
  },

  password() {
    return z.string()
      .min(1, 'Password is required.')
      .max(255, 'Password is too long.')
  },

  passwordsMatch<T extends { password: string; password_confirmation: string }>(schema: z.ZodType<T>) {
    return schema.refine((data) => data.password === data.password_confirmation, {
      message: 'Passwords do not match.',
      path: ['password_confirmation'],
    })
  },
}
