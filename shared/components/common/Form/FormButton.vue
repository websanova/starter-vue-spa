<script setup lang="ts">
  import { ButtonLoading } from "@shared/components/common/ButtonLoading"
</script>

<template>
  <ButtonLoading type="submit">
    <slot />
  </ButtonLoading>
</template>
