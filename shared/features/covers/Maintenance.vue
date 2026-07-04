<script setup lang="ts">
  import { useAppStore } from "@shared/stores/app"

  import { Button } from "@shared/components/ui/button"
  import { CoverLoading } from "@shared/components/common/CoverLoading"

  const app = useAppStore()

  function onRefresh() {
    window.location.reload()
  }
</script>

<template>
  <CoverLoading>
    <p class="mb-4" v-html="app.interrupt?.type === 'maintenance' ? app.interrupt.message || $t('features.cover.maintenance.message') : ''" />

    <Button @click="onRefresh">{{ $t('features.lbl.refresh') }}</Button>
  </CoverLoading>
</template>
