<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import UserEdit from '@/features/forms/UserEdit.vue'

  // TODO: Update avatar
</script>

<template>
  <div>
    <Heading>
      {{ $t('features.lbl.profile') }}
    </Heading>

    <UserEdit />
  </div>
</template>
