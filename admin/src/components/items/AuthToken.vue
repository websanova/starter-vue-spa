<script setup lang="ts">
  import { KeyRoundIcon, Trash2Icon } from '@lucide/vue'
  import { useDateTime } from '@shared/composables/support/useDateTime'
  import { Item, ItemDropdown } from '@shared/components/common/Item'
  import { Badge } from '@shared/components/ui/badge'
  import { DropdownMenuItem } from '@shared/components/ui/dropdown-menu'
  import type { AuthToken } from '@/models/authToken'

  defineProps<{
    authToken: AuthToken
  }>()

  const emit = defineEmits<{
    (e: 'delete'): void
  }>()

  const formatDate = useDateTime()
</script>

<template>
  <Item>
    <template #icon>
      <KeyRoundIcon />
    </template>

    <template #title>
      {{ authToken.name }}
    </template>

    <div
      v-if="authToken.abilities.length"
      class="flex flex-wrap gap-1"
    >
      <Badge
        v-for="ability in authToken.abilities"
        variant="secondary"
        :key="ability"
      >
        {{ ability }}
      </Badge>
    </div>

    <p class="text-sm text-muted-foreground">
      {{ $t('features.lbl.created') }}: {{ formatDate(authToken.createdAt, 'long') }}
    </p>

    <p
      v-if="authToken.expiresAt"
      class="text-sm text-muted-foreground"
    >
      {{ $t('features.lbl.expires') }}: {{ formatDate(authToken.expiresAt, 'long') }}
    </p>

    <p
      v-if="authToken.lastUsedAt"
      class="text-sm text-muted-foreground"
    >
      {{ $t('features.lbl.last_used') }}: {{ formatDate(authToken.lastUsedAt, 'long') }}
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
