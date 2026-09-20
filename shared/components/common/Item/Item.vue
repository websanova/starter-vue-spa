<script setup lang="ts">
  import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@shared/components/ui/item'
</script>

<template>
  <Item class="flex-nowrap px-0 not-last:border-b-border">
    <ItemMedia
      v-if="$slots.icon"
      class="self-center! translate-y-0!"
    >
      <slot name="icon" />
    </ItemMedia>

    <ItemContent class="min-w-0">
      <ItemTitle class="max-w-full">
        <span class="truncate">
          <slot name="title" />
        </span>
      </ItemTitle>

      <slot />
    </ItemContent>

    <ItemActions v-if="$slots.actions">
      <slot name="actions" />
    </ItemActions>
  </Item>
</template>
