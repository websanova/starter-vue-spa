<script setup lang="ts">
  import { Button } from "@shared/components/ui/button"
  import { CoverLoading } from "@shared/components/common/CoverLoading"

  function onRefresh() {
    window.location.reload()
  }
</script>

<template>
  <CoverLoading>
    <p class="mb-4">{{ $t('site.cover.update.message') }}</p>

    <Button @click="onRefresh">{{ $t('site.common.refresh') }}</Button>
  </CoverLoading>
</template>
