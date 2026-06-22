<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { useAppStore, useContentStore } from '@shared/stores'
  // import {useAuthStore} from '@shared/stores/core/useAuthStore'
  // import {useI18nStore} from '@shared/stores/core/useI18nStore'
  // import {useSettingsStore} from '@shared/stores/core/useSettingsStore'

  import { CoverLoading } from '@shared/components/common/CoverLoading'
  import { CoverMaintenance } from '@shared/components/common/CoverMaintenance'
  import { CoverUpdate } from '@shared/components/common/CoverUpdate'
  // import {useUpdateRequired} from '@shared/composables/core/useUpdateRequired.js'
  // import { useLoaded } from '@shared/composables/core/useLoaded'
  // import {useMaintenanceMode} from '@shared/composables/core/useMaintenanceMode.js'

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
      v-if=" app.isMaintenanceMode"
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