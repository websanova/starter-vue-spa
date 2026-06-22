<!-- <script setup lang="ts">
  import { useForm } from "vee-validate"
  import { toTypedSchema } from "@vee-validate/zod"
  import { Button } from "@shared/components/ui/button"
  import { applyServerErrors } from "@shared/lib/serverErrors"
  import { useBookmarks } from "../model/useBookmarks"
  import { bookmarkSchema } from "../schema"

  const emit = defineEmits<{ created: [] }>()

  const { create } = useBookmarks()

  const { handleSubmit, setErrors, errors, defineField, resetForm } = useForm({
    validationSchema: toTypedSchema(bookmarkSchema)
  })

  const [title, titleAttrs] = defineField("title")
  const [url, urlAttrs] = defineField("url")

  const onSubmit = handleSubmit(async (values) => {
    try {
      await create.run(values)
      resetForm()
      emit("created")
    } catch (err) {
      if (!applyServerErrors(err, setErrors)) throw err
    }
  })
</script>

<template>
  <form class="flex w-full max-w-sm flex-col gap-3" @submit="onSubmit">
    <div class="flex flex-col gap-1">
      <input
        v-model="title"
        v-bind="titleAttrs"
        placeholder="Title"
        class="rounded-md border px-3 py-2"
      />
      <p v-if="errors.title" class="text-sm text-destructive">{{ errors.title }}</p>
    </div>

    <div class="flex flex-col gap-1">
      <input
        v-model="url"
        v-bind="urlAttrs"
        placeholder="https://..."
        class="rounded-md border px-3 py-2"
      />
      <p v-if="errors.url" class="text-sm text-destructive">{{ errors.url }}</p>
    </div>

    <Button type="submit" :disabled="create.pending.value">
      {{ create.pending.value ? "Creating..." : "Create bookmark" }}
    </Button>
  </form>
</template>
 -->