---
description: Styling conventions (theme tokens, radius, color, spacing)
globs:
  - shared/assets/**
  - shared/components/**
  - app/src/**
  - admin/src/**
alwaysApply: false
---

# Styling

Route every re-skinnable property through the layer the ecosystem already uses for it. Tokenize what shadcn tokenizes; use the raw Tailwind scale for what it does not.

## Theme tokens (radius, color)

shadcn vendored components consume the theme tokens (`--radius`, the color vars), so changing a token cascades through both the vendored `ui/` layer and your own components in one place.

- Radius: always the token-backed utilities (`rounded-sm`, `rounded-md`, `rounded-lg`). Never an arbitrary literal (`rounded-[12px]`).
- Color: always semantic classes (`bg-primary`, `text-muted-foreground`, `border-input`). Never a raw hex (`bg-[#1a1a1a]`).
- Override a token by redeclaring it in `main.css` after the imports. Never edit the vendored `ui/` layer to re-skin.
- An arbitrary radius/color literal is a deliberate, permanent opt-out of theming. Rare, and a smell unless intentional.

## Spacing

shadcn does not tokenize spacing. Its components ship raw Tailwind scale utilities (`p-6`, `gap-4`). A custom spacing token (`--spacing-gutter`) would only move your components, never the vendored ones, splitting the app into two vocabularies for the same value. So spacing stays on the raw scale, matched to shadcn's defaults, and consistency comes from this convention rather than a token.

- Use the Tailwind scale only. No arbitrary literals (`p-[23px]`).
- Map intent to a fixed scale step, applied consistently so authored components match the vendored ones:
  - Container padding (cards, dialogs, covers): `p-6`
  - Gap between stacked siblings: `space-y-4` on the parent (no trailing margin), or `gap-4` with flex
  - A single element's own trailing gap: `mb-4`
  - Section rhythm between page blocks: `py-16`
- Prefer `space-y-*` / `gap-*` on a container over `mb-*` on each child when spacing a stack. Reach for `mb-*` only for a one-off single-element gap.
- These steps mirror shadcn's own defaults so vendored and authored components read at the same rhythm.
