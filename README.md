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

**Routing**
- Load-state tiers (site / layout / page) driven by route meta
- Named routes with `meta.site` / `meta.layout` inheritance


## Architecture

- app/
  - src/
    - adapters/
      - api.ts
      - 3rdPartySomething.ts
    - components/
      - dialog/
        - BookmarkCreate.vue
      - form/
        - BookmarUpdate.vue
      - item/
        - Bookmark.vue
      - title/
        - Bookmark.vue
    - composables/
      - adapter/
        - useInfinite.ts # exports infiniteAdapter
        - usePaginator.ts # exports paginatorAdapter
        - usePolling.ts # exports pollingAdapter
      - api/
        - useBookmark.ts(actions: create, index, get, delete, update, destroy, restore, etc.)
    - features/
      -
    - models/
      - bookmark.ts
      - user/ # if you need to break it down use a folder.
        - detail.ts
        - summary.ts
        - index.ts
    - routes/
    - validators/
      - bookmark.ts # exports bookmarkRules
      - user.ts # exports userRules
    - views/
      - App.vue
    - widgets/
      - UserList.vue
  - main.ts
- shared/
  - assets/
    - main.ts
    - transitions.ts
  - components/
    - common/
    - icons/
    - ui/
  - composables/
    - stores/
      - useAuthStore.ts
      - useContentStore.ts
      - useDarkModeStore.ts
      - useI18nStore.ts
      - useItemStore.ts
      - useItemsStore.ts
    - support/
      - useLoaded.ts
  - lib
    - http.ts
  - plugins


- Note this is all just kind of in theory for now, but what we're trying to generally work towards (work in progress), so don't take it as set in stone, but more of just a guide. Still always consider best practices and how they might apply here and potentially improve this architecture. Otherwise don't blindly just recommend FSD or some other architecture though you can compare to what other architectures do and how that may apply here.
- When importing components name them with a prefix of their type following the folder/file path. For example: CptItemBookmark.vue, FtrBookmarkSomething.vue WgtBookmarkList.vue and even VwsSomething.vue for views if for whatever reason it's required.
- Also all the composables should include a postfix like Adapter, Api, Validator, etc, as there will be many similarly named files like useBookmarkX, etc.
- The shared folder basically just mirrors the local app/admin folders and follows the exact same structure. In theory you should be able to just copy the contents of shared right into the app/src or admin/src and just change the path names.
- The sections below apply to any sub app, "app", "admin", "studio", whatever, using "app" just as the example.

**app/components**
- These are bare dummy components with no wiring, all local props and emitters. The idea just being to clean up some logic and give a bit of reusability. For the most part these will be use once only though. However keep in mind some of these like the "items" can get quite complex with parent logic and custom buttons, dropdown, icons, etc, so we just keep it all isolated, easy to find and modify.

**app/composables/api**
- Should all be setup with tan query/http and basically return that interface (at least that's the idea). Though we'll see how that goes in practice with live updates/removals of list items using optimistic, etc.
- Idea here is to just have a mapping for the API without any logic. Basically we're just defining endpoints and methods and grouping them around general concepts like bookmarks. The exposed actions should be like useBookmarkCreate, useBookmarkDelete, useBookmarkRestore, useBookmarkDestroy, etc.
- No special rules on the naming, they can be pretty much grouped up as you like or even in one flat file, in the end it's just importing what functions are needed, so it's just organizational.

**app/composables/adapter**
- Tries to solve the issue of a wrapper around the tan query simple response. Like if it's an index we'll likely want support for filters (pages, query, etc) and sorting (dir, by), refresh, etc. So we create some generic wrapper for reuse around that.
- We can then also have something like useInfinite.ts for a forever/auto scroll type index.
- Also there are cases we're for instance we'll want to poll for data, this comes up often and is generally wired up the same, so usePolling for something like that with a simple on/off function as all it exposes.
- These are all just examples for now of what the adapters are for.
- These will likely be in the shared/composables/adapter directory for reuse.

**app/composables/formatter**
- This is basically to just deal with different api responses and turn them into something consistent locally. So we may want some kind of interface and heavy typing here, to make sure the output format always matches. Generally if we have one consistent API response this should be one file basically. But it can happen to have a messy api, or v1, v2, etc. Or even 3rd party apis, so the idea is to help standardize the output into something consistent for our api composables.
- This then just makes hooking into components much easier if for instance we know our api composables calls are for instance always returning something like errors.parama, errors.paramb, etc.
- These for the most part will be in the shared/composables/formatter directory for reuse.

**app/composables/lib**
- Generally bucket for reusbale composables or for things where it's not yet clear where they might go. Just dump it in lib, don't over thinkg, move on. Move it later if something comes to mind or makes more sense.

**app/composables/validator**
- Hold any validator logic, this should also like be by model like useBookmark.ts. Though not sure on the structure of this yet, but the idea is to keep the validation more centralized and easy to access, change, rather then peppering it around directly in components. The components just wire once and the rest can be centralized here for easy access.

**app/features**
- Naming here is yet to be sorted out, however the idea is to make these more encapsulated functionality. Like a delete modal with all the wiring for the delete, etc. So we'll have our composables/api hooking up through here.
- The idea however is to still keep these dummy with emits and function exposure. So when they are put in views, NOTHING ever fires off automatically. It will just sit there. The views will be the orchestrators and wire up all the emits and ref functions.
- For the question of how to wire up say duplicate functionality. Say we have a dark mode toggle but say there is an initial login init selection with dark/light Button selection. But then some toggle in settings, whatever, the point is it's visually different but functionally the same. These would be separate features and should share some kind of useDarkMode.ts composable. Otherwise they both get wired up in the feature and likely in settings page it may toggle off a lot of things in that set, so dark mode would just be one of them. Don't over think this and try to modularize the hell out of it via some kind of special dark mode switch or dark mode buttons. In this case the dialog would just wire it up via the composable as well as in the settings.

**app/lib**
- For general utils and reusable code.

**app/routes**
- Just the local app routing for vue-router, nothing special here.

**app/views**
- Basically the controllers wiring up features.

**app/widgets**
- There can be many sub views which you'll need to reuse, we'll call these widgets and they are just groupings of features. For instance you can think of a list of items in an admin list. It's common to have a full items list at root, but also an auto filtered one under user. The user one will be a completely different view, perhaps a subview under tabs in the single user section. Otherwise all the functionality for delete, restore, etc, would be 100% the same. It's basically just a filtered list.
- At this point really we just need a separate composable to feed in for the index, perhaps different starting params, so there is a question of how to set that up in the widget. Perhaps the /user/items sort is different than the root /items sort. The endpoint will be different meaning we'll need a different composable. So do we wire it outside the widget and outside of features, breaking our lite rule, do we create some kind of feature wrappers around that itself, so that the views ultimately always use features, but we'll have some special features/widgets or something This is still an open question, but so far this idea may work, so that views only ever see and wire up features as a hard rule.
- Ultimately widgets are just grouped features, so exposing them as just another feature kind of makes sense.

**shared/composables**
-


