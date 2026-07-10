# Starter Vue SPA

A Vite + Vue 3 starter with two apps - `app` and `admin` - sharing a central
`shared/` codebase. TypeScript, Tailwind v4, shadcn-vue, Vue Router, yarn workspaces.

## Docs

Full documentation at [websanova.com/docs/starter-vue-spa](https://websanova.com/docs/starter-vue-spa).

- [Docker Setup](docs/docker-setup.md)
- [Dev Commands](docs/dev-commands.md)

## Features

**Dev Environment**
- Dockerized (Node 22)
- `./run` script for container commands

**Page Transitions**
- Tiered load-state (site / layout / page) driven by route meta, so nested routes only re-trigger the transition for the tier that actually changed
- `SiteTransition` / `LayoutTransition` / `PageTransition` gate their reveal on this tiered state, and accept an `isLoading` prop so a specific layout or page can feed in its own async work - queries, preloaded models, whatever else it needs - on top of the built-in tiers
- One shared cover/transition mechanism instead of per-page spinners

**i18n**
- Locale files loaded per tier (site / layout / page) from route meta, lazy-fetched only for files not already cached for the active locale
- Feeds into the same load-state tiers as content, so a page isn't revealed until its translations have actually loaded
- Locale switching replays the currently-loaded file set against the new locale, skipping anything already cached

// Settings
- Auto load settings from the api which merge with local settings at the app, admin, shared levels.
- This allows centralization of some front end config options like autoLogin, rememberMeEnabled, autoRefreshTimer, etc..

// Auth
- Support for route meta with "auth" flag to controller authorization flow (logged out/in states, role checks, etc).
- Automatic token refresh for logged in users.

// Authentication Refresh
- on refresh a new token is generated every time extending the login for an additional time interval (for example 2 weeks).
- if the user fails to use the app within that interval, only then are they fully unauthenticated and must login again.
- this can be controlled by the api side to determine how long the token lives for.

// Layouts
- layout builder to quickly setup common layout formats with reusable building block components.
- don't want to be wasting time on these things, header/footer, body with aside, content.
- includes multiple asides (left and right) and easy centering with or without header/footer, aside (left or right aligned, etc).
- thee are common for auth/error pages, and also main user logged in pages where an initial startup "create your first" type button content needs to be initially centered, forms that shouldn't be going full width, but are maxed, etc.

