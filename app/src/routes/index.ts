import type { RouteRecordRaw } from "vue-router"
import Index from "@/views/Index.vue"

const routes: RouteRecordRaw[] = [
  { path: "/", name: "index", component: Index }
]

export default routes
