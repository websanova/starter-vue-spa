<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useUser } from '@/composables/api/users'
  import { Heading } from '@shared/components/common/Heading'
  import { Loading } from '@shared/components/common/Loading'
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

    <Loading v-if="isPending" />

    <p v-else-if="error">
      {{ $t('features.error.user_load', [error.message]) }}
    </p>

    <RouterView
      v-else
      v-slot="{ Component }"
    >
      <PageTransition>
        <component
          :is="Component"
          :user="user"
        />
      </PageTransition>
    </RouterView>
  </div>
</template>
