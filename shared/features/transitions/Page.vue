<script setup lang="ts">
  import { computed } from 'vue'
  import { useContentStore } from '@shared/stores/content'
  import { useI18nStore } from '@shared/stores/i18n'
  import { Loading } from '@shared/components/common/Loading'

  const props = defineProps<{ isLoading?: boolean }>()

  const content = useContentStore()
  const i18n = useI18nStore()

  const isReady = computed(() => content.isPageLoaded && i18n.isPageLoaded && !props.isLoading)
  const showLoading = computed(() => props.isLoading || !i18n.isPageLoaded)
</script>

<template>
  <Transition
    name="fade-in"
  >
    <slot
      v-if="isReady"
    />
  </Transition>

  <Loading
    v-if="!isReady && showLoading"
  />
</template>
