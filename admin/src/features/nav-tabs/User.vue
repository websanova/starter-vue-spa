<script setup lang="ts">
  import { NavTab, NavTabs } from '@shared/components/common/NavTabs'
</script>

<template>
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
</template>
