<script setup lang="ts">
  import { ref } from 'vue'
  import { usePlans } from '@/composables/api/plans'
  import PlanCard from '@/components/cards/Plan.vue'
  import { Button } from '@shared/components/ui/button'
  import { Inline } from '@shared/components/common/Inline'
  import { Loading } from '@shared/components/common/Loading'
  import { Stack } from '@shared/components/common/Stack'
  import type { Interval } from '@/models/plan'

  const intervals: Interval[] = ['monthly', 'yearly']

  const { data: plans, isPending, error } = usePlans()

  const interval = ref<Interval>('monthly')
</script>

<template>
  <div>
    <div
      v-if="isPending"
      class="flex justify-center"
    >
      <Loading />
    </div>

    <p
      v-else-if="error"
      class="text-center"
    >
      {{ error.message }}
    </p>

    <Stack v-else>
      <div class="text-center">
        <p>{{ $t('features.subscribe.plans.note') }}</p>

        <p class="text-sm text-muted-foreground">
          {{ $t('features.subscribe.plans.note_sub') }}
        </p>
      </div>

      <Inline
        gap="sm"
        class="justify-center"
      >
        <Button
          v-for="value in intervals"
          :key="value"
          size="sm"
          :variant="interval === value ? 'solid' : 'outline'"
          @click="interval = value"
        >
          {{ $t(`features.subscribe.plans.toggle.${value}`) }}
        </Button>
      </Inline>

      <Inline
        gap="lg"
        class="justify-center"
      >
        <PlanCard
          v-for="plan in plans"
          class="w-full sm:max-w-60"
          :key="plan.id"
          :plan="plan"
          :interval="interval"
        />
      </Inline>
    </Stack>
  </div>
</template>
