<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useBookmarks } from '@/composables/api/bookmarks'
  import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious } from '@shared/components/ui/pagination'

  const route = useRoute()
  const router = useRouter()

  const page = computed(() => Number(route.query.page) || 1)

  const { data, isPending, error } = useBookmarks(page)

  function onPage(value: number) {
    router.push({ query: { ...route.query, page: value } })
  }
</script>

<template>
  <div>
    <p v-if="isPending">Loading...</p>
    <p v-else-if="error">{{ error.message }}</p>

    <template v-else-if="data">
      <ul>
        <li
          v-for="bookmark in data.bookmarks"
          :key="bookmark.id"
        >
          {{ bookmark.title }}
        </li>
      </ul>

      <Pagination
        :page="page"
        :total="data.meta.total"
        :items-per-page="data.meta.perPage"
        @update:page="onPage"
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
  </div>
</template>
