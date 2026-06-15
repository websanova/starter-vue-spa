---
description: App structure, shared vs app boundary, and where code lives
globs:
  - app/src/**
  - admin/src/**
  - shared/**
alwaysApply: false
---

# App Architecture

Feature-based structure. Group by domain, not by file type. There is no top-level `services/`, `stores/`, `types/`, or `components/` folder; those dissolve into feature slices or the shared layer.

## App layout

```
<app>/src/
  main.ts           # entry
  App.vue           # root
  router/           # route definitions
  views/            # route-level screens; compose features, hold route concerns
  features/         # feature slices (see features.md)
  composables/      # app-wide cross-feature composables; often empty
  lib/              # app-wide cross-feature utilities; often empty
```

- **views/** are pages. A view handles route params, kicks off loading, and composes feature UI. Thin orchestrator, no domain logic, no HTTP. Logic lives in feature composables.
- **features/** hold everything domain-bound (data + UI). One slice per domain.
- **composables/** and **lib/** are the rare app-specific cross-feature tier. Do not create files here preemptively. Generic, app-agnostic helpers go to `shared/`, not here.

## Shared vs app

Share mechanism, not meaning.

- **`shared/`** holds cross-app, domain-agnostic code: `lib/http`, `composables/useApi`, generic UI composables (`useModal`, `usePagination`), and the `components/ui` + `components/common` layers.
- **Domain code is per app.** Two apps with different endpoints and shapes do not share a domain type or service. Duplicating a few field declarations beats a shared abstraction between consumers that diverge.
- Promote something to `shared/` only when it is genuinely identical across apps and has no domain opinion. A shared domain type is justified only when it is a single, stable contract (ideally generated from a backend spec), never hand-maintained for two diverging consumers.

## Composable tiers

- **`shared/composables/`** - generic, no domain opinion, both apps use them (`useApi`, `useModal`, `usePagination`). Most reusable composables land here.
- **`<app>/src/composables/`** - app-wide but app-specific, used by several domains in one app. Uncommon; the folder is often empty.
- **`features/<domain>/model/`** - domain-bound (`useBookmarks`). Lives in its slice.

## Slice boundaries

- Own lifecycle = own slice. A thing with its own endpoints, screens, and meaning independent of another resource is its own feature (categories and tags are separate slices, not folded into bookmarks).
- A sub-action on a resource stays in the owning slice (favoriting a bookmark lives in `features/bookmarks`, not its own slice).
- Cross-feature references are one-directional and shallow. `bookmarks` may import a `Category` type from `features/categories`; the reverse creating a cycle is a smell.
- If shared domain models cause circular imports between features, extract them into an `entities/` layer both features import, keeping actions in `features/`. Not needed until circulars actually appear.
