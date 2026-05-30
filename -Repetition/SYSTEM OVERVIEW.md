# Repetition System Overview

Status: active conceptual overview.

Purpose: explain how the whole `-Repetition` system works, not just where files are located.

Use this file when a new AI chat or the user needs to understand the model of the system before doing concrete work.

## 1. What This System Is For

`-Repetition` exists to manage studying/conspects/repetition work without modifying old sensitive source material.

```text
Active work happens in -Repetition/.
Old source/reconstruction material remains in Canvases/-repeat notes and retained legacy source folders.
```

The system has five main jobs:

```text
1. Keep repetition chains and schedules.
2. Process raw study-day/source notes into structured repeat material.
3. Create questions for topic/source notes.
4. Repeat conspects using questions, visual anchors and use cases.
5. Track weak parts and further-study branches without duplicating note fragments.
```

## 2. Core Pipeline

The conceptual pipeline is:

```text
Raw/source note
  -> processing session
  -> topic/repeat material
  -> question notes
  -> area-day notes
  -> repeat chain
  -> month schedule
  -> scheduled repeats
  -> focused repeat sessions when weak parts are found
```

## 3. Main Entities

```text
Raw/source note
  = original study capture, often a large Excalidraw drawing or export.

Processing session
  = moment when raw/source material is understood and turned into structured repeatable material.

Repeat unit
  = material created by a processing/general-note date. If no processing/general note exists for a date, no repeat unit exists for that date.

Repeat chain
  = source-of-truth path of a repeat unit through planned repeat stages.

Topic/repeat material
  = structured material used for understanding/repeating one conspect/topic.

Question note
  = markdown question bank for a topic/source note; questions are a main repeat method, not only a weak-part tool.

Area-day note
  = clean markdown index for one processing/general-note day and one area.

Month schedule
  = markdown daily queue that says what to process or repeat on each date.

Focused repeat session
  = separate note for a weak part found during scheduled repeat that should be repeated sooner or separately.
```

## 4. Core Repetition Model

```text
Repeat Chain = source of truth for repeat units and planned repeat dates.
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

Use:

```text
-Repetition/Repetition Schedule Principles.md
-Repetition/Templates/Repeat Chains Template.md
```

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

Use:

```text
-Repetition/Templates/Month Repeat Plan Template.md
```

### Recovery

Recovery notes live in:

```text
-Repetition/Recovery/
```

They record explicit one-time decisions, such as:

```text
- +1 calendar month shift after a missed month;
- long-break stage rollback;
- historical reconstruction assumptions;
- other non-default rescheduling decisions.
```

Recovery decisions are not default behavior. They must be explicit.

## 5. Processing Creates Repeat Units

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

Current active local ladder:

```text
processing -> +5 -> +10 -> +20 -> +40 -> +80 -> review / decide next
```

Use:

```text
-Repetition/Workflows/Process New Repeat Unit Workflow.md
-Repetition/Repetition Schedule Principles.md
```

## 6. Visual Conspects Are Not Replaced By Questions

Old visual/source conspects are valuable because they work like a spatial memory map / “memory palace”.

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

Use:

```text
-Repetition/Question Creation Principles.md
-Repetition/Workflows/Create Repeat Material From Conspect Workflow.md
-Repetition/Templates/Question Note Template.md
```

## 7. Repeat Material

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
-Repetition/Workflows/Export Conspect For AI Processing Workflow.md
-Repetition/Workflows/Create Repeat Material From Conspect Workflow.md
-Repetition/Templates/Repeat Material Template.md
```

For old chaotic Excalidraw/SVG/PDF/PNG conspects, AI output is draft until the user reviews the structure.

## 8. AI Work Areas

AI roles/capabilities are described in:

```text
-Repetition/AI Work Areas Profile.md
```

Core areas:

```text
- schedule keeper;
- question creator;
- note processor;
- repeat assistant;
- focused repeat assistant.
```

## 9. Knowledge Lookup Model

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

## 10. Further Study Branches

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

## 11. Documentation Architecture Model

The docs are organized by responsibility.

```text
START HERE = entrypoint and read order.
SYSTEM OVERVIEW = conceptual model of how the system works.
FOR NEW AI CHAT = AI behavior and critical interpretation rules.
USE CASE MAP = user command -> required reads/workflow/template/output.
RESPONSIBILITY MAP = what information belongs in which file/folder.
Documentation Architecture Adapter = local application of reusable docs architecture.
Principles = invariants.
Profiles = role/capability models.
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

## 12. Read Path For New AI Chat

Default read path:

```text
1. -Repetition/START HERE.md
2. -Repetition/SYSTEM OVERVIEW.md
3. -Repetition/FOR NEW AI CHAT.md
4. -Repetition/USE CASE MAP.md
5. -Repetition/RESPONSIBILITY MAP.md
6. -Repetition/Documentation Architecture Adapter.md
7. Relevant principles/profile/workflow/template/source files for the requested action.
```

## 13. Source-of-Truth Boundaries

```text
Chains are source of truth for repeat units/repeat dates.
Schedules are daily queues generated from chains/recovery.
Recovery notes are explicit non-default decisions.
Schedule principles own invariants.
Repeat material is how to repeat/understand one conspect.
Question principles own question invariants.
Knowledge Locator Map is where to find information.
Further Study Branches are unscheduled future topic expansions.
Responsibility Map decides where information belongs.
```

Do not move information across these boundaries without a reason.
