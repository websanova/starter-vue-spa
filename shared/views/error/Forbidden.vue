<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
</script>

<template>
  <div
    class="text-center"
  >
    <Heading>
      {{ $t('site.error.403.title') }}
    </Heading>

    {{ $t('site.error.403.message') }}
  </div>
</template>
