<script setup lang="ts">
  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useCheckout } from '@/composables/support/checkout'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Loading } from '@shared/components/common/Loading'
  import { Stack } from '@shared/components/common/Stack'
  import { Input } from '@shared/components/ui/input'
  import type { Interval } from '@/models/plan'

  const route = useRoute()
  const router = useRouter()

  const plan = route.query.plan as string | undefined
  const interval = route.query.interval as Interval | undefined

  if (!plan || !interval) {
    router.replace({ name: 'user-subscribe-plans' })
  }

  const addressTarget = ref<HTMLElement | null>(null)
  const paymentTarget = ref<HTMLElement | null>(null)
  const promotionCode = ref<string>('')

  const {
    applyPromotionCode,
    confirm,
    error,
    isApplying,
    isConfirming,
    isLoading,
    lineItems,
    total,
  } = useCheckout({
    addressTarget,
    interval,
    paymentTarget,
    plan,
  })
</script>

<template>
  <div class="flex justify-center">
    <Stack class="w-full sm:max-w-[25rem]">
      <p class="text-center text-2xl font-bold">
        {{ $t('features.subscribe.checkout.note_complete') }}
      </p>

      <div
        v-if="isLoading"
        class="flex justify-center"
      >
        <Loading />
      </div>

      <template v-else>
        <p
          v-if="error"
          class="text-center text-destructive"
        >
          {{ error }}
        </p>

        <Stack gap="sm">
          <p
            v-for="item in lineItems"
            :key="item.id"
            class="text-sm text-muted-foreground"
          >
            {{ item.name }}
          </p>

          <p class="flex justify-between font-medium">
            <span>{{ $t('features.subscribe.checkout.total') }}</span>
            <span>{{ total }}</span>
          </p>
        </Stack>

        <div
          ref="addressTarget"
          class="rounded-md border p-3"
        />

        <div ref="paymentTarget" />

        <div class="flex gap-2">
          <Input
            v-model="promotionCode"
            :placeholder="$t('features.ph.promotion_code')"
          />

          <ButtonLoading
            variant="outline"
            :disabled="!promotionCode"
            :pending="isApplying"
            @click="applyPromotionCode(promotionCode)"
          >
            {{ $t('features.lbl.apply') }}
          </ButtonLoading>
        </div>

        <ButtonLoading
          class="w-full"
          :pending="isConfirming"
          @click="confirm"
        >
          {{ $t('features.subscribe.checkout.submit') }}
        </ButtonLoading>
      </template>
    </Stack>
  </div>
</template>
