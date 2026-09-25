<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useUsers } from '@/composables/api/users'
  import { useUserParams } from '@/composables/params/useUserParams'
  import { useDialogService } from '@shared/composables/services/useDialogService'
  import UserItem from '@/components/items/User.vue'
  import { LoadPaginate } from '@shared/components/common/LoadPaginate'
  import { ItemGroup } from '@shared/components/ui/item'

  const router = useRouter()

  const dialog = useDialogService()

  const params = useUserParams()
  const { page, search } = params

  const { data, isPending, error } = useUsers(params)

  function onClear() {
    router.push({ query: {} })
  }
</script>

<template>
  <div>
    <LoadPaginate
      v-model:page="page"
      i18n-key="features.load.nouns.users"
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
          @delete="dialog.open('userDelete', { user })"
        />
      </ItemGroup>
    </LoadPaginate>
  </div>
</template>
