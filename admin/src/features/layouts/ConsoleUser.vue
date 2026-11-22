<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useUser } from '@/composables/api/users'
  import UserHeading from '@/features/headings/User.vue'
  import UserNavTabs from '@/features/nav-tabs/User.vue'
  import { Load } from '@shared/components/common/Load'
  import PageTransition from '@shared/features/transitions/Page.vue'

  const route = useRoute()

  const id = computed(() => Number(route.params.user_id))

  const { data: user, isPending, error } = useUser(id)
</script>

<template>
  <div>
    <UserHeading
      :placeholder="$t('features.heading.title.user', [id])"
      :user="user"
    >
      <!-- Each tab route names its own heading actions as the "actions" view. -->
      <template #actions>
        <RouterView
          v-if="user"
          name="actions"
        />
      </template>
    </UserHeading>

    <Load
      i18n-key="features.load.nouns.user"
      :error="error"
      :is-pending="isPending"
    >
      <UserNavTabs :margin="route.meta.tabs?.margin ?? true" />

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
