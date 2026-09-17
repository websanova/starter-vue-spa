<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useUser } from '@/composables/api/users'
  import { Heading } from '@shared/components/common/Heading'
  import { Load } from '@shared/components/common/Load'
  import PageTransition from '@shared/features/transitions/Page.vue'

  const route = useRoute()

  const id = computed(() => Number(route.params.user_id))

  const { data: user, isPending, error } = useUser(id)
</script>

<template>
  <div>
    <Heading>
      <template v-if="user">
        {{ user.firstName }} {{ user.lastName }}
      </template>

      <template v-else>
        {{ $t('features.heading.user', [id]) }}
      </template>
    </Heading>

    <Load
      model="user"
      :error="error"
      :is-pending="isPending"
    >
      <RouterView v-slot="{ Component }">
        <PageTransition>
          <component
            :is="Component"
            :user="user"
          />
        </PageTransition>
      </RouterView>
    </Load>
  </div>
</template>
