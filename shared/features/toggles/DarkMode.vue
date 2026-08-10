<script setup lang="ts">
  import { MoonIcon, SunIcon } from '@lucide/vue'
  import { useColorScheme } from '@shared/composables/support/useColorScheme'

  const { isDark, toggle } = useColorScheme()
</script>

<template>
  <span
    class="inline-flex cursor-pointer"
    @click="toggle"
  >
    <SunIcon
      v-if="isDark"
      class="size-full"
    />

    <MoonIcon
      v-else
      class="size-full"
    />

    <span class="sr-only">
      {{ $t('features.sr.dark_mode_toggle') }}
    </span>
  </span>
</template>
