<script setup lang="ts">
import HelloShared from "@shared/components/HelloShared.vue"
import { Button } from "@shared/components/ui/button"
import { Rocket } from "lucide-vue-next"
</script>

<template>
  <main class="min-h-screen flex flex-col items-center justify-center gap-4">
    <h1 class="text-2xl font-bold">App</h1>
    <HelloShared message="Hello from the app" />
    <Button>
      <Rocket />
      Get started
    </Button>
  </main>
</template>
