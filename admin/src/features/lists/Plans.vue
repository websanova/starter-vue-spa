<script setup lang="ts">
  import { usePlans } from '@/composables/api/plans'
  import { usePlanParams } from '@/composables/params/plans'
  import PlanItem from '@/features/items/Plan.vue'
  import { LoadPaginate } from '@shared/components/common/LoadPaginate'
  import { ItemGroup } from '@shared/components/ui/item'

  const params = usePlanParams()

  const { data, isPending, error } = usePlans(params)
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
