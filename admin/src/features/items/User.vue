<script setup lang="ts">
  import { Trash2Icon, UserIcon } from '@lucide/vue'
  import { useDialogService } from '@shared/composables/services/dialog'
  import { DropdownActions } from '@shared/components/common/DropdownActions'
  import { Item } from '@shared/components/common/Item'
  import { DropdownMenuItem } from '@shared/components/ui/dropdown-menu'
  import type { User } from '@/models/user'

  const props = defineProps<{
    user: User
  }>()

  const dialog = useDialogService()
</script>

<template>
  <Item>
    <template #icon>
      <UserIcon />
    </template>

    <template #title>
      {{ user.firstName }} {{ user.lastName }}
    </template>

    <p class="truncate text-sm text-muted-foreground">
      {{ user.email }}
    </p>

    <template #actions>
      <DropdownActions>
        <DropdownMenuItem @select="dialog.open('userDelete', { user: props.user })">
          <Trash2Icon />
          {{ $t('features.lbl.delete') }}
        </DropdownMenuItem>
      </DropdownActions>
    </template>
  </Item>
</template>
