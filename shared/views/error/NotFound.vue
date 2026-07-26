<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
</script>

<template>
  <div class="text-center">
    <Heading>
      {{ $t('site.error.404.title') }}
    </Heading>

    <p>
      {{ $t('site.error.404.message') }}
    </p>

    <router-link
      class="text-link"
      :to="{name: 'auth-landing'}"
    >
      {{ $t('site.error.404.link') }}
    </router-link>
  </div>
</template>
