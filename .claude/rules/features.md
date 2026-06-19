---
description: Feature slice anatomy, segments, and data flow
globs:
  - app/src/features/**
  - admin/src/features/**
alwaysApply: false
---

# Feature Slices

A feature is one folder per domain holding everything it owns, split into segments that separate concerns.

## Anatomy

```
features/<domain>/
  types.ts            # domain types (yours, not the API's shape)
  api/                # HTTP: calls, DTOs, mappers
    <domain>.ts
  model/              # state + logic
    store.ts
    use<Domain>.ts
  ui/                 # components for this domain
    <Domain>List.vue
    <Domain>Row.vue
```

- Intra-slice imports are relative (`../types`, `./store`, `../api/<domain>`). Use `@core` only for shared infra. This keeps the slice portable.
- The slice is self-contained: delete the folder and the whole feature goes with it.

## Segment responsibilities

- **types.ts** - the domain type, named and shaped how the app wants it. Owned by you. Hand-written (or generated from a backend spec, but still yours, not the raw payload).
- **api/** - the only layer that knows endpoint paths and the wire shape exist. Holds the service object, the DTO, and the mapper. Returns domain types, never DTOs.
- **model/** - `store.ts` (Pinia, pure state container) and `use<Domain>.ts` (orchestration). State that must survive navigation lives in the store. The composable wires service to store and exposes intent.
- **ui/** - components. Import the composable from `model/`. Never call the service or hold persisted state.

## Data flow

One direction: `api` (HTTP + DTO + mapper) -> `model/store` (state) -> `model/composable` (orchestration) -> `ui` / view (render).

- No HTTP outside `api/`. No `fetch`/axios in stores, composables, or components.
- No persisted state outside the store. A composable's `useApi` loading is ephemeral; anything that must survive navigation goes in the store.
- The DTO never leaves `api/`. It is a file-local `interface`, not exported. Only the domain type crosses the boundary.

## DTO and mapper

- **DTO** - the raw API contract (snake_case, string dates, nested or id-based relations). File-local to the service. Hand-written, or generated from an OpenAPI/GraphQL spec when the backend publishes one.
- **Mapper** - `to<Domain>(dto)` converts wire shape to domain shape. Always hand-written; it encodes your decisions (rename, drop unused fields, `string` -> `Date`, nested vs id). Generation never replaces it.
- **Domain type** - the output. Yours.
- Each app pins its own endpoint and DTO. No runtime detection; the service hard-codes the route it talks to.

## Promote when it grows

Start with one file per segment. Split only when a segment earns it.

- One sub-action (e.g. a single `favorite` toggle) stays a method in the resource's `api/<domain>.ts`. Endpoint path shape (`/:id/favorite`) never drives file structure.
- A cluster of related endpoints with its own DTO/logic (favorite, unfavorite, list favorites, bulk) -> a second file in the segment (`api/favorites.ts`), still in the same slice.
- DTO and mappers growing large -> split `api/dto.ts` and `api/mappers.ts` out of the service file.
- A `model/` with several stores or composables -> separate files, same segment.

Do not pre-split. A thirty-line service with a DTO, a mapper, and four calls is fine as one file.
