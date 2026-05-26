# Repetition Documentation Principles

Status: active documentation architecture principles.

Purpose: explain how docs in `-Repetition` should be organized and maintained.

## File type responsibilities

Entry files (`START HERE.md`) show where to begin, read order and high-level navigation.

Use-case maps (`USE CASE MAP.md`) map user-visible commands/actions to required reads, workflows, templates, expected output and permission boundaries.

Responsibility maps (`RESPONSIBILITY MAP.md`) explain where information belongs and guide new-file vs existing-file decisions.

Workflow files (`Workflows/*.md`) contain step-by-step algorithms.

Template files (`Templates/*.md`) contain output/file skeletons.

Source-of-truth files (`Chains/*.md`) contain repeat units and repeat dates.

Derived working files (`Schedules/*.md`) contain daily queues generated from chains and recovery decisions.

Recovery files (`Recovery/*.md`) contain explicit one-time decisions or exceptions, not default rules.

Index/register files (`Lookup/*.md`, `Further Study/*.md`) help find information or keep durable lists.

## No-duplication rule

Do not copy the same rule into many files unless it is a short routing reminder.

Prefer:

```text
- one owner file with full explanation;
- other files link to it.
```

## New information routing

When new information appears:

```text
1. Identify information type.
2. Check `RESPONSIBILITY MAP.md`.
3. If owner exists, update that file.
4. If no owner exists, decide whether new file/category is justified.
5. If a new file/category is created, update `RESPONSIBILITY MAP.md`.
6. If navigation changes, update `START HERE.md`.
7. If it creates a new user action, update `USE CASE MAP.md`.
```

## When to create a new file

Create a new file when:

```text
- information has a distinct responsibility;
- it will be reused often;
- it would overload an existing file;
- it is a recurring workflow;
- it is a reusable template;
- it is an explicit recovery decision;
- it is an index/register that grows over time.
```

Prefer existing file when:

```text
- information is a small clarification;
- an owner file already exists;
- new file would only split one short paragraph;
- content is temporary and belongs in inventory/staging note.
```

## AI behavior principles

For non-trivial repo/doc work, AI should report:

```text
Read:
- ...

Used workflow:
- ...

Used template:
- ...

Not checked:
- ...

Output:
- ...
```

AI should not silently:
- create files without permission;
- invent source locations;
- reschedule chains;
- apply recovery shifts or rollbacks;
- modify `Canvases/-repeat notes`.

## Simplicity principle

Do not make simple note-taking too heavy.

Use full workflow only when creating/updating durable structure, touching schedules/chains, creating repeat material, changing recovery decisions, or adding new docs categories.
