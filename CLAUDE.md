<vue-guidelines>

=== foundation rules ===

# Vue Guidelines

## Foundational Context

This application is a Vue 3 SPA in strict TypeScript, built with Vite, Tailwind and Vue Router. Two apps, `app` and `admin`, share `shared/`. There is no SSR. Always use the APIs that match the installed major version of each package, do not assume a version.

Before relying on a package's API, check its installed version in `package.json`.

## Conventions

- You must follow all existing code conventions used in this application. When creating or editing a file, check sibling files for the correct structure, approach, and naming.
- Use descriptive names for variables, functions, and components.
- Check `shared/components/common/` and `shared/composables/` for something to reuse before writing a new one.
- This is a reference codebase. Prefer correct, ecosystem-standard patterns over what is good enough for the current size.

## Application Structure & Architecture

- Stick to the existing directory structure; don't create new base folders without approval.
- Shared code belongs in `shared/`. `app/src` and `admin/src` hold only what is specific to that app.
- Do not change the application's dependencies without approval.

## Dev Environment

- Dev is Dockerized on Node 22. Use the `./dev` script for container commands.

## Documentation Files

- You must only create documentation files if explicitly requested by the user.

=== project rules ===

# Project Rules

- This project contains committed, area-grouped rules in `.ai/rules`. Before you enter plan mode or create/edit any file, you MUST first: open @.ai/rules/index.md (it maps file globs to rule files), read every rule file whose globs cover the path(s) in scope, and run `grep -rin 'keyword' .ai/rules` to catch what a path match alone misses. Do not write code until you have read and are following every matching rule.

=== vue rules ===

# Vue

- Use the Composition API with `<script setup lang="ts">`.
- Indent with 2 spaces. In SFCs, indent `<script>` and `<style>` content one level.
- A self-closing element with exactly one attribute goes on one line. Two or more attributes stay multi-line, one per line. Never collapse an element that has child content.
- One space on each side of `=` and `:`.
- Doc blocks use the multi-line `/** */` format, wrapped around 72 to 75 characters, with no dashes in the prose.
- Icons come from `@lucide/vue` and use the `Icon` suffix (`PlusIcon`).

</vue-guidelines>

## Commands

- Commands are strict behavioral governors. Follow them exactly. Do not anticipate the next command. Do not perform any action not explicitly commanded.
- `/bs` - brainstorm, break down the problem, no changes
- `/su` - summarize required changes, no code changes
- `/ex` - implement what was already agreed
- `/cm` - generate a one-line commit message
- `/co` - commit staged changes
- `/q` - side bar question, no code scan
- `/flow` - compare a flow doc against this repo, no changes
- Full behavior for each is defined in `.claude/commands/`. Each command file governs the turn it is invoked in.
- If no command is given, respond only. Reading files is allowed. Never write or edit files.
- When in doubt, STOP and ask. Never assume the next step.
- NEVER write or edit any file unless the most recent message is an explicit `/ex`. No other phrasing counts. Not "do it", not "go ahead", not "implement", not "go", not "go for it", not "ok do it", not "make it", not "write it", not "add it", not questions, not problem descriptions, not bug reports, not anything else. If in doubt, do NOT write.
- NEVER run verification commands yourself. No linters, no typecheck, no build, no dev server, no install, no test runners. The user runs those. You may write and edit the files they check, just never run them.   <- Vue only
- NEVER change the state of the git repo (except via `/co`). No commits, no branches, no merges, no rebases, no resets, no pushes, no pulls, no staging. Read-only inspection is allowed: `git diff`, `git status`, `git log`, `git show`.
- "Can you", "could you", "would you", and any question form is NOT a command. It is a request for a description.