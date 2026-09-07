<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { usePlans } from '@/composables/api/plans'
  import { useUpdateSubscription } from '@/composables/api/subscription'
  import { useMutationError } from '@shared/composables/primitives/useMutationError'
  import { useAuthService } from '@shared/composables/services/auth'
  import { useI18n } from '@shared/plugins/i18n'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Loading } from '@shared/components/common/Loading'
  import { Stack } from '@shared/components/common/Stack'
  import { stripeClient } from '@shared/lib/stripe'
  import type { Interval } from '@/models/plan'

  const auth = useAuthService()
  const i18n = useI18n()
  const route = useRoute()
  const router = useRouter()

  const plan = route.query.plan as string | undefined
  const interval = route.query.interval as Interval | undefined

  if (!plan || !interval) {
    router.replace({ name: 'user-subscribe-plans' })
  }

  const { data: plans, isPending: isLoading } = usePlans()

  const update = useUpdateSubscription()

  /**
   * Spans the confirm and the bank challenge that can follow it, since
   * the two are one wait as far as the user is concerned.
   */
  const isConfirming = ref<boolean>(false)
  const isFailed = ref<boolean>(false)
  const paymentError = ref<string>('')

  const mutationError = useMutationError(update)

  /**
   * A refusal comes back as an HTTP error and carries its own sentence.
   * Anything else, a dead stripe.js and a dropped connection among them,
   * still gets a line rather than a page that looks like nothing
   * happened.
   */
  const error = computed(() => {
    const message = paymentError.value || mutationError.value

    if (message) {
      return message
    }

    return isFailed.value ? i18n.t('features.form.subscription_update.note_failed') : ''
  })

  /**
   * The page is opened with a slug, and the user carries one too, so the
   * plans list is what turns either of them into a name and a price.
   */
  function summary(slug: string | undefined, value: Interval | undefined): string {
    const item = plans.value?.find((entry) => entry.slug === slug)
    const price = item && value ? item.prices[value] : undefined

    if (!item || !value || !price) {
      return ''
    }

    return i18n.t('features.form.subscription_update.plan', {
      plan: item.name,
      price: i18n.n(price.amount / 100, { key: 'currency', currency: price.currency.toUpperCase() }),
      interval: i18n.t(`site.units.interval.short.${value}`),
    })
  }

  const from = computed(() => summary(auth.user.value?.plan?.slug, auth.user.value?.subscription?.interval))

  const to = computed(() => summary(plan, interval))

  async function submit() {
    // Not reachable. The page redirects itself off a query missing
    // either half of the change it is confirming.
    if (!plan || !interval) {
      return
    }

    isConfirming.value = true
    isFailed.value = false
    paymentError.value = ''

    try {
      const payment = await update.mutateAsync({ interval, plan })

      if (payment?.status === 'requires_action') {
        await authenticate(payment.clientSecret)
        return
      }

      if (payment?.status === 'failed') {
        paymentError.value = i18n.t('features.form.subscription_update.note_declined')
        isConfirming.value = false
        return
      }

      router.push({ name: 'user-account-billing' })
    } catch (err) {
      console.error(err)
      isFailed.value = true
      isConfirming.value = false
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
        paymentError.value = stripeError.message ?? ''
        isFailed.value = true
        isConfirming.value = false
        return
      }

      router.push({ name: 'user-account-billing' })
    } catch (err) {
      console.error(err)
      isFailed.value = true
      isConfirming.value = false
    }
  }
</script>

<template>
  <div class="flex justify-center">
    <Stack class="w-full sm:max-w-[25rem]">
      <div class="text-center">
        <p class="text-2xl font-bold">
          {{ $t('features.form.subscription_update.title') }}
        </p>
      </div>

      <div
        v-if="isLoading"
        class="flex justify-center"
      >
        <Loading />
      </div>

      <template v-else>
        <Stack gap="sm">
          <div>
            <p class="text-sm text-muted-foreground">
              {{ $t('features.form.subscription_update.from') }}
            </p>

            <p>{{ from }}</p>
          </div>

          <div>
            <p class="text-sm text-muted-foreground">
              {{ $t('features.form.subscription_update.to') }}
            </p>

            <p class="font-bold">{{ to }}</p>
          </div>
        </Stack>

        <p
          v-if="error"
          class="text-center text-destructive"
        >
          {{ error }}
        </p>

        <ButtonLoading
          class="w-full"
          :pending="isConfirming"
          @click="submit"
        >
          {{ $t('features.form.subscription_update.submit') }}
        </ButtonLoading>
      </template>
    </Stack>
  </div>
</template>
