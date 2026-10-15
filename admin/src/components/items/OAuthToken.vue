<script setup lang="ts">
  import { ShieldCheckIcon, Trash2Icon } from '@lucide/vue'
  import { useDateTime } from '@shared/composables/support/useDateTime'
  import { Item, ItemDropdown } from '@shared/components/common/Item'
  import { Badge } from '@shared/components/ui/badge'
  import { DropdownMenuItem } from '@shared/components/ui/dropdown-menu'
  import type { OAuthToken } from '@/models/oauthToken'

  defineProps<{
    oauthToken: OAuthToken
  }>()

  const emit = defineEmits<{
    (e: 'delete'): void
  }>()

  const formatDate = useDateTime()
</script>

<template>
  <Item>
    <template #icon>
      <ShieldCheckIcon />
    </template>

    <template #title>
      {{ oauthToken.clientName }}
    </template>

    <p class="truncate text-sm text-muted-foreground">
      {{ $t('features.lbl.client_id') }}: {{ oauthToken.clientId }}
    </p>

    <div
      v-if="oauthToken.scopes.length"
      class="flex flex-wrap gap-1"
    >
      <Badge
        v-for="scope in oauthToken.scopes"
        variant="secondary"
        :key="scope"
      >
        {{ scope }}
      </Badge>
    </div>

    <p class="text-sm text-muted-foreground">
      {{ $t('features.lbl.created') }}: {{ formatDate(oauthToken.createdAt, 'long') }}
    </p>

    <p
      v-if="oauthToken.expiresAt"
      class="text-sm text-muted-foreground"
    >
      {{ $t('features.lbl.expires') }}: {{ formatDate(oauthToken.expiresAt, 'long') }}
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
