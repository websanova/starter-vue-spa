/// <reference types="vite/client" />

declare const __I18N_VERSION__: string

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_VERSION: string
  readonly VITE_STRIPE_KEY: string
  readonly VITE_TEST_USERS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
