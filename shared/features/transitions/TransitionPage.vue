<script setup lang="ts">
  import { computed } from 'vue'
  import { useContentStore } from '@shared/stores/content'
  import { useI18nStore } from '@shared/stores/i18n'
  import { Loading } from '@shared/components/common/Loading'

  const content = useContentStore()
  const i18n = useI18nStore()

  const isPageLoaded = computed(() => {
      return (
          content.isPageLoaded &&
          i18n.isPageLoaded
      )
  })
</script>

<template>
  <template
      v-if="isPageLoaded"
  >
    <slot />
  </template>

  <Transition
      name="fade-in"
  >
    <Loading />
  </Transition>
</template>