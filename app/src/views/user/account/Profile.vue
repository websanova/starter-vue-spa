<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import UserEditForm from '@/features/forms/UserEdit.vue'

  // TODO: Update avatar
</script>

<template>
  <div>
    <Heading>
      {{ $t('features.lbl.profile') }}
    </Heading>

    <UserEditForm />
  </div>
</template>
