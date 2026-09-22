<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import IconsList from '@/features/lists/Icons.vue'
</script>

<template>
  <div>
    <Heading>
      {{ $t('features.heading.title.icons') }}
    </Heading>

    <IconsList />
  </div>
</template>
