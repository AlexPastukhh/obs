# Repetition Use Case Map

Status: active command router / action-to-doc-flow map.

Purpose: when the user says X, this file tells the AI what to do, which docs to read, which workflow to run, which template to use, and what output is expected.

This file is not a full workflow and not a template. It routes commands to the right files.

## 1. Read Order For Non-Trivial Repetition Work

```text
1. -Repetition/START HERE.md
2. -Repetition/FOR NEW AI CHAT.md
3. -Repetition/USE CASE MAP.md
4. -Repetition/RESPONSIBILITY MAP.md
5. -Repetition/Documentation Architecture Adapter.md
6. Relevant workflow file from -Repetition/Workflows/
7. Relevant template file from -Repetition/Templates/
8. Relevant source file:
   - chain file
   - schedule file
   - recovery note
   - lookup map
   - further study index
   - source conspect/export supplied by user
```

## 2. Traversal Depth

| Mode | Meaning | Use when |
|---|---|---|
| Full traversal | Read handoff + use-case map + responsibility map + adapter + relevant workflow + template + source files. | New chat, new use case, risky schedule/recovery change, first processing of a conspect, new documentation category. |
| Targeted traversal | Read only relevant workflow/template/source files. | Known use case, narrow update, named schedule/chain/conspect. |
| Reuse context | Reuse current chat context and read only target files if needed. | Same active draft/repeat material/schedule update. |
| No traversal | Answer from active context. | Simple clarification or explanation without repo change. |

## 3. Primary Use Cases

| User says / means | Task type | Required reads | Workflow | Template | Expected output | Permission boundary |
|---|---|---|---|---|---|---|
| “запроцессил X today”, “processed X”, “processed 26.04 raw today” | New repeat unit | chain file, current/future schedule files, FOR NEW AI CHAT | [[Workflows/Process New Repeat Unit Workflow]] | schedule file pattern from existing months | New chain row + generated schedule entries | Repo edits require explicit permission. |
| “я повторил X”, “done repeat X”, “повторил на дату Y” | Repeat completion update | chain row, schedule item, recovery rules if late; pending source: `AI System/Conspects Repetition/Schedule Rules.md` until promoted | [[Workflows/Process New Repeat Unit Workflow]] as reference | existing schedule style | Mark done / record planned vs actual / add next stage if needed | Do not silently reschedule. |
| “создай вопросы по конспекту”, “вот svg/pdf/png конспекта” | Repeat material creation | source conspect/export, question principles source, use-case map | [[Workflows/Create Repeat Material From Conspect Workflow]] | [[Templates/Repeat Material Template]] | Draft repeat material with visual anchors, questions, use cases, lookup index, weak spots | Draft until user review. |
| “где у меня было про X?”, “не могу найти инфу” | Knowledge lookup | [[Lookup/Knowledge Locator Map]], repeat materials, source notes if needed | [[Workflows/Knowledge Lookup Workflow]] | [[Templates/Knowledge Locator Entry Template]] if adding entry | Candidate notes/sections and why they match | Do not invent location if not found. |
| “это надо изучить глубже, но не сейчас” | Further study branch | source conspect/repeat material, Further Study Index | [[Workflows/Create Further Study Branch Workflow]] | [[Templates/Further Study Branch Template]] | Branch linked to source topic/visual anchor, not scheduled by default | Do not add to repeat chain automatically. |
| “после перерыва хочу откатить стадии”, “40->80 слишком поздно” | Explicit recovery stage rollback | active chains, schedules, recovery notes, schedule principles/source | [[Workflows/Long Break Stage Rollback Workflow]] | recovery note style | Explicit recovery decision + changed active stages + regenerated future schedules | Not default; must be explicit. |
| “обнови карту поиска / добавь entry” | Locator update | Knowledge Locator Map, source repeat material/conspect | [[Workflows/Knowledge Lookup Workflow]] | [[Templates/Knowledge Locator Entry Template]] | New/updated locator entry | Add only after enough source context. |
| “инвентаризация конспектов” | Inventory / classification | lookup map, inventory notes, selected conspect list | Knowledge lookup + repeat material workflow | locator entry template | Classified list: known/unknown/to process/to review | Avoid broad destructive moves. |
| “куда положить эту инфу?”, “создай файл для этого”, “добавь новый workflow/template”, “обнови доки с новым правилом” | Add or route new information | RESPONSIBILITY MAP, Documentation Architecture Adapter, likely target files | [[Workflows/Add Or Route New Information Workflow]] | [[Templates/Responsibility Map Entry Template]] if new file/category is created | Existing-file update or new file proposal/update with responsibility sync | Repo edits require explicit permission. |

## 4. Core Command Interpretations

Processing creates a repeat unit:

```text
raw date = context
processing date = repeat unit date
```

Questions do not replace visual conspects. Questions are an active recall layer; visual conspects remain the map/spatial memory source.

Use cases are required for useful repeat material.

Further Study Branches are linked to source notes but are not active tasks and do not enter repeat chains automatically.

Recovery shifts/rollbacks are explicit decisions, not default rules.

New information must be routed before file creation:

```text
USE CASE MAP -> RESPONSIBILITY MAP -> Documentation Architecture Adapter when file type/docs architecture matters -> Add Or Route New Information Workflow
```

If a new durable file/category is created, update `RESPONSIBILITY MAP.md`.

If navigation changes, update `START HERE.md`.

If command routing changes, update `USE CASE MAP.md`.

## 5. Expected Source Reporting In Chat

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

## 6. Maintenance Notes

If a command appears often but has no workflow/template yet, add it to a future maintenance register or ask user whether to create a new workflow.
