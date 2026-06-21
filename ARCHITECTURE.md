# Architecture

## Folder Layout

- app/
  - src/
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
      - api/
        - useBookmark.ts(actions: create, index, get, delete, update, destroy, restore, etc.)
    - features/
      -
    - models/
      - bookmark.ts
      - user/ # if you need to break it down use a folder.
        - item.ts
        - list.ts
        - index.ts
    - routes/
    - services/ # not composable, they are reusable patterns
      - polling/ # put any reusable pollers here, which can then be pulled in and used as need be across components.
        - bookmark.ts
        - updates.ts
        - index.ts
    - validators/
      - bookmark.ts # exports bookmarkRules
      - user.ts # exports userRules
    - views/
      - App.vue
    - widgets/
      - UserList.vue
  - main.ts
- shared/
  - adapters/
    - api.ts
    - 3rdPartySomething.ts
  - assets/
    - styles/
      - main.ts
      - transitions.ts
  - components/
    - common/
      - item/ # common pain point, create a whole bunch of sub component leg blocks here this time for reuse
    - icon/
    - logo/
    - ui/
  - composables/
    - helpers/
      - useItemStore.ts # not a store => composable if it's create new stores
      - useItemsStore.ts # same as above.
    - orchestrator/
      - useInfinite.ts # exports infiniteAdapter
      - usePaginator.ts # exports paginatorAdapter
      - usePolling.ts # exports pollingAdapter
    - support/
      - useLoaded.ts # composable because the wrapper function is always unique even though it references tores.
  - stores/ # defineStore is a composable but the resulting object/proxy is not a composable, these are reusable.
    - useAuthStore.ts
    - useContentStore.ts
    - useDarkModeStore.ts
    - useI18nStore.ts
  - lib
    - http.ts
  - plugins

## Notes

