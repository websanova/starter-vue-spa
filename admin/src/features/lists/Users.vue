<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useUsers } from '@/composables/api/users'
  import UserItem from '@/features/items/User.vue'
  import { PaginationNumbered } from '@shared/components/common/PaginationNumbered'
  import { ItemGroup } from '@shared/components/ui/item'
  import type { UserFilters } from '@/models/user'

  const route = useRoute()
  const router = useRouter()

  const page = computed({
    get: () => Number(route.query.page) || 1,
    set: (value) => router.push({ query: { ...route.query, page: value } }),
  })

  const filters = computed<UserFilters>(() => ({
    page: page.value,
  }))

  const { data, isPending, error } = useUsers(filters)
</script>

<template>
  <div>
    <p v-if="isPending">Loading...</p>
    <p v-else-if="error">{{ error.message }}</p>

    <template v-else-if="data">
      <p
        v-if="!data.users.length"
        class="my-3 text-muted-foreground"
      >
        {{ $t('features.list.users.no_results') }}
      </p>

      <ItemGroup v-else>
        <UserItem
          v-for="user in data.users"
          :key="user.id"
          :user="user"
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
