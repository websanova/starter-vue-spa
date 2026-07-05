import { createApp } from "vue"
import App from "./App.vue"
import { createHttp } from "@shared/plugins/http"
import { createI18n } from "@shared/plugins/i18n"
import { createMeta } from "@shared/plugins/meta"
import { createQueryClient } from "@shared/plugins/query"
import { createRouter } from "@shared/plugins/router"
import { createStore } from "@shared/plugins/store"
import { createValidation } from "@shared/plugins/validation"
import { registerModuleReload } from "@shared/lib/moduleReload"

createApp(App)
  .use(createHttp)
  .use(createI18n)
  .use(createMeta)
  .use(createQueryClient)
  .use(createRouter)
  .use(createStore)
  .use(createValidation)
  .mount("#app")

registerModuleReload()