- Note this is all just kind of in theory for now, but what we're trying to generally work towards (work in progress), so don't take it as set in stone, but more of just a guide. Still always consider best practices and how they might apply here and potentially improve this architecture. Otherwise don't blindly just recommend FSD or some other architecture though you can compare to what other architectures do and how that may apply here.
- When importing components name them with a prefix of their type following the folder/file path. For example: CptItemBookmark.vue, FtrBookmarkSomething.vue WgtBookmarkList.vue and even VwsSomething.vue for views if for whatever reason it's required.
- For the most part we'll want to have exports in the form of useXNoun, like useApiAdapter. This should pretty much always follow unless there is an explicit rule fo rit.
- The shared folder basically just mirrors the local app/admin folders and follows the exact same structure. In theory you should be able to just copy the contents of shared right into the app/src or admin/src and just change the path names.
- The sections below apply to any sub app, "app", "admin", "studio", whatever, using "app" just as the example (but it follows for shared folder as well, so don't get hung up on it when making rules).

## Descriptions

**./composables/adapters/**
- This is basically to just deal with different api responses and turn them into something consistent locally. So we may want some kind of interface and heavy typing here, to make sure the output format always matches. Generally if we have one consistent API response this should be one file basically. But it can happen to have a messy api, or v1, v2, etc. Or even 3rd party apis, so the idea is to help standardize the output into something consistent for our internal app use.
- This then just makes hooking into components much easier if for instance we know our api composables calls are for instance always returning something like errors.parama, errors.paramb, etc.

**./app/src/components/**
- These are bare dummy components with no wiring, all local props and emitters. The idea just being to clean up some logic and give a bit of reusability. For the most part these will be use once only though. However keep in mind some of these like the "item" can get quite complex with parent logic and custom buttons, dropdown, icons, etc, so we just keep it all isolated, easy to find and modify.
- in this folder each component will always use singular, "item", "dialog", etc.
- We want to follow a more shadcn approach and built of lesser single root components (at leas that's the working idea). So when building something more complex like an Item, keep that in mind and try to keep it clean and of sub components for mix and match support (easier said than done).
- Where things get tricky here, in particular with item components is that you'll end up having like 80 to 90 percent similar functionality, but then like different functionality, try not to get too crazy and better to build like on master ItemBookmark, with slots and then ItemBookmarkTypeA and ItemBookmarkTypeB, build them out, rather than having a million status flags by the item type, etc.

Cpt -> Common Component (Component)
Ftr -> Encapsulated Business Unit (Feature)
Wgt -> Composite Multi-Feature Layout (Widget)
Vws -> Top-Level Route Container (View)
UI  -> no prefix those are just raw like Button or whatever.


**./shared/components/**
- Though these overlap the intent with shared is of course for for more reusability. In the app/admin the components will for the most part use building blocks already created here (probably this can be more of a hard rule, but we'll see how it goes).
- Of course these should all be dummy components with props/emits only as well.

**./shared/components/common/**
- For new components built off ui primitives and note that these themselves can be higher level primitives. For instance, the item component is typically a pain point as they can get quite complex with icons, dropdowns, toggles, etc, etc, so we'll want to build these out as more lego blocks here.
- also for a simple example even a ButtonIcon would be a common reusable higher level primitive. Don't cram a bunch of stuff into a single Button.vue components, create variations as specific primitives. There is a danger of going overkill here with something like ButtongDangerIcon, etc, for the most part things like colors/variants, should be props. Otherwise, when building out from smaller primitives, create a new primitive or higher level "common" component.

**./shared/components/icon/**
- for icon, note these should be vue templates following the Google material icons style as 24x24 with about a pixel padding max, otherwise centered icons. Of course it depends on your overall icon choice and design, but the shadcn components are designed around that model more or less.
- also note that these can be a full custom set if need be (though it would require adding all shadcn/ui components that use an icon by default somewhere).

**./shared/components/logo/**
- logo (preferable svg template for easy insert)
- no special rules here, but should be sizeable (color can be hardcoded here as well if necessary, along with dark/light variations).

**./shared/components/ui/**
- Here we have the ui (shadcn or other component framework).
- Generally you don't wanna mess with these too much, but yes, you can change the styling add custom icons, etc (that's the point).

**./composables/**
- Vue convention, a composable is expected to return fresh, isolated state per component invocation.
- On a side note, just using useXSomething does not mean composable, that is just another convention.

**./composables/api/**
- Should all be setup with tan query/http and basically return that interface (at least that's the idea). Though we'll see how that goes in practice with live updates/removals of list items using optimistic, etc.
- Idea here is to just have a mapping for the API without any logic. Basically we're just defining endpoints and methods and grouping them around general concepts like bookmarks. The exposed actions should be like useBookmarkCreate, useBookmarkDelete, useBookmarkRestore, useBookmarkDestroy, etc.
- No special rules on the naming, they can be pretty much grouped up as you like or even in one flat file, in the end it's just importing what functions are needed, so it's just organizational.
- Should have a barrel import anyway and if you wanna really use one file per, then do a subfolder like bookmark/create.ts, etc...

**./composables/helpers/**
- These are kind of utility type functions, calling it "helpers" for now. The use case at the moment is a store factory that generates stores in a consistent format for items and item type displays. No need to constantly define these as they will pretty much all be the same (createItemStore, createItemsStore)

**./composables/orchestrator/**
- Tries to solve the issue of a wrapper around the tan query response. Like if it's an index we'll likely want support for filters (pages, query, etc) and sorting (dir, by), refresh, etc. So we create some generic wrapper for reuse around that.
- We can then also have something like useInfinite.ts for a forever/auto scroll type index.
- Also there are cases we're for instance we'll want to poll for data, this comes up often and is generally wired up the same, so usePolling for something like that with a simple on/off function as all it exposes.
- likely will also contain some onMounted/onUnmounted, etc, but can expose refresh for forced refresh which is sometimes needed (for instance with a read notifications, etc). This should hook in with tan query though and be able to work out the caching/timing issues which should be very nice in this use case.
- These are all just examples for now of what the adapters are for.
- These will likely be in the shared/composables/adapter directory for reuse.

**./composables/support/**
- For the lack of a better term (support for now), this is where some general use wrappers will go. For instance the useLoader to bootstrap the initial app load and covers.
- It can be tricky to determine how to organize here sometimes, like do we create a useDarkMode wrapper around the useDarkModeStore or just use the store directly. In many cases a wrapper just pipes the store so it's really not necessary. So the idea for now is only use these when necessary. Like if you find yourself wiring up a bit too much or more than one store that's a good indicator you should just setup a a support composable.

**./features/**
- Naming here is yet to be sorted out, however the idea is to make these more encapsulated functionality. Like a delete modal with all the wiring for the delete, etc. So we'll have our composables/api hooking up through here.
- The idea however is to still keep these dummy with emits and function exposure. So when they are put in views, NOTHING ever fires off automatically. It will just sit there. The views will be the orchestrators and wire up all the emits and ref functions.
- For the question of how to wire up say duplicate functionality. Say we have a dark mode toggle but say there is an initial login init selection with dark/light Button selection. But then some toggle in settings, whatever, the point is it's visually different but functionally the same. These would be separate features and should share some kind of useDarkMode.ts composable. Otherwise they both get wired up in the feature and likely in settings page it may toggle off a lot of things in that set, so dark mode would just be one of them. Don't over think this and try to modularize the hell out of it via some kind of special dark mode switch or dark mode buttons. In this case the dialog would just wire it up via the composable as well as in the settings.

**./lib**
- For general utils and reusable code.

**./models/**
- this is where we'll define the shape of our resources for local use and how those mappings from external sources will look like. For the most part these will be simple, but if you're mapping something from multiple api's with different response formats, this is where you'll want to map everything.
- So for instance you may define a Bookmark type/interface that defines things from the app side. Then have a toBoomark. But if you have multiple sources, don't over think it unless you have to just setup a toBookmarkFromSourceA, toBookmarkFromSourceB, etc.
- Also, generally keep your item/list data objects separate, don't make one massive Bookmark class for all, keep each resource it's own as list/item will have different level of detail.

**./plugins/**
- Wire up the various plugins needed here, then import them in each app main.ts based on what is needed there.
- But the idea here is to centralize and keep it nicely tucked away.

**./routes/**
- Just the local app routing for vue-router, nothing special here.

**./services/**
- Setup the reusable services like for polling or some kind of stores. Easier to wire it up her and just import that instance that already holds everything.
- We'll see how this goes, but so far I like the idea of it as a centralized gluing area for reuse, rather than playing around too much with provide/inject, etc.

**./stores/**
- pinia stores go here for any special case app tracking we may need. Just dump them right in here, don't over think it.
- If it becomes some kind of reusable thing, just elevate into a composables/helper.

**./validators/**
- Hold any validator logic, this should also like be by model like useBookmark.ts. Though not sure on the structure of this yet, but the idea is to keep the validation more centralized and easy to access, change, rather then peppering it around directly in components. The components just wire once and the rest can be centralized here for easy access.
- for instance a bookmark name could be required, 255, alpha num, etc. Also could contain some custom logic all together, etc.
- Will still need to look into how this works with back-end validation, say for unique email, etc...

**./views**
- Basically the controllers wiring up features.

**./widgets**
- There can be many sub views which you'll need to reuse, we'll call these widgets and they are just groupings of features. For instance you can think of a list of items in an admin list. It's common to have a full items list at root, but also an auto filtered one under user. The user one will be a completely different view, perhaps a subview under tabs in the single user section. Otherwise all the functionality for delete, restore, etc, would be 100% the same. It's basically just a filtered list.
- At this point really we just need a separate composable to feed in for the index, perhaps different starting params, so there is a question of how to set that up in the widget. Perhaps the /user/items sort is different than the root /items sort. The endpoint will be different meaning we'll need a different composable. So do we wire it outside the widget and outside of features, breaking our lite rule, do we create some kind of feature wrappers around that itself, so that the views ultimately always use features, but we'll have some special features/widgets or something This is still an open question, but so far this idea may work, so that views only ever see and wire up features as a hard rule.
- Ultimately widgets are just grouped features, so exposing them as just another feature kind of makes sense.

**shared**
- these should never ever import anything from app/admin, only outwards, never inwards.



## Chat GPT Analysis

Here’s a **tight, practical analysis** of your architecture—focused on what’s solid, what’s risky, and what I’d change.

---

# 👍 What’s strong (keep this)

### 1. Clear separation of concerns (mostly)

You’ve got good boundaries:

* `components/` → dumb UI
* `features/` → behavior bundles
* `views/` → orchestration
* `composables/api` → API layer
* `models/` → data shape
* `shared/` → reuse

👉 This is **very close to a clean layered architecture**, with a bit of FSD influence but not dogmatic. Good.

---

### 2. “Dumb components” rule

This is one of your best decisions.

* Components = props + emits only
* No hidden logic, no side effects

👉 This makes everything:

* testable
* swappable
* predictable

---

### 3. API isolation (`composables/api`)

You’re enforcing:

* no logic
* just endpoints + mapping

👉 This is excellent. Prevents:

* business logic leaking everywhere
* tight coupling to backend

---

### 4. Orchestrator pattern (very good idea)

Your:

* `usePaginator`
* `useInfinite`
* `usePolling`

👉 This is **high leverage abstraction** if done right.

You’re basically building:

> “tanstack query + app-specific behavior wrappers”

That’s smart.

---

### 5. Shared vs App split

Mirroring structure in `shared/` is clean:

* promotes portability
* avoids weird dependency chains

---

# ⚠️ Where things will break (or already will)

### 1. “Everything is a composable” creep

You’re overloading `useX`:

You have:

* actual composables (stateful)
* factories (`useItemStore`)
* adapters
* orchestrators
* wrappers

👉 Problem:
Developers won’t know:

> “Does this create state? reuse state? wrap something?”

#### Fix (important)

Create naming clarity:

| Type               | Example             |
| ------------------ | ------------------- |
| Composable (state) | `useBookmark()`     |
| API                | `useBookmarkApi()`  |
| Adapter            | `bookmarkAdapter`   |
| Factory            | `createItemStore()` |
| Orchestrator       | `useBookmarkList()` |

👉 Drop blind `useX` everywhere.

---

### 2. Features vs Widgets confusion

Right now:

* features = logic bundles
* widgets = grouped features
* views = orchestrators

But…

👉 Widgets are basically **features with layout**

This will get messy fast.

#### Fix

Pick one:

**Option A (cleaner)**

* `features/` = logic + UI bundles
* `widgets/` = layout compositions only

**Option B (better IMO)**
Kill `widgets/`, and:

* features can compose other features

👉 Less mental overhead.

---

### 3. Services vs Composables overlap

You have:

* `services/polling`
* `composables/orchestrator/usePolling`

👉 That’s duplication waiting to happen.

#### Fix

Define rule:

* **services/** = singleton / shared instances
* **composables/** = per-component state

Example:

* `services/polling` → global polling engine
* `usePolling()` → hook into it

---

### 4. Models layer is underpowered (for your goals)

You mention mapping multiple APIs → good

But right now:

* it’s just types + mappers

👉 Missing:

* normalization strategy
* ID consistency
* partial vs full models

#### Fix

Enforce:

```ts
// models/bookmark/item.ts
export interface BookmarkItem {}

// models/bookmark/list.ts
export interface BookmarkListItem {}

// adapters
toBookmarkItem()
toBookmarkListItem()
```

👉 Never reuse the same type for list + item

---

### 5. Component explosion risk (you called it out)

You already see it:

> 80–90% same, slight differences

Your current plan:

> base + variants

👍 correct direction

#### But enforce this rule harder:

* NO prop-driven mega components
* prefer composition + slots

---

### 6. Naming system (prefixes like CptItemBookmark)

Honestly?

👉 This will get annoying fast.

Modern Vue tooling already solves this:

* folder structure
* auto-import
* IDE navigation

#### Suggest:

Drop prefixes, rely on:

```
components/item/Bookmark.vue
```

Import as:

```ts
import BookmarkItem from '@/components/item/Bookmark.vue'
```

Cleaner, less noise.

---

### 7. “Views orchestrate everything” — good but dangerous

You’re enforcing:

> nothing runs automatically

That’s good for control, but:

👉 Risk:

* massive view files
* wiring hell

#### Fix

Allow **feature-level orchestration**

Example:

* feature handles its own API call
* exposes events/hooks

Views:

* configure, not wire everything

---

# 🧠 Architectural identity (what this actually is)

You’ve built a hybrid of:

* **Layered architecture**
* **Feature-driven design (light)**
* **Composable-first Vue pattern**
* **TanStack Query wrapper system**

👉 This is GOOD.

But right now:

> It’s a *framework*, not just an architecture

Which means:

* rules must be stricter
* naming must be tighter

---

# 🔥 High-impact improvements (do these)

### 1. Fix naming consistency

Biggest win.

---

### 2. Simplify mental model

Reduce layers:

Current:

```
components
features
widgets
views
```

Better:

```
components (dumb)
features (smart)
views (pages)
```

---

### 3. Define strict rules for:

* composables vs services
* feature responsibilities
* data flow direction

---

### 4. Introduce “data flow contract”

Right now implicit.

Make it explicit:

```
API → adapter → model → feature → component
```

Never skip layers.

---

### 5. Add “domain ownership”

Right now everything is spread.

Consider:

```
features/bookmark/
  components/
  composables/
  models/
```

👉 reduces cross-folder jumping

---

# 🧾 Final verdict

### Overall: **8/10 (very strong foundation)**

**Strengths**

* Thoughtful separation
* Scalable ideas (orchestrators, adapters)
* UI discipline

**Weak points**

* Naming inconsistency
* Layer overlap (features/widgets/services)
* Potential complexity creep

---

If you want next step:
👉 I can refactor this into a **clean, enforceable rule set + folder structure v2** (minimal, strict, scalable).
