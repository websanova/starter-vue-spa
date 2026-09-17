<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useUser } from '@/composables/api/users'
  import { Heading } from '@shared/components/common/Heading'
  import { Load } from '@shared/components/common/Load'
  import { NavTab, NavTabs } from '@shared/components/common/NavTabs'
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
      <NavTabs class="mb-3">
        <NavTab :to="{ name: 'user-users-show-edit' }">
          {{ $t('features.lbl.edit') }}
        </NavTab>

        <NavTab :to="{ name: 'user-users-show-info' }">
          {{ $t('features.lbl.info') }}
        </NavTab>

        <NavTab :to="{ name: 'user-users-show-billing' }">
          {{ $t('features.lbl.billing') }}
        </NavTab>

        <NavTab :to="{ name: 'user-users-show-bookmarks' }">
          {{ $t('features.lbl.bookmarks') }}
        </NavTab>
      </NavTabs>

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
