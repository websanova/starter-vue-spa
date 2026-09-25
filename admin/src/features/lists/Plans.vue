<script setup lang="ts">
  import { usePlans } from '@/composables/api/plans'
  import { usePlanParams } from '@/composables/params/usePlanParams'
  import PlanItem from '@/components/items/Plan.vue'
  import { LoadPaginate } from '@shared/components/common/LoadPaginate'
  import { ItemGroup } from '@shared/components/ui/item'

  const params = usePlanParams()
  const { page } = params

  const { data, isPending, error } = usePlans(params)
</script>

<template>
  <div>
    <LoadPaginate
      v-model:page="page"
      i18n-key="features.load.nouns.plans"
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
