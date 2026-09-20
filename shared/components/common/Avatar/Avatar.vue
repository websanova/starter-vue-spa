<script setup lang="ts">
  import { computed } from 'vue'
  import { Avatar, AvatarFallback, AvatarImage } from '@shared/components/ui/avatar'

  const props = defineProps<{
    src?: string | null
    fallback?: string | null
  }>()

  const initial = computed(() => props.fallback?.charAt(0).toUpperCase())
</script>

<template>
  <Avatar>
    <AvatarImage :src="src ?? ''" />

    <AvatarFallback>
      {{ initial }}
    </AvatarFallback>
  </Avatar>
</template>
