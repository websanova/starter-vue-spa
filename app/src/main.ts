import { createApp } from "vue"
import App from "./App.vue"
import { createHttp } from "@shared/plugins/http"
import { createQueryClient } from "@shared/plugins/query"
import { createRouter } from "@shared/plugins/router"
import { createStore } from "@shared/plugins/store"

createApp(App)
  .use(createHttp)
  .use(createQueryClient)
  .use(createRouter)
  .use(createStore)
  .mount("#app")
