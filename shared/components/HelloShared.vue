<script setup lang="ts">
import { cn } from "@shared/lib/utils"

defineProps<{
    message: string
}>()
</script>

<template>
    <div :class="cn('rounded-lg border bg-primary px-4 py-2 text-primary-foreground')">
        {{ message }}
    </div>
</template>
