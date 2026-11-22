export { default as NavTab } from "./NavTab.vue"
export { default as NavTabs } from "./NavTabs.vue"

declare module "vue-router" {
  interface RouteMeta {
    /**
     * How the NavTabs of a tabbed layout sit above the active tab. A tab
     * whose content brings its own top padding, such as a list of Items,
     * turns the margin off. Tabs that declare nothing keep it.
     */
    tabs?: {
      margin?: boolean
    }
  }
}
