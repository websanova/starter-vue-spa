<script setup lang="ts">
  import { Button } from "@shared/components/ui/button"
  import { CoverLoading } from "@shared/components/common/CoverLoading"

  function onRefresh() {
    window.location.reload()
  }
</script>

<template>
  <CoverLoading>
    <p
      class="mb-4"
    >{{ $t('features.cover.update.message') }}</p>

    <Button @click="onRefresh">
      {{ $t('features.lbl.refresh') }}
    </Button>
  </CoverLoading>
</template>
