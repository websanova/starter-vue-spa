<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import AvatarForm from '@/features/profile/Avatar.vue'
  import EditForm from '@/features/profile/Edit.vue'
</script>

<template>
  <div>
    <Heading>
      {{ $t('features.lbl.profile') }}
    </Heading>

    <AvatarForm />

    <EditForm />
  </div>
</template>
