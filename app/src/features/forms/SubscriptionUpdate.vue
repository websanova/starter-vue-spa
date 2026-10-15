<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { usePlans } from '@/composables/api/plans'
  import { useUpdateSubscriptionForm } from '@/composables/forms/subscription'
  import { useAuthService } from '@shared/composables/services/useAuthService'
  import { useI18n } from '@shared/plugins/i18n'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Form } from '@shared/components/common/Form'
  import { Loading } from '@shared/components/common/Loading'
  import { Stack } from '@shared/components/common/Stack'
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

  const { submit, isPending: isConfirming, error } = useUpdateSubscriptionForm({ interval, plan })

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
</script>

<template>
  <Form>
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

          <p>{{ to }}</p>
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
  </Form>
</template>
