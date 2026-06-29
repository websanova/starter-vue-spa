<script setup lang="ts">
  import LogoStarter from "@shared/components/logos/LogoStarter.vue"
  import { Cover, CoverContent } from "@shared/components/common/Cover"
</script>

<template>
  <Cover>
    <CoverContent>
      <div class="text-center">
        <LogoStarter class="mx-auto mb-4 h-20" />

        <div v-if="$slots.default">
          <slot />
        </div>
      </div>
    </CoverContent>
  </Cover>
</template>
