<script setup lang="ts">
  import "@core/assets/main.css"

  import { onMounted } from 'vue'
  import { removeInitCover } from '@core/lib/utils'

  // import {useUpdateRequired} from '@core/composables/core/useUpdateRequired.js'
  import { useLoaded } from '@core/composables/core/useLoaded'
  // import {useMaintenanceMode} from '@core/composables/core/useMaintenanceMode.js'

  import { CoverLoading } from '@core/components/common/CoverLoading'
  // import CoverMaintenance from '@share/components/util/CoverMaintenance.vue'
  // import CoverUpdate from '@share/components/util/CoverUpdate.vue'
  // import CptMeta from '@share/components/util/Meta.vue'

  // const maintenanceMode = useMaintenanceMode()
  // const updateRequired = useUpdateRequired()
  const { isSiteLoaded } = useLoaded()

  onMounted(() => {
    removeInitCover()
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
      <cpt-meta />

      <RouterView />
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