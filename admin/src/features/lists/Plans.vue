<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { usePlans } from '@/composables/api/plans'
  import PlanItem from '@/features/items/Plan.vue'
  import { PaginationNumbered } from '@shared/components/common/PaginationNumbered'
  import { ItemGroup } from '@shared/components/ui/item'
  import type { PlanFilters } from '@/models/plan'

  const route = useRoute()
  const router = useRouter()

  const page = computed({
    get: () => Number(route.query.page) || 1,
    set: (value) => router.push({ query: { ...route.query, page: value } }),
  })

  const filters = computed<PlanFilters>(() => ({
    page: page.value,
  }))

  const { data, isPending, error } = usePlans(filters)
</script>

<template>
  <div>
    <p v-if="isPending">Loading...</p>
    <p v-else-if="error">{{ error.message }}</p>

    <template v-else-if="data">
      <p
        v-if="!data.plans.length"
        class="my-3 text-muted-foreground"
      >
        {{ $t('features.list.plans.no_results') }}
      </p>

      <ItemGroup v-else>
        <PlanItem
          v-for="plan in data.plans"
          :key="plan.id"
          :plan="plan"
        />
      </ItemGroup>

      <PaginationNumbered
        v-model:page="page"
        :total="data.meta.total"
        :per-page="data.meta.perPage"
      />
    </template>
  </div>
</template>
