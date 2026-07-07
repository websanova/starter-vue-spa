<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
</script>

<template>
  <div
    class="text-center"
  >
    <Heading>
      {{ $t('site.error.404.title') }}
    </Heading>

    {{ $t('site.error.404.message') }}
  </div>
</template>
