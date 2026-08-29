import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCreatePaymentMethodIntent, useSyncPaymentMethod } from '@/composables/api/paymentMethod'
import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useI18n } from '@shared/plugins/i18n'
import type { StripeIntent } from '@shared/composables/primitives/useStripePayment'

/**
 * Drives the payment method page. The intent is opened on load rather
 * than behind a button, since a page dedicated to this one job is the
 * user declaring intent already, and the element cannot mount without a
 * secret. Nothing is charged, the card being entered is what the next
 * renewal bills.
 */
export function usePaymentMethodForm() {
  const i18n = useI18n()
  const route = useRoute()
  const router = useRouter()

  const create = useCreatePaymentMethodIntent()
  const sync = useSyncPaymentMethod()

  const intent = ref<StripeIntent | null>(null)

  const isLoading = ref<boolean>(true)
  const isFailed = ref<boolean>(false)

  const mutationError = useMutationError(create, sync)

  /**
   * Anything that is not an HTTP error carries no message of its own,
   * so those still get a sentence rather than a page with nothing on it
   * where the form should be.
   */
  const error = computed(() => {
    if (mutationError.value) {
      return mutationError.value
    }

    return isFailed.value ? i18n.t('features.billing.payment_method.failed') : ''
  })

  start()

  /**
   * A secret on the url is a user coming back from a bank, and the form
   * picks that intent up off the query itself. Opening a second one
   * here would spend a create nothing mounts, and a create that failed
   * would bury the confirm they already completed behind its error.
   */
  async function start() {
    if (route.query.setup_intent_client_secret) {
      isLoading.value = false
      return
    }

    try {
      const { clientSecret } = await create.mutateAsync()

      intent.value = { clientSecret, type: 'setup' }
    } catch (err) {
      console.error(err)
      isFailed.value = true
    } finally {
      isLoading.value = false
    }
  }

  /**
   * A confirmed intent only attaches the card, so without this call the
   * customer carries no default and the renewal charges the old one.
   * The webhook runs the same writes for a user who never came back,
   * this is the path that lands while they are still on the page.
   *
   * A failure holds them here with the message. The form keeps the
   * confirmed intent, so submitting again retries the sync rather than
   * asking for the card a second time.
   */
  async function complete(id: string) {
    isFailed.value = false

    try {
      await sync.mutateAsync({ setup_intent: id })

      router.replace({ name: 'user-account-billing' })
    } catch (err) {
      console.error(err)
      isFailed.value = true
    }
  }

  return {
    complete,
    error,
    intent,
    isLoading,
    isPending: sync.isPending,
  }
}
