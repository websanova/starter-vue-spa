import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCancelSubscription, useResumeSubscription, useUpdateSubscription } from '@/composables/api/subscription'
import { useMutationAction } from '@shared/composables/primitives/useMutationAction'
import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useI18n } from '@shared/plugins/i18n'
import { stripeClient } from '@shared/lib/stripe'
import type { Interval } from '@/models/plan'

interface UpdateOptions {
  interval: Interval | undefined
  plan: string | undefined
}

export function useCancelSubscriptionForm(onSuccess?: () => void) {
  const i18n = useI18n()
  const mutation = useCancelSubscription()

  return {
    ...useMutationAction({
      onSubmit: () => mutation.mutateAsync(),
      onSuccess,
    }),
    error: useMutationError(mutation, i18n.t('features.form.subscription_cancel.note_failed')),
  }
}

export function useResumeSubscriptionForm(onSuccess?: () => void) {
  const i18n = useI18n()
  const mutation = useResumeSubscription()

  return {
    ...useMutationAction({
      onSubmit: () => mutation.mutateAsync(),
      onSuccess,
    }),
    error: useMutationError(mutation, i18n.t('features.form.subscription_resume.note_failed')),
  }
}

export function useUpdateSubscriptionForm({ interval, plan }: UpdateOptions) {
  const i18n = useI18n()
  const router = useRouter()

  const update = useUpdateSubscription()

  const failed = i18n.t('features.form.subscription_update.note_failed')

  /**
   * Spans the confirm and the bank challenge that can follow it, since
   * the two are one wait as far as the user is concerned.
   */
  const isPending = ref<boolean>(false)
  const paymentError = ref<string>('')

  const mutationError = useMutationError(update, failed)

  /**
   * A refusal comes back as an HTTP error and carries its own sentence.
   * The payment side, a decline or a dead stripe.js among them, is held
   * apart since it never reaches the mutation.
   */
  const error = computed(() => paymentError.value || mutationError.value)

  async function submit() {
    // Not reachable. The page redirects itself off a query missing
    // either half of the change it is confirming.
    if (!plan || !interval) {
      return
    }

    isPending.value = true
    paymentError.value = ''

    try {
      const payment = await update.mutateAsync({ interval, plan })

      if (payment.status === 'requires_action') {
        await authenticate(payment.clientSecret)
        return
      }

      if (payment.status === 'failed') {
        paymentError.value = i18n.t('features.form.subscription_update.note_declined')
        isPending.value = false
        return
      }

      router.push({ name: 'user-account-billing' })
    } catch (err) {
      console.error(err)
      isPending.value = false
    }
  }

  /**
   * The bank is asking the user to prove they are the cardholder, not
   * asking for a different card, so the secret goes straight to
   * stripe.js and no element is mounted. A card collected here would be
   * a second, unrelated change riding on the confirm.
   *
   * Failing leaves the user on the page with the plan already changed
   * and the invoice open, which is the same place a decline leaves them.
   */
  async function authenticate(clientSecret: string) {
    try {
      const stripe = await stripeClient()

      if (!stripe) {
        throw new Error('Stripe failed to load.')
      }

      const { error: stripeError } = await stripe.handleNextAction({ clientSecret })

      if (stripeError) {
        paymentError.value = stripeError.message || failed
        isPending.value = false
        return
      }

      router.push({ name: 'user-account-billing' })
    } catch (err) {
      console.error(err)
      paymentError.value = failed
      isPending.value = false
    }
  }

  return { submit, isPending, error }
}
