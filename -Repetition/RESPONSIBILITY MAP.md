# Repetition Responsibility Map

Status: active responsibility / information ownership map.

Purpose: explain what information belongs in which file or folder.

## Core rule

```text
Prefer updating the existing owner file.
Create a new file only when it defines a new responsibility, reduces confusion, or is a new durable artifact type.
```

When a new file or new category of files is created, update this responsibility map.

If new information is added to an existing owner file and the responsibility model did not change, this map usually does not need to change.

## Root files

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

### `-Repetition/Documentation Principles.md`

Owns:
- general documentation architecture principles;
- file type definitions;
- no-duplication rules;
- source-of-truth boundaries.

## Active repetition data

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

## Knowledge and conspect support

### `-Repetition/Workflows/`

Owns:
- step-by-step algorithms.

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

## Existing AI-system docs

### `AI System/Conspects Repetition/`

Owns:
- broader AI/system principles;
- question creation principles;
- export format guide;
- templates that are not active schedule data.

## New file decision rule

Use [[Workflows/Add Or Route New Information Workflow]].

Short version:

```text
1. Classify information type.
2. Check this responsibility map.
3. Prefer existing owner file.
4. Create a new file only if no owner exists or current owner would become overloaded.
5. If new file/category is created, update this map.
6. If navigation changes, update START HERE.
7. If user command routing changes, update USE CASE MAP.
```
