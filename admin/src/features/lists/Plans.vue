<script setup lang="ts">
  import { computed } from 'vue'
  import { usePlans } from '@/composables/api/plans'
  import { usePagination } from '@shared/composables/support/usePagination'
  import PlanItem from '@/features/items/Plan.vue'
  import { LoadPaginate } from '@shared/components/common/LoadPaginate'
  import { ItemGroup } from '@shared/components/ui/item'
  import type { PlanFilters } from '@/models/plan'

  const { page } = usePagination()

  const filters = computed<PlanFilters>(() => ({
    page: page.value,
  }))

  const { data, isPending, error } = usePlans(filters)
</script>

<template>
  <div>
    <LoadPaginate
      model="plans"
      :error="error"
      :is-pending="isPending"
      :meta="data?.meta"
    >
      <ItemGroup>
        <PlanItem
          v-for="plan in data?.plans"
          :key="plan.id"
          :plan="plan"
        />
      </ItemGroup>
    </LoadPaginate>
  </div>
</template>
