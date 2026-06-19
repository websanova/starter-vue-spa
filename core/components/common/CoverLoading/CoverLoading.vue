<script setup lang="ts">
  import { Starter } from "@core/components/icons"
  import { Cover, CoverContent } from "@core/components/common/Cover"
</script>

<template>
  <Cover>
    <CoverContent>
      <div class="text-center">
        <Starter class="mx-auto mb-4 h-20 w-20" />

        <div v-if="$slots.default">
          <slot />
        </div>
      </div>
    </CoverContent>
  </Cover>
</template>
