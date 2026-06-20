<script setup lang="ts">
  import { Button } from "@packages/components/ui/button"
  import { CoverLoading } from "@packages/components/common/CoverLoading"

  function onRefresh() {
    window.location.reload()
  }
</script>

<template>
  <CoverLoading>
    <p class="mb-4">A new version is available. Refresh to update.</p>

    <Button @click="onRefresh">Refresh</Button>
  </CoverLoading>
</template>
