<script setup lang="ts">
  import { computed } from 'vue'

  import { useAppStore } from '@shared/stores/app'
  import { useAuthStore } from '@shared/stores/auth'
  import { useContentStore } from '@shared/stores/content'
  import { useI18nStore } from '@shared/stores/i18n'
  // import {useSettingsStore} from '@shared/stores/core/useSettingsStore'

  import { CoverLoading } from '@shared/components/common/CoverLoading'
  import MaintenanceCover from '@shared/features/covers/Maintenance.vue'
  import UpdateCover from '@shared/features/covers/Update.vue'

  const app = useAppStore()
  const auth = useAuthStore()
  const content = useContentStore()
  const i18n = useI18nStore()
  // const settings = useSettingsStore()

  const isSiteLoaded = computed(() => {
      return (
          auth.isReady &&
          content.isSiteLoaded &&
          i18n.isSiteLoaded
          // && settings.isLoaded
      )
  })
</script>

<template>
  <template v-if="app.interrupt?.type === 'maintenance'">
    <MaintenanceCover />
  </template>

  <template v-else-if="app.interrupt?.type === 'update'">
    <UpdateCover />
  </template>

  <template v-else>
    <template v-if="isSiteLoaded">
      <slot />
    </template>

    <Transition name="fade-out-cover">
      <CoverLoading v-if="!isSiteLoaded" />
    </Transition>
  </template>
</template>
