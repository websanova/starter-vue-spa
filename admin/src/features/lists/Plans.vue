<script setup lang="ts">
  import { usePlans } from '@/composables/api/plans'
  import { usePlanFilters } from '@/composables/filters/plans'
  import PlanItem from '@/features/items/Plan.vue'
  import { LoadPaginate } from '@shared/components/common/LoadPaginate'
  import { ItemGroup } from '@shared/components/ui/item'

  const { filters } = usePlanFilters()

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
