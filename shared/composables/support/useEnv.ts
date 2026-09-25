/**
 * Single read point for build and deploy time configuration. Every
 * import.meta.env and define lookup in the app goes through here so the
 * Vite specific access is contained to one file.
 *
 * Exposed as a function rather than a const object so callers evaluate
 * their values at call time. A const would freeze i18nVersion on first
 * evaluation, and it would also have to be rewritten at every call site
 * to move onto a host whose config is only readable from inside an app
 * context.
 */
export function useEnv() {
  return {
    apiUrl: import.meta.env.VITE_API_URL ?? '',
    appVersion: import.meta.env.VITE_APP_VERSION,
    /**
     * Cache buster for the fetched locale files. Pinned to the build id in
     * production so a deploy invalidates them, and per call in development
     * so an edited file is never served stale.
     */
    i18nVersion: import.meta.env.PROD ? __I18N_VERSION__ : Date.now(),
    stripeKey: import.meta.env.VITE_STRIPE_KEY,
    testUsers: import.meta.env.VITE_TEST_USERS,
  }
}
