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
- `TransitionSite` / `TransitionLayout` / `TransitionPage` gate their reveal on this tiered state, and accept an `isLoading` prop so a specific layout or page can feed in its own async work - queries, preloaded models, whatever else it needs - on top of the built-in tiers
- One shared cover/transition mechanism instead of per-page spinners

**i18n Loading**
- Locale files loaded per tier (site / layout / page) from route meta, lazy-fetched only for files not already cached for the active locale
- Feeds into the same load-state tiers as content, so a page isn't revealed until its translations have actually loaded
- Locale switching replays the currently-loaded file set against the new locale, skipping anything already cached
