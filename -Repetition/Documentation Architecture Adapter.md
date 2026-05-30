# Repetition Documentation Architecture Adapter

Status: active local adapter for documentation architecture.

Purpose: explain how reusable documentation-architecture rules apply inside `-Repetition/`.

This file is an **adapter**, not the universal source of documentation principles.

Reusable documentation principles can be imported or mirrored from a shared/reusable docs layer later. This file owns only the local mapping for the Repetition problem area.

## 1. Adapter Boundary

This file owns:

```text
- how shared/reusable documentation architecture rules apply to -Repetition/;
- local file type naming and postfix rules;
- local source-of-truth boundaries between root docs, workflows, templates, chains, schedules, recovery notes, lookup and further study;
- local no-duplication rules;
- how AI System/Conspects Repetition material is promoted into typed -Repetition owners.
```

This file does **not** own:

```text
- universal reusable documentation principles;
- repetition schedule invariants;
- question creation/content invariants;
- workflows;
- templates;
- examples;
- active chain/schedule/recovery data.
```

## 2. Principles vs Adapter

Principles files store invariants:

```text
- how the system should be;
- what must not be violated;
- source-of-truth boundaries;
- stable entity/file-type boundaries;
- rules that should remain true across updates.
```

Adapter files store local application:

```text
- how reusable principles apply in this project/problem area;
- which local files instantiate the shared model;
- which names, routes and folders are used here.
```

Therefore this file is named `Documentation Architecture Adapter.md`, not `Documentation Principles.md`.

## 3. File Type Postfix Rule

Durable documentation files should usually end with their type.

Use these postfixes by default:

| Postfix | Owns |
|---|---|
| `Principles.md` | system/domain invariants and source-of-truth boundaries. |
| `Workflow.md` | repeated algorithm/process. |
| `Template.md` | skeleton/output/file shape. |
| `Map.md` | routing or ownership map. |
| `Register.md` | durable list of open/deferred/shared items. |
| `Log.md` | completed actions/history. |
| `Adapter.md` | local application of external/reusable architecture. |
| `Profile.md` | role model, capability model or project/domain profile. |
| `Overview.md` | conceptual explanation of the system. |
| `Index.md` | navigation/catalog list. |

Avoid these as primary durable file types when a clearer type exists:

```text
Rules.md
Guide.md
```

Use:

```text
Rules -> Principles, if it stores invariants.
Guide -> Workflow, if it describes how to do something.
```

Allowed conventional exceptions for now:

```text
START HERE.md
FOR NEW AI CHAT.md
```

They are entry/handoff files and are already clear enough.

## 4. Local Repetition File Type Map

| Current / target file | Type | Responsibility |
|---|---|---|
| `START HERE.md` | entrypoint / index exception | where to start, read order, high-level links. |
| `SYSTEM OVERVIEW.md` | Overview | conceptual model of the whole repetition system. |
| `FOR NEW AI CHAT.md` | handoff exception | AI behavior and critical interpretation rules for a new chat. |
| `USE CASE MAP.md` | Map | user command/action -> reads/workflow/template/output mapping. |
| `RESPONSIBILITY MAP.md` | Map | where information belongs. |
| `Documentation Architecture Adapter.md` | Adapter | local documentation architecture mapping. |
| `Repetition Schedule Principles.md` | Principles | schedule/repeat-chain invariants. |
| `Question Creation Principles.md` | Principles | question/content invariants. |
| `AI Work Areas Profile.md` | Profile | AI roles/capabilities for repetition work. |
| `Workflows/*.md` | Workflow | repeated procedures. |
| `Templates/*.md` | Template | output/file skeletons. |
| `Chains/*.md` | source-of-truth data | repeat units and planned repeat dates. |
| `Schedules/*.md` | derived queue | what to process/repeat on exact dates. |
| `Recovery/*.md` | recovery note | explicit non-default decisions/exceptions. |
| `Lookup/*.md` | index/register | knowledge lookup and temporary inventory. |
| `Further Study/*.md` | index/register/branch notes | unscheduled deeper-study branches. |

## 5. Source-of-Truth Boundaries

```text
Chains
  = source of truth for repeat units and planned repeat dates.

Schedules
  = derived daily/monthly queues generated from chains and recovery decisions.

Recovery notes
  = explicit non-default decisions; not default schedule rules.

Principles
  = invariants and source-of-truth boundaries.

Profiles
  = role/capability/domain model.

Workflows
  = how to do repeated actions.

Templates
  = output/file skeletons.

Maps
  = routing/ownership, not workflows.

Adapter
  = local application of docs architecture, not universal principles.
```

Do not move information across these boundaries without a reason.

## 6. New Information Routing

When new information appears:

```text
1. Identify information type.
2. Check USE CASE MAP.md.
3. Check RESPONSIBILITY MAP.md.
4. Check this adapter if the question is about documentation/file type/ownership.
5. If an owner exists, update the owner file.
6. Create a new file only when it has a durable distinct responsibility or prevents confusion.
7. If a new file/category is created, update RESPONSIBILITY MAP.md.
8. If navigation changes, update START HERE.md.
9. If command routing changes, update USE CASE MAP.md.
```

## 7. AI System Source Boundary

`AI System/Conspects Repetition/` is part of the Repetition domain, but it is not an active owner layer after R-AI-1 promotion.

Useful content has been promoted to:

```text
- useful schedule principles -> -Repetition/Repetition Schedule Principles.md;
- useful question principles -> -Repetition/Question Creation Principles.md;
- useful workflows -> -Repetition/Workflows/* Workflow.md;
- useful templates -> -Repetition/Templates/* Template.md;
- AI role/capability model -> -Repetition/AI Work Areas Profile.md.
```

The old `AI System/Conspects Repetition/` folder may remain as retained source/history, but active repetition updates should go to typed `-Repetition/` owners.

## 8. No-Duplication Rule

Do not copy the same rule into many files unless it is a short routing reminder.

Prefer:

```text
- one owner file with the full explanation;
- other files link to it.
```

If changing one owner would require editing the same logic in many files, the logic is probably duplicated incorrectly.

## 9. Simplicity Principle

Do not make simple note-taking too heavy.

Use full routing/workflow only when:

```text
- creating/updating durable structure;
- touching chains/schedules/recovery;
- creating repeat material;
- changing recovery decisions;
- adding new documentation categories;
- migrating or reclassifying old source content into typed active owners.
```
