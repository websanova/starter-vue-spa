<script setup lang="ts">
  import { onBeforeUnmount, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useCreateCheckoutSession } from '@/composables/api/subscription'
  import { useStripe } from '@/composables/support/stripe'
  import { useMutationError } from '@shared/composables/primitives/useMutationError'
  import { useAuthService } from '@shared/composables/services/auth'
  import { Loading } from '@shared/components/common/Loading'
  import type { Interval } from '@/models/plan'
  import type { StripeEmbeddedCheckout } from '@stripe/stripe-js'

  const pollAttempts = 8
  const pollInterval = 2000

  const auth = useAuthService()
  const route = useRoute()
  const router = useRouter()

  const session = useCreateCheckoutSession()
  const error = useMutationError(session)
  const { data, isPending } = session

  const container = ref<HTMLDivElement | null>(null)
  const isActivating = ref<boolean>(false)

  let checkout: StripeEmbeddedCheckout | null = null

  const plan = route.query.plan as string | undefined
  const interval = route.query.interval as Interval | undefined

  if (plan && interval) {
    session.mutate({ plan, interval })
  }
  else {
    router.replace({ name: 'user-subscribe-plans' })
  }

  /**
   * The container only exists once the secret has landed, so the mount is
   * driven by the ref appearing rather than by the component mounting.
   */
  watch(container, async (el) => {
    const clientSecret = data.value?.clientSecret

    if (!el || !clientSecret) {
      return
    }

    const stripe = await useStripe()

    if (!stripe) {
      return
    }

    checkout = await stripe.initEmbeddedCheckout({
      clientSecret,
      onComplete,
    })

    checkout.mount(el)
  })

  /**
   * Waits for the webhook to turn the payment into a subscription. Nothing
   * is synced from here, so the profile is refetched until the status
   * lands or the ceiling is reached. Running out of attempts is not a
   * failure, the activation simply has not arrived yet and the next load
   * of the app will pick it up.
   */
  async function onComplete() {
    checkout?.destroy()
    checkout = null
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

  onBeforeUnmount(() => {
    checkout?.destroy()
    checkout = null
  })
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
      ref="container"
      class="w-full"
    />
  </div>
</template>
