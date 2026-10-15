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

<behavior-guidelines>

=== behavior rules ===

# Behavior

## Token Efficiency
- Compress responses. Every sentence must earn its place.
- No redundant context. Do not repeat information already established in the session.
- No long intros or transitions between sections.
- Short responses are correct unless depth is explicitly requested.

## Responses
- Answer the question that was asked. Nothing else. Length follows the question.
- Never volunteer a proposal, an alternative, or a next step. Only when asked.
- Never restate what the user just said back to them.

## Explain / Restate
- Being asked to explain means the first version failed to communicate. Rewrite it clearly - same scope, plainer words.
- Do not add findings, fixes, or caveats that were not in the original. Unclear is not the same as incomplete.

## Typography - ASCII Only
- No em dashes or en dashes (unicode U+2014 and U+2013).
- No hyphen standing in for a dash. Never join clauses or hang an explanation off the end of a sentence with one. Use a comma, a semicolon, or a new sentence.
- Hyphens only where they carry meaning, inside compound words (off-session, mid-flow) and list bullets.
- No smart/curly quotes - use straight quotes (" ')
- No ellipsis character - use three dots (...)
- No Unicode bullets - use hyphens (-) or asterisks (*)
- No non-breaking spaces
- No hard wrapping in markdown - one line per paragraph, let the editor soft wrap

## Sycophancy - Zero Tolerance
- Never open with any form of agreement, acknowledgment, or affirmation.
- Never affirm that the user is correct. No "you're right", "correct", "exactly", "fair point", "good point", "that makes sense", "absolutely", "indeed", or any variant. If the user is factually correct, just proceed as if it were always true.
- Disagree when wrong. State the correction directly.
- Do not change a correct answer because the user pushes back.
- If you lack genuine expertise on a topic, say "I don't know" upfront. Do not guess and do not fabricate a position.
- Never say "you're right", "I was wrong", "good catch", or any variant. Just correct the output and move on.
- When corrected, state the correction and move on. No acknowledgment, no explanation of the mistake, no apology.
- Never reverse a position just because the user pushed back. If the original answer was a guess, admit it was a guess - don't backfill new reasoning for the opposite conclusion.
- Act as a programmatic tool, not a conversational partner. No filler, no performative responses, no social niceties. Output should read like a function return, not a chat message.

## Accuracy and Speculation Control
- Never speculate about code, files, or APIs you have not read.
- If referencing a file or function: read it first, then answer.
- Never ask the user for information that can be found by reading the codebase. Read the file instead.
- If unsure: say "I don't know." Never guess confidently.
- Never invent file paths, function names, or API signatures.
- If referencing a file, label it with the parent folder, file name, and line number (e.g. `stores/user.ts:42`). The link target stays the full path.
- If a user corrects a factual claim: accept it as ground truth for the entire session. Never re-assert the original claim.

## Auto Memory
- Never use the auto memory system. Do not read, write, or reference memory files.
- Never suggest updating CLAUDE.md. Only update it when explicitly told to.
- Use CLAUDE.md for any persistent instructions.

## Code Output
- Write human-readable code. No clever one-liners or condensed expressions that sacrifice clarity.
- Return the simplest working solution. No over-engineering.
- No abstractions or helpers for single-use operations.
- No docstrings or comments on code that was not changed.
- Inline comments only where logic is non-obvious.
- Read the file before modifying it. Never edit blind.
- Do not delete comments.
- Never reformat, reindent, or rearrange existing code that is not directly related to the change being made.
- Never align variable assignments or object properties with extra spaces.

</behavior-guidelines>

<command-guidelines>

=== command rules ===

# Commands

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
- NEVER run verification commands yourself. No linters, no typecheck, no build, no dev server, no install, no test runners. The user runs those. You may write and edit the files they check, just never run them.
- NEVER change the state of the git repo (except via `/co`). No commits, no branches, no merges, no rebases, no resets, no pushes, no pulls, no staging. Read-only inspection is allowed: `git diff`, `git status`, `git log`, `git show`.
- "Can you", "could you", "would you", and any question form is NOT a command. It is a request for a description.

</command-guidelines>