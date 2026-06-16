<script setup lang="ts">
  import { Starter } from "@shared/components/icons"
  import { Cover, CoverContent } from "@shared/components/common/Cover"
</script>

<template>
  <Cover>
    <CoverContent>
      <Starter class="h-20 w-20" />

      <div v-if="$slots.default">
        <slot />
      </div>
    </CoverContent>
  </Cover>
</template>
