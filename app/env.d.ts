/// <reference types="vite/client" />

declare const __I18N_VERSION__: string

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_STRIPE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "*.vue" {
  import type { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}
