<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUsers } from '@/composables/api/users'
  import { usePagination } from '@shared/composables/support/usePagination'
  import UserItem from '@/features/items/User.vue'
  import { LoadPaginate } from '@shared/components/common/LoadPaginate'
  import { ItemGroup } from '@shared/components/ui/item'
  import type { UserFilters } from '@/models/user'

  const router = useRouter()

  const { page, search } = usePagination()

  const filters = computed<UserFilters>(() => ({
    page: page.value,
    search: search.value,
  }))

  const { data, isPending, error } = useUsers(filters)

  function onClear() {
    router.push({ query: {} })
  }
</script>

<template>
  <div>
    <LoadPaginate
      model="users"
      :error="error"
      :filters="{ search }"
      :is-pending="isPending"
      :meta="data?.meta"
      @clear="onClear"
    >
      <ItemGroup>
        <UserItem
          v-for="user in data?.users"
          :key="user.id"
          :user="user"
        />
      </ItemGroup>
    </LoadPaginate>
  </div>
</template>
