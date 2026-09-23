<script setup lang="ts">
  import { Trash2Icon } from '@lucide/vue'
  import { Avatar } from '@shared/components/common/Avatar'
  import { Item, ItemDropdown } from '@shared/components/common/Item'
  import { DropdownMenuItem } from '@shared/components/ui/dropdown-menu'
  import type { User } from '@/models/user'

  defineProps<{
    user: User
  }>()

  const emit = defineEmits<{
    (e: 'delete'): void
  }>()
</script>

<template>
  <Item>
    <template #icon>
      <Avatar
        class="size-9 text-xl  "
        :src="user.avatarUrl"
        :fallback="user.firstName || user.email"
      />
    </template>

    <template #title>
      <RouterLink
        class="text-link"
        :to="{ name: 'user-users-show', params: { user_id: user.id } }"
      >
        {{ user.firstName }} {{ user.lastName }}
      </RouterLink>
    </template>

    <p class="truncate text-sm text-muted-foreground">
      {{ user.email }}
    </p>

    <template #actions>
      <ItemDropdown>
        <DropdownMenuItem @select="emit('delete')">
          <Trash2Icon />
          {{ $t('features.lbl.delete') }}
        </DropdownMenuItem>
      </ItemDropdown>
    </template>
  </Item>
</template>
