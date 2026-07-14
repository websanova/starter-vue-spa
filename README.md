# Starter Vue SPA

A Vite + Vue 3 starter with two apps - `app` and `admin` - sharing a central
`shared/` codebase. TypeScript, Tailwind v4, shadcn-vue, Vue Router, yarn workspaces.

## Docs

Full documentation at [websanova.com/docs/starter-vue-spa](https://websanova.com/docs/starter-vue-spa).

- [Docker Setup](docs/docker-setup.md)
- [Dev Commands](docs/dev-commands.md)

## Features

**Dev Environment**
- Dockerized dev environment (Node 22)
- Simple `./run` script for container commands

**Page Transitions**
- Smooth transitions across site, layout, and page changes
- Only the part of the page that actually changed re-transitions
- One shared loading mechanism instead of scattered spinners

**i18n**
- Translations loaded per page, only what's needed
- Pages wait for their translations before showing
- Instant locale switching, cached as you go

**Settings**
- App config loaded from the API, with local overrides per app
- Centralize front-end options like auto-login in one place

**Auth**
- Route-level access for guest, logged-in, and role-based pages
- Login refreshes automatically and extends as you use the app
- Sign back in only after a real stretch of inactivity

**Layouts**
- Layout builder with drop-in blocks: header, footer, body, asides
- Left/right asides, centered content, with or without header/footer
- Covers the common cases: auth pages, error pages, centered empty states

**Components**
- shadcn-vue plus custom components, drop in and customize

**Cover Loading**
- Branded loading screen shown before the app bundle loads
- Seamless startup for heavier apps with a large initial payload

**Mobile**
- Fully mobile-friendly out of the box
- Slide-out menus and responsive navigation

**Dark Mode**
- Light and dark themes, remembered across visits
- Correct theme shown immediately, no flash on load