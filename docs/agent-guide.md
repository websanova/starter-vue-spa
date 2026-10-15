# Agent Setup

## Commands

Not all agents support commands, currently only setup with Claude Code via `.claude/commands/` folder and a definition list in `CLAUDE.md`.

Most exist to gate what an agent can do in a turn, so brainstorming or summarising happens without touching files, and writes stay behind an explicit `/ex`. Kill or modify them as needed for your workflow.

One to be aware of is `/flow` which reads specs from the separate flows repo and compares them against this one rather than working from the code alone. It needs to know where the flows repo lives, see [Flows Guide](flows-guide.md).

## Guidelines

The `<vue-guidelines>`, `<behavior-guidelines>` and `<command-guidelines>` blocks in `CLAUDE.md` are a generic starting point, included as a reference for new projects. They cover the stack, response style, accuracy, code output and the command gating, and reflect one way of working. Tweak them as needed, delete them, or move them to a git ignored `CLAUDE.local.md` or your personal `~/.claude/CLAUDE.md` if they should follow you across projects instead of living in the repo. Nothing regenerates them, so edits stay put.

## Rules

Rules aren't universal. Cursor picks up `.ai/rules` natively by glob, but Claude has no such concept. The `<vue-guidelines>` block imports `@.ai/rules/index.md`, so the index does get loaded for real, but the rule files it points at don't. Getting to those is just an instruction the agent is asked to follow, so be wary of assuming they were picked up.
