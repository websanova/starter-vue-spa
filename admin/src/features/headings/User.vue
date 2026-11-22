<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import type { User } from '@/models/user'

  defineProps<{
    placeholder?: string
    user?: User
  }>()
</script>

<template>
  <Heading class="flex items-center justify-between">
    <template v-if="user">
      {{ user.firstName }} {{ user.lastName }}
    </template>

    <template v-else>
      {{ placeholder }}
    </template>

    <div
      v-if="$slots.actions"
      class="flex items-center gap-2"
    >
      <slot name="actions" />
    </div>
  </Heading>
</template>
