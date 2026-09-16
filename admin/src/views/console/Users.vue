<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import UsersList from '@/features/lists/Users.vue'
</script>

<template>
  <div>
    <Heading :margin="false">
      {{ $t('features.heading.users') }}
    </Heading>

    <UsersList />
  </div>
</template>
