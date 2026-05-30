# Repetition System Overview

Status: active conceptual overview.

Purpose: explain how the whole `-Repetition` system works, not just where files are located.

Use this file when a new AI chat or the user needs to understand the model of the system before doing concrete work.

## 1. What This System Is For

`-Repetition` exists to manage studying/conspects/repetition work without modifying old sensitive source material.

```text
Active work happens in -Repetition/.
Old source/reconstruction material remains in Canvases/-repeat notes.
```

The system has four main jobs:

```text
1. Track what knowledge units exist and when they should be repeated.
2. Create daily queues from those repeat chains.
3. Turn visual/source conspects into repeat material with questions, use cases and lookup support.
4. Help AI know where to put new information without making the docs chaotic.
```

## 2. Core Repetition Model

The core model is:

```text
Repeat Chain = source of truth for repeat units and their planned repeat dates.
Monthly Schedule = daily queue generated from chains/recovery decisions.
Recovery Note = explicit exception/decision when normal scheduling is not enough.
```

### Chains

Chains live in:

```text
-Repetition/Chains/
```

They answer:

```text
What repeat units exist?
What are their repeat stages/dates?
What future repeats should exist?
```

A repeat unit is created when something is actually processed, not merely because a calendar date exists.

### Schedules

Schedules live in:

```text
-Repetition/Schedules/
```

They answer:

```text
What should be processed/repeated on this exact day?
```

Schedules are daily queues only. They should not become the place for theory, source-of-truth rules, or full explanations.

### Recovery

Recovery notes live in:

```text
-Repetition/Recovery/
```

They record explicit one-time decisions, such as:

```text
- +1 calendar month shift after a missed month;
- long-break stage rollback;
- other non-default rescheduling decisions.
```

Recovery decisions are not default behavior. They must be explicit.

## 3. Processing Creates Repeat Units

When the user says they processed something, AI should treat that as a new repeat unit.

```text
raw/source date = context
processing date = repeat unit date
```

Example:

```text
User says on 2026-06-05: "processed 26.04 raw today"
=> 2026-04-26 raw is source context
=> 2026-06-05 is the processing date
=> new repeat unit starts from 2026-06-05
```

Default ladder:

```text
processing -> +5 -> +10 -> +20 -> +40 -> +80 -> review / decide next
```

Use the workflow:

```text
-Repetition/Workflows/Process New Repeat Unit Workflow.md
```

## 4. Visual Conspects Are Not Replaced By Questions

Old visual conspects are valuable because they work like a spatial memory map / “memory palace”.

Questions are not meant to replace the visual conspect.

Better model:

```text
Visual conspect = map / spatial memory / source shape.
Questions = active recall layer.
Use cases = link from knowledge to real work.
Lookup index = fast access when trying to find forgotten information.
```

Recommended repeat flow for one conspect:

```text
1. Quick visual scan to restore the map.
2. Answer questions without looking.
3. If a question is hard, return to the exact visual anchor.
4. Review use cases.
5. Mark weak spots or further-study branches.
```

## 5. Repeat Material

Repeat material is a wrapper around a source conspect.

It should usually contain:

```text
- source links;
- search terms;
- visual map anchors;
- warm-up map recall prompts;
- core questions;
- detail questions;
- use-case questions;
- lookup index;
- weak spots;
- further study branches.
```

Use:

```text
-Repetition/Workflows/Create Repeat Material From Conspect Workflow.md
-Repetition/Templates/Repeat Material Template.md
```

For old chaotic Excalidraw/SVG/PDF/PNG conspects, AI output is draft until the user reviews the structure.

## 6. Knowledge Lookup Model

The user may need to find information later by term, use case, vague memory or real-world problem.

This is handled by:

```text
-Repetition/Lookup/Knowledge Locator Map.md
```

It answers:

```text
Where was information about X?
```

X can be:

```text
- exact term;
- synonym;
- use case;
- bug/symptom;
- vague memory;
- related technology.
```

Use:

```text
-Repetition/Workflows/Knowledge Lookup Workflow.md
-Repetition/Templates/Knowledge Locator Entry Template.md
```

## 7. Further Study Branches

Sometimes a conspect contains something that should be studied deeper later, but not now.

That is a Further Study Branch.

It is not:

```text
- a repeat unit;
- a schedule item;
- an active task by default.
```

It is:

```text
- a linked topic branch;
- connected to a source conspect/topic/visual anchor;
- stored for future study or expansion.
```

Index:

```text
-Repetition/Further Study/Further Study Index.md
```

Concrete branch files:

```text
-Repetition/Further Study/Branches/
```

Use:

```text
-Repetition/Workflows/Create Further Study Branch Workflow.md
-Repetition/Templates/Further Study Branch Template.md
```

## 8. Documentation Architecture Model

The docs are organized by responsibility.

```text
START HERE = entrypoint and read order.
SYSTEM OVERVIEW = conceptual model of how the system works.
FOR NEW AI CHAT = AI behavior and critical interpretation rules.
USE CASE MAP = user command -> required reads/workflow/template/output.
RESPONSIBILITY MAP = what information belongs in which file/folder.
Documentation Architecture Adapter = local application of reusable docs architecture.
Workflows = algorithms.
Templates = output/file skeletons.
```

When adding new information, AI should not guess where to put it.

Use:

```text
-Repetition/Workflows/Add Or Route New Information Workflow.md
```

Main rule:

```text
Prefer updating an existing owner file.
Create a new file only if it defines a new responsibility, reduces confusion, or is a durable artifact type.
```

## 9. Read Path For New AI Chat

Default read path:

```text
1. -Repetition/START HERE.md
2. -Repetition/SYSTEM OVERVIEW.md
3. -Repetition/FOR NEW AI CHAT.md
4. -Repetition/USE CASE MAP.md
5. -Repetition/RESPONSIBILITY MAP.md
6. -Repetition/Documentation Architecture Adapter.md
7. Relevant workflow/template/source files for the requested action.
```

## 10. Source-of-Truth Boundaries

```text
Chains are source of truth for repeat units/repeat dates.
Schedules are daily queues generated from chains/recovery.
Recovery notes are explicit non-default decisions.
Repeat material is how to repeat/understand one conspect.
Knowledge Locator Map is where to find information.
Further Study Branches are unscheduled future topic expansions.
Responsibility Map decides where information belongs.
```

Do not move information across these boundaries without a reason.
