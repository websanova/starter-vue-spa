<script setup lang="ts">
  import "@shared/assets/main.css"

  import { onMounted } from 'vue'
  import { removeInitCover } from '@shared/lib/utils'

  // import {useUpdateRequired} from '@shared/composables/core/useUpdateRequired.js'
  import { useLoaded } from '@shared/composables/core/useLoaded'
  // import {useMaintenanceMode} from '@shared/composables/core/useMaintenanceMode.js'

  import { CoverLoading } from '@shared/components/common/CoverLoading'
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