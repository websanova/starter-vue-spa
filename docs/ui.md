# UI Components

shadcn-vue (Vue 3 port of shadcn) for components, built on reka-ui (Vue port of
Radix). Components are copied into `shared/components/ui/` and shared by both apps.

## Add a component

Run inside either app, output goes to the shared folder via `components.json`.

```bash
docker compose exec node yarn shadcn-vue add spinner --cwd app
./dev yarn shadcn-vue add spinner --cwd app
```

## Icons

Default set is `@lucide/vue`. Icon names carry an `Icon` suffix. Size from the
parent with `size-*`:

```html
<SearchIcon class="size-4" />
```

Lucide glyphs have ~2px internal padding, so a hard left-aligned icon shows a small
gap. Cancel it with a negative margin:

```html
<SearchIcon class="size-4 -ml-0.5" />
```
