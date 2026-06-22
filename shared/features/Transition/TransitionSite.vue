<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { useAppStore, useContentStore } from '@shared/stores'
  // import {useAuthStore} from '@shared/stores/core/useAuthStore'
  // import {useI18nStore} from '@shared/stores/core/useI18nStore'
  // import {useSettingsStore} from '@shared/stores/core/useSettingsStore'

  import { CoverLoading } from '@shared/components/common/CoverLoading'
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
  <!-- <template
      v-if="maintenanceMode.state.isActive"
  >
    <cpt-cover-maintenance />
  </template>

  <template
      v-else-if="updateRequired.state.isActive"
  >
    <cpt-cover-update />
  </template>

  <template
      v-else
  >-->
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
  <!--</template> -->
</template>