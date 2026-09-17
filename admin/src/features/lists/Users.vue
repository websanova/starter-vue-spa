<script setup lang="ts">
  import { computed } from 'vue'
  import { useUsers } from '@/composables/api/users'
  import { usePagination } from '@shared/composables/support/usePagination'
  import UserItem from '@/features/items/User.vue'
  import { LoadPaginate } from '@shared/components/common/LoadPaginate'
  import { ItemGroup } from '@shared/components/ui/item'
  import type { UserFilters } from '@/models/user'

  const { page } = usePagination()

  const filters = computed<UserFilters>(() => ({
    page: page.value,
  }))

  const { data, isPending, error } = useUsers(filters)
</script>

<template>
  <div>
    <LoadPaginate
      model="users"
      :error="error"
      :is-pending="isPending"
      :meta="data?.meta"
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
