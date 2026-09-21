<script setup lang="ts">
  import { nextTick, ref, watch } from 'vue'
  import { SearchIcon, XIcon } from '@lucide/vue'
  import { onClickOutside, useElementBounding, watchDebounced } from '@vueuse/core'
  import { useSettingsStore } from '@shared/stores/settings'
  import { Button } from '@shared/components/ui/button'
  import { Input } from '@shared/components/ui/input'

  defineProps<{
    placeholder?: string
  }>()

  const model = defineModel<string>({ default: '' })

  const settings = useSettingsStore()

  // The inputs bind to a local ref so typing stays instant, and the model
  // only catches up once the user pauses. The watch back the other way keeps
  // the inputs in step when the term is cleared from outside.
  const value = ref(model.value)

  // What this component last wrote, so the sync back can tell an outside
  // clear from its own echo and leave a half typed term alone.
  let pushed = model.value

  const open = ref(false)
  const root = ref<HTMLElement>()
  const input = ref<InstanceType<typeof Input>>()

  const { bottom } = useElementBounding(root)

  // Anything under the minimum writes an empty term rather than skipping, so
  // backspacing out of a search drops the filter instead of leaving stale results.
  watchDebounced(value, (next) => {
    pushed = next.length >= settings.data.searchMinLength ? next : ''
    model.value = pushed
  }, { debounce: 300 })

  watch(model, (next) => {
    if (next === pushed) {
      return
    }

    value.value = next ?? ''
  })

  onClickOutside(root, () => {
    open.value = false
  })

  async function onToggle() {
    open.value = !open.value

    if (open.value) {
      await nextTick()
      input.value?.$el.focus()
    }
  }

  function onClose() {
    open.value = false
    value.value = ''
    pushed = ''
    model.value = ''
  }
</script>

<template>
  <div
    ref="root"
    class="relative flex items-center"
  >
    <Input
      class="sm:unhidden w-[150px]"
      v-model="value"
      type="text"
      enterkeyhint="search"
      :placeholder="placeholder"
    />

    <Button
      class="sm:hidden"
      size="icon"
      variant="outline"
      @click="onToggle"
    >
      <SearchIcon />
    </Button>

    <!--
      Mobile only. Fixed so the panel spans the full viewport width whatever
      the button's position in its row. Fixed can't anchor to the button on
      its own, so the button's measured bottom is fed in as --panel-top,
      clamped so scrolling never carries it up over the header.
      From sm the input above sits inline instead.
    -->
    <div
      v-if="open"
      class="fixed inset-x-3 top-[var(--panel-top)] z-50 flex items-center gap-2 rounded-md border bg-popover p-2 text-popover-foreground shadow-md sm:hidden"
      :style="{ '--panel-top': `max(${bottom + 16}px, calc(var(--app-header-h, 3rem) + 8px))` }"
    >
      <Input
        ref="input"
        class="flex-1"
        v-model="value"
        type="text"
        enterkeyhint="search"
        :placeholder="placeholder"
        @keydown.escape="open = false"
      />

      <Button
        class="size-7 [&_svg]:size-5 hover:bg-transparent"
        size="icon"
        variant="ghost"
        @click="onClose"
      >
        <XIcon />
      </Button>
    </div>
  </div>
</template>
