<script setup lang="ts">
  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
  } from '@shared/components/ui/pagination'

  defineProps<{
    total: number
    perPage: number
  }>()

  const page = defineModel<number>('page', { required: true })
</script>

<template>
  <Pagination
    v-if="total > perPage"
    v-model:page="page"
    :total="total"
    :items-per-page="perPage"
  >
    <PaginationContent v-slot="{ items }">
      <PaginationPrevious />

      <template
        v-for="(item, index) in items"
        :key="index"
      >
        <PaginationItem
          v-if="item.type === 'page'"
          :value="item.value"
          :is-active="item.value === page"
        >
          {{ item.value }}
        </PaginationItem>

        <PaginationEllipsis v-else />
      </template>

      <PaginationNext />
    </PaginationContent>
  </Pagination>
</template>
