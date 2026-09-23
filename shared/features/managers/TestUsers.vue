<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { FlaskConicalIcon } from '@lucide/vue'
  import { Button } from '@shared/components/ui/button'
  import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@shared/components/ui/dropdown-menu'

  const route = useRoute()

  const rosters: Record<string, Record<string, { email: string, password: string, key: string }[]>> = {
    app: {
      'auth-login': [
        {
          email: 'empty@starter.com',
          password: 'testtest',
          key: 'empty',
        },
        {
          email: 'small@starter.com',
          password: 'testtest',
          key: 'small',
        },
        {
          email: 'medium@starter.com',
          password: 'testtest',
          key: 'medium',
        },
        {
          email: 'large@starter.com',
          password: 'testtest',
          key: 'large',
        },
      ],
    },
    admin: {
      'auth-login': [
        {
          email: 'super@starter.com',
          password: 'testtest',
          key: 'super',
        },
        {
          email: 'admin@starter.com',
          password: 'testtest',
          key: 'admin',
        },
      ],
    },
  }

  const testUsers = computed(() => rosters[import.meta.env.VITE_TEST_USERS]?.[route.name as string] ?? [])

  const isVisible = computed(() => testUsers.value.length > 0)

  /**
   * vee-validate binds through v-model, so assigning the value alone changes
   * nothing. The input event is what the compiled handler listens for.
   */
  function fill(name: string, value: string) {
    const el = document.querySelector<HTMLInputElement>(`input[name="${name}"]`)

    if (!el) {
      return
    }

    el.value = value
    el.dispatchEvent(new Event('input', { bubbles: true }))
    el.dispatchEvent(new Event('blur', { bubbles: true }))
  }

  function select(user: { email: string, password: string }) {
    fill('email', user.email)
    fill('password', user.password)
  }
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed bottom-4 left-4 z-50"
  >
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          size="sm"
          class="bg-blue-600 text-white hover:bg-blue-700"
        >
          <FlaskConicalIcon />

          {{ $t('features.manager.test_users.title') }}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top"
        align="start"
        class="w-72"
      >
        <DropdownMenuItem
          v-for="user in testUsers"
          :key="user.email"
          class="flex-col items-start gap-0"
          @select="select(user)"
        >
          <span class="font-medium">
            {{ user.email }} / {{ user.password }}
          </span>

          <span class="text-xs text-muted-foreground">
            {{ $t('features.manager.test_users.' + user.key) }}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
