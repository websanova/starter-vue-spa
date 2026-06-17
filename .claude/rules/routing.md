# Routing

Conventions for route definitions and the load-tier meta they carry. Standard vue-router behavior (guards, `void` passthrough, navigation resolution) is assumed and not restated here; only the deviations live below.

## Load tiers via meta

Routes declare two of the three load tiers through meta:

- `meta.site` - the site tier identity.
- `meta.layout` - the layout tier identity.

Both bubble parent to child through vue-router's built-in shallow meta merge. Set a tier on the parent record and every child inherits it unless the child sets its own. Declare each tier at the highest record that owns it; do not repeat it on children.

## Page is the route name

There is no `meta.page`. Page identity is `to.name` directly. Adding a `meta.page` would only duplicate the name.

## Every navigable route has a unique name

Because page identity is the route name, every route a user can navigate to carries a unique `name`. Named routes are also the convention for programmatic navigation.

Exceptions stay nameless:

- Redirect-only records.
- Layout or parent wrapper records that are never navigated to directly. These exist to carry `meta.layout` and hold children, not to be a page.

## No name-pattern sniffing

Tier identity comes from explicit `meta.site`, `meta.layout`, and the route name. Never derive a tier by parsing a structured name string (for example splitting `site-layout-page` on a delimiter). The contract is explicit meta, not a naming format.
