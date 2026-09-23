# Starter Vue SPA

A Vite + Vue 3 starter with two apps - `app` and `admin` - sharing a central
`shared/` codebase. TypeScript, Tailwind v4, shadcn-vue, Vue Router, yarn workspaces.

Part of the Starters, built at [Websanova](https://www.websanova.com).

## Docs

Full documentation at [websanova.com/docs/starter-app](https://www.websanova.com/docs/starter-app).

- [Docker Guide](docs/docker-guide.md)
- [UI Guide](docs/ui-guide.md)
- [Flows Guide](docs/flows-guide.md)

## Projects

| Project | Repo | Demo |
| ------- | ---- | ---- |
| Starter Flows | [starter-flows](https://github.com/websanova/starter-flows) | [flows](https://starter-flows.websanova.com) |
| Starter Laravel API | [starter-laravel-api](https://github.com/websanova/starter-laravel-api) | [api](https://starter-laravel-api.websanova.com) |
| Starter Vue SPA | [starter-vue-spa](https://github.com/websanova/starter-vue-spa) | [app](https://starter-vue-spa-app.websanova.com), [admin](https://starter-vue-spa-admin.websanova.com) |

## Flows

The starter-flows repo is a separate set of feature specs, implementation-agnostic so one spec covers both the API and the app. Nothing here depends on it, but if you point your `CLAUDE.local.md` at a local clone, the `/flow` command will compare any flow against this repo and tell you what's built, what's missing, and what the API still needs.

## Features

* **Auth** - Route-level access for guest, logged-in, and role-based pages, with sessions that refresh as you use the app and only expire after real inactivity.
* **Account Verification** - Users held on a verify screen until confirmed, multiple verifications worked through one at a time, with an optional grace period and reminder banner.
* **Settings** - App config loaded from the API with local per-app overrides, centralizing front-end options like auto-login.
* **Sample CRUD (Bookmarks & Tags)** - Reference list/detail/form views showing the full loop against the API, with ownership scoping and validation errors wired up.
* **Query Params (Search, Filter, Sort, Pagination)** - A reusable composable setup for driving state off the route query, wired up for these out of the box and ready to take any param you add.
* **Components (shadcn-vue)** - shadcn-vue plus custom components copied into `shared/components/ui/`, not a dependency.
* **Layouts** - Layout builder with drop-in blocks for header, footer, body, and asides, covering auth pages, error pages, and centered empty states.
* **Mobile** - Mobile-friendly out of the box with slide-out menus and responsive navigation.
* **Dark Mode** - Light and dark themes remembered across visits, applied immediately with no flash on load.
* **Accessibility (reka-ui)** - Accessible primitives with keyboard nav, focus management, and ARIA, plus screen-reader labels on icon-only controls. Work in progress, not yet fully audited.
* **Dialog Manager** - One host renders every dialog, opened from anywhere by name with typed props, mounted fresh each time so forms never carry stale state.
* **Page Transitions** - Smooth site, layout, and page transitions where only the part that actually changed re-transitions, on one shared loading mechanism.
* **Cover Loading** - Branded loading screen shown before the app bundle loads, so heavier apps start seamlessly instead of flashing a spinner after boot.
* **Scroll Behavior (Vue Router)** - Scroll resets on navigation with back and forward restoring position, plus route grouping to hold scroll across tabbed sections.
* **Localization (vue-i18n)** - Translations loaded and cached per page, locale auto detected on first visit, and signed-in users pulling their saved locale from the API.
* **Timezones** - Times shown in the user's timezone and adjusted on the fly, auto detected at registration and restored from the API across devices.
* **Test Users** - Dev-only control on the login screen that fills the form with a seeded account, with separate rosters for app and admin behind a single env variable.
* **Dev Environment** - Dockerized dev environment on Node 22 with a simple `./dev` script for container commands.

For the full breakdown, see the [features overview](https://websanova.com/docs/starter-app/intro/features).

## License

MIT - see [LICENSE](LICENSE).

---

Built and maintained by Rob at [Websanova](https://www.websanova.com). I take freelance and contract work, including MVP projects built on the Starters. Check out the [hire page](https://www.websanova.com/hire) for more info.
