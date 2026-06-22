<script setup lang="ts">
  import { Button } from "@shared/components/ui/button"
  import { CoverLoading } from "@shared/components/common/CoverLoading"

  function onRefresh() {
    window.location.reload()
  }
</script>

<template>
  <CoverLoading>
    <p class="mb-4">We are down for maintenance. Please check back shortly.</p>

    <Button @click="onRefresh">Refresh</Button>
  </CoverLoading>
</template>
