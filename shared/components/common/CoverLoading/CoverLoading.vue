<script setup lang="ts">
  import StarterLogo from "@shared/components/logos/Starter.vue"
  import { Cover, CoverContent } from "@shared/components/common/Cover"
</script>

<template>
  <Cover>
    <CoverContent>
      <div class="text-center">
        <StarterLogo class="mx-auto h-10" />

        <div
          v-if="$slots.default"
          class="mt-4"
        >
          <slot />
        </div>
      </div>
    </CoverContent>
  </Cover>
</template>
