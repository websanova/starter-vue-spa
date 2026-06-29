<script setup lang="ts">
  import { computed, onMounted } from 'vue'

  import { useAppStore } from '@shared/stores/app'
  import { useContentStore } from '@shared/stores/content'
  // import {useAuthStore} from '@shared/stores/core/useAuthStore'
  // import {useI18nStore} from '@shared/stores/core/useI18nStore'
  // import {useSettingsStore} from '@shared/stores/core/useSettingsStore'

  import { CoverLoading } from '@shared/components/common/CoverLoading'
  import { CoverMaintenance } from '@shared/components/common/CoverMaintenance'
  import { CoverUpdate } from '@shared/components/common/CoverUpdate'

  const app = useAppStore()
  // const auth = useAuthStore()
  const content = useContentStore()
  // const i18n = useI18nStore()
  // const settings = useSettingsStore()

  const isSiteLoaded = computed(() => {
      return (
          // auth.isReady &&
          content.isSiteLoaded// &&
          // i18n.isSiteLoaded &&
          // settings.isLoaded
      )
  })
</script>

<template>
  <template
      v-if="app.isMaintenanceMode"
  >
    <CoverMaintenance />
  </template>

   <template
      v-else-if="app.isUpdateRequired"
  >
    <CoverUpdate />
  </template>

  <template
      v-else
  >
    <template
        v-if="isSiteLoaded"
    >
      <slot />
    </template>

    <Transition
        name="fade-out-cover"
    >
      <CoverLoading
          v-if="!isSiteLoaded"
      />
    </Transition>
  </template>
</template>