---
description: Compare a flow doc against this repo. Report what is implemented and what is missing.
argument-hint: [flow name, e.g. subscriptions stripe create]
disable-model-invocation: true
allowed-tools: Read, Grep, Glob
disallowed-tools: Write, Edit, NotebookEdit, Bash
---

REPORT ONLY. No file changes, no code, no plans.

## Resolving the flow

The arguments are a fuzzy hint at one file in the flows directory. That directory is defined under `## Flows` in `CLAUDE.local.md` - use the path given there. Match loosely against the path and file name, case insensitive, partial words allowed.

If it narrows to one file, read it and continue. If it does not, list the candidates and stop. Ask which one. Do nothing else.

## Scope

This repo only. API side work belongs in the `api requirements` section, never in `missing flows` or `missing todos`.

## Output

Five sections, in this order.

### implemented

Quick run down of what the flow already has in this repo. No subsections. Condense. A branch set that is fully covered is one line, not one line per branch.

### missing flows

Gaps against the `## Flow` and `## Requirements` sections of the doc. One item per gap. Each item is up to three paragraphs, each prefixed in bold:

- **Summary:** the gap. Enough that the flow doc does not have to be reread.
- **Resolution:** what closing it means.
- **Open questions:** only when there genuinely are any.

### missing todos

Gaps against the `## Todo` section of the doc. Same item format as above.

### other

Concerns, edge cases, and questions with no home in the flow or the todos. Each one starts with a bold severity prefix: **High:**, **Medium:**, **Low:**, or **Heads up:**.

### api requirements

What the API has to provide for the SPA side to work. Endpoints, response fields, auth user data, webhook driven state. Includes any API side flow step or todo pulled out of the sections above.

## Rules

- Read the flow doc and the repo. Never speculate about code that has not been read.
- Length is on point, not padded. Enough for relevance, nothing more.
- No preamble, no closing summary, no recap.
- No code samples, no diffs.
- Drop a section only when it is genuinely empty. Say so in one line.

$ARGUMENTS
