<script setup lang="ts">
  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useCreateSubscriptionCheckout } from '@/composables/api/subscription'
  import { useMutationError } from '@shared/composables/primitives/useMutationError'
  import { useStripeCheckout } from '@shared/composables/primitives/useStripeCheckout'
  import { useAuthService } from '@shared/composables/services/auth'
  import { Loading } from '@shared/components/common/Loading'
  import type { Interval } from '@/models/plan'

  const pollAttempts = 8
  const pollInterval = 2000

  const auth = useAuthService()
  const route = useRoute()
  const router = useRouter()

  const subscriptionCheckout = useCreateSubscriptionCheckout()
  const error = useMutationError(subscriptionCheckout)
  const { data, isPending } = subscriptionCheckout

  const embeddedCheckout = useStripeCheckout({
    selector: '#subscription-checkout',
    onComplete,
  })

  const isActivating = ref<boolean>(false)

  const plan = route.query.plan as string | undefined
  const interval = route.query.interval as Interval | undefined

  if (plan && interval) {
    subscriptionCheckout.mutate({ plan, interval }, {
      onSuccess: ({ clientSecret }) => embeddedCheckout.mount(clientSecret),
    })
  }
  else {
    router.replace({ name: 'user-subscribe-plans' })
  }

  /**
   * Waits for the webhook to turn the payment into a subscription. Nothing
   * is synced from here, so the profile is refetched until the status
   * lands or the ceiling is reached. Running out of attempts is not a
   * failure, the activation simply has not arrived yet and the next load
   * of the app will pick it up.
   */
  async function onComplete() {
    embeddedCheckout.destroy()
    isActivating.value = true

    for (let attempt = 0; attempt < pollAttempts; attempt += 1) {
      await auth.fetchUser()

      if (isSubscribed()) {
        break
      }

      await new Promise((resolve) => setTimeout(resolve, pollInterval))
    }

    router.push({ name: 'user-landing' })
  }

  function isSubscribed() {
    const status = auth.user.value?.subscription?.status
    return status === 'active' || status === 'trialing'
  }
</script>

<template>
  <div class="flex justify-center">
    <Loading
      v-if="isPending"
      :text="$t('features.subscribe.checkout.loading')"
    />

    <p
      v-else-if="error"
      class="text-center"
    >
      {{ error }}
    </p>

    <Loading
      v-else-if="isActivating"
      :text="$t('features.subscribe.checkout.activating')"
    />

    <div
      v-else-if="data"
      id="subscription-checkout"
      class="w-full"
    />
  </div>
</template>
