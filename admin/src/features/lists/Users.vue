<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useUsers } from '@/composables/api/users'
  import { useUserFilters } from '@/composables/filters/users'
  import UserItem from '@/features/items/User.vue'
  import { LoadPaginate } from '@shared/components/common/LoadPaginate'
  import { ItemGroup } from '@shared/components/ui/item'

  const router = useRouter()

  const { filters, search } = useUserFilters()

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
