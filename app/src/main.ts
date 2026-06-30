import { createApp } from "vue"
import App from "./App.vue"
import { createHttp } from "@shared/plugins/http"
import { createI18n } from "@shared/plugins/i18n"
import { createQueryClient } from "@shared/plugins/query"
import { createRouter } from "@shared/plugins/router"
import { createStore } from "@shared/plugins/store"

createApp(App)
  .use(createHttp)
  .use(createI18n)
  .use(createQueryClient)
  .use(createRouter)
  .use(createStore)
  .mount("#app")
