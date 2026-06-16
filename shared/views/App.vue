<script setup lang="ts">
  import "@shared/assets/main.css"

  // import {useCover} from 'SHR_CMP/core/useCover.js'
  // import {useUpdateRequired} from 'SHR_CMP/core/useUpdateRequired.js'
  // import {useLoaded} from 'SHR_CMP/core/useLoaded.js'
  // import {useMaintenanceMode} from 'SHR_CMP/core/useMaintenanceMode.js'

  import { CoverLoading } from '@shared/components/common/CoverLoading'
  // import CoverMaintenance from 'SHR_CPT/util/CoverMaintenance.vue'
  // import CoverUpdate from 'SHR_CPT/util/CoverUpdate.vue'
  // import CptMeta from 'SHR_CPT/util/Meta.vue'

  // const cover = useCover()
  // const maintenanceMode = useMaintenanceMode()
  // const updateRequired = useUpdateRequired()
  // const loaded = useLoaded()

  // cover.remove()
</script>

<template>
  <CoverLoading />

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
  >
    <template
        v-if="loaded.state.isSiteLoaded"
    >
      <cpt-meta />

      <RouterView />
    </template>

    <Transition
        name="fade-out-cover"
    >
      <cpt-cover-loading
          v-if="!loaded.state.isSiteLoaded"
      />
    </Transition>
  </template> -->
</template>