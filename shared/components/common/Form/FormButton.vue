<script setup lang="ts">
  import { ButtonLoading } from "@shared/components/common/ButtonLoading"
</script>

<template>
  <ButtonLoading
    type="submit"
    class="self-start"
  >
    <slot />
  </ButtonLoading>
</template>
