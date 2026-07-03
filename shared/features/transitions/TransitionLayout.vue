<script setup lang="ts">
  import { computed } from 'vue'
  import { useContentStore } from '@shared/stores/content'
  import { useI18nStore } from '@shared/stores/i18n'
  import { Loading } from '@shared/components/common/Loading'

  const content = useContentStore()
  const i18n = useI18nStore()

  const isLayoutLoaded = computed(() => {
      return (
          content.isLayoutLoaded &&
          i18n.isLayoutLoaded
      )
  })
</script>

<template>
  <template
      v-if="isLayoutLoaded"
  >
    <slot />
  </template>

  <Transition
      name="fade-in"
  >
    <Loading />
  </Transition>
</template>