<script setup lang="ts">
  import RootLayout from '@shared/features/layouts/Root.vue'
  import DialogsManager from '@shared/features/managers/Dialogs.vue'
  import TestUsersManager from '@shared/features/managers/TestUsers.vue'
  import { Toaster } from '@shared/components/ui/sonner'
</script>

<template>
  <RootLayout />
  <Toaster />
  <DialogsManager />
  <TestUsersManager />
</template>
