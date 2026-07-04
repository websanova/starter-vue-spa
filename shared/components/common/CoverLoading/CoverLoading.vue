<script setup lang="ts">
  import StarterLogo from "@shared/components/logos/Starter.vue"
  import { Cover, CoverContent } from "@shared/components/common/Cover"
</script>

<template>
  <Cover>
    <CoverContent>
      <div
        class="text-center"
      >
        <StarterLogo
          class="mx-auto mb-4 h-20"
        />

        <div
          v-if="$slots.default"
        >
          <slot />
        </div>
      </div>
    </CoverContent>
  </Cover>
</template>
