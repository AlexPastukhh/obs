# Repetition Responsibility Map

Status: active responsibility / information ownership map.

Purpose: explain what information belongs in which file or folder.

## Core Rule

```text
Prefer updating the existing owner file.
Create a new file only when it defines a new responsibility, reduces confusion, or is a new durable artifact type.
```

When a new file or new category of files is created, update this responsibility map.

If new information is added to an existing owner file and the responsibility model did not change, this map usually does not need to change.

## File Type Postfix Rule

Durable documentation files should usually reflect their file type in the filename postfix.

| Postfix | Use for |
|---|---|
| `Principles.md` | invariants, source-of-truth boundaries, stable rules. |
| `Workflow.md` | repeated algorithms/processes. |
| `Template.md` | skeleton/output/file shapes. |
| `Map.md` | routing/ownership maps. |
| `Register.md` | durable open/deferred/shared lists. |
| `Log.md` | completed actions/history. |
| `Adapter.md` | local application of reusable/external architecture. |
| `Profile.md` | role/capability/domain model. |
| `Overview.md` | conceptual model of a system. |
| `Index.md` | navigation/catalog list. |

Avoid `Rules.md` and `Guide.md` as durable type postfixes when a clearer type exists.

```text
Rules -> Principles, if it stores invariants.
Guide -> Workflow, if it describes how to do something.
```

Allowed conventional exceptions for now:

```text
START HERE.md
FOR NEW AI CHAT.md
```

## Root Files

### `-Repetition/START HERE.md`

Owns:
- entrypoint;
- read order;
- high-level navigation;
- links to root docs, active chains, schedules and indexes.

Read when:
- new AI chat starts;
- user asks where to begin;
- navigation seems unclear.

Update when:
- important new root doc/folder is created;
- active read order changes;
- new major area becomes part of the system.

### `-Repetition/SYSTEM OVERVIEW.md`

Owns:
- conceptual explanation of how the whole repetition system works;
- relationships between chains, schedules, recovery, repeat material, lookup and further study;
- source-of-truth boundaries at system level.

Read when:
- new AI chat/user needs the model of the system, not just navigation;
- it is unclear how different parts of `-Repetition` fit together;
- before changing core architecture or source-of-truth boundaries.

Update when:
- a new major subsystem is added;
- the conceptual model changes;
- source-of-truth boundaries change.

### `-Repetition/FOR NEW AI CHAT.md`

Owns:
- AI handoff rules;
- default AI behavior;
- critical interpretation rules such as “processing creates a repeat unit”.

### `-Repetition/USE CASE MAP.md`

Owns:
- user command/action -> required reads/workflow/template/output mapping;
- traversal depth;
- high-level permission boundaries.

### `-Repetition/RESPONSIBILITY MAP.md`

Owns:
- where information belongs;
- file/folder responsibilities;
- new-file vs existing-file decision boundaries.

### `-Repetition/Documentation Architecture Adapter.md`

Owns:
- local application of reusable documentation architecture rules;
- local file type/postfix rules;
- local documentation source-of-truth boundaries;
- local AI System migration boundary.

Does not own:
- universal reusable documentation principles;
- repetition schedule invariants;
- question creation invariants;
- workflows;
- templates;
- active chain/schedule/recovery data.

## Active Repetition Data

### `-Repetition/Chains/`

Owns:
- repeat units;
- chain rows;
- planned repeat dates;
- active shifted chains and future chain files.

### `-Repetition/Schedules/`

Owns:
- daily queue only;
- what to process/repeat on each exact date.

### `-Repetition/Recovery/`

Owns:
- explicit recovery decisions;
- break/shift/rollback notes;
- one-time exceptions that are not default rules.

## Knowledge And Conspect Support

### `-Repetition/Workflows/`

Owns:
- step-by-step repeated algorithms.

### `-Repetition/Templates/`

Owns:
- output/file skeletons.

### `-Repetition/Lookup/Knowledge Locator Map.md`

Owns:
- where to find information by term/use case/vague memory;
- links from search concepts to notes/materials.

### `-Repetition/Lookup/Inventory Notes.md`

Owns:
- temporary inventory/classification notes;
- unclear old conspects to classify later.

### `-Repetition/Further Study/`

Owns:
- unscheduled branches of topics that need deeper study later.

### `-Repetition/Further Study/Further Study Index.md`

Owns:
- register of open/promoted/closed further-study branches.

### `-Repetition/Further Study/Branches/`

Owns:
- concrete Further Study Branch notes.

## Pending AI System Source Material

### `AI System/Conspects Repetition/`

Status:
- pending source material for migration into typed `-Repetition/` owners.

Owns temporarily:
- source/design material that has not yet been promoted;
- broader AI/system notes that still need classification.

Does not own after migration:
- active schedule principles;
- active question creation principles;
- active workflows;
- active templates;
- active documentation architecture.

Target migration:
- schedule invariants -> `-Repetition/Repetition Schedule Principles.md`;
- question invariants -> `-Repetition/Question Creation Principles.md`;
- AI role model -> `-Repetition/AI Work Areas Profile.md`;
- export procedure -> `-Repetition/Workflows/Export Conspect For AI Processing Workflow.md`;
- templates -> `-Repetition/Templates/* Template.md`.

## New File Decision Rule

Use [[Workflows/Add Or Route New Information Workflow]].

Short version:

```text
1. Classify information type.
2. Check this responsibility map.
3. Check Documentation Architecture Adapter when the question is about file type / docs architecture.
4. Prefer existing owner file.
5. Create a new file only if no owner exists or current owner would become overloaded.
6. If new file/category is created, update this map.
7. If navigation changes, update START HERE.
8. If user command routing changes, update USE CASE MAP.
```
