# Question Creation Principles

Status: active principles.

Purpose: define stable question/content invariants for repeat material and question notes.

This file is a **Principles** file. It stores what must remain true about question creation.

Use templates for file shape:

```text
-Repetition/Templates/Question Note Template.md
-Repetition/Templates/Repeat Material Template.md
```

Use workflows for action steps:

```text
-Repetition/Workflows/Create Repeat Material From Conspect Workflow.md
-Repetition/Workflows/Export Conspect For AI Processing Workflow.md
```

## 1. Questions Are A Main Repeat Method

Questions are not only for weak parts.

Core rule:

```text
Every topic note should have a related markdown question note.
Repeating a topic means answering questions, not only rereading.
```

Questions do not replace source conspects or topic notes.

They are an active recall layer.

## 2. Question Note Per Topic Note

Preferred relationship:

```text
Topics/Server/Antiforgery.md
Topics/Server/Antiforgery.questions.md
```

The question note should link back to the topic note.

If exact folder paths differ, preserve the relationship:

```text
topic note
  -> related question note
```

## 3. Question Types

AI should create questions that test:

```text
- core definitions;
- why the concept exists;
- step-by-step flows;
- comparisons;
- common mistakes;
- edge cases;
- practical usage;
- section-specific understanding;
- weak points found during repetition.
```

## 4. Good Questions

Good repeat questions should:

```text
- force recall, not recognition;
- ask for explanation from memory;
- expose hidden gaps;
- be answerable from the source topic/conspect;
- be grouped by topic section when the topic is large;
- include practical examples when useful;
- avoid yes/no questions unless followed by why/how.
```

## 5. Visual Conspects Are Not Replaced

Visual/source conspects remain valuable as map/spatial-memory/source material.

Questions should point back to source anchors when useful.

Recommended repeat pattern:

```text
1. Restore the visual/source map.
2. Answer questions without looking.
3. Return to exact source anchors for weak/unclear parts.
4. Update weak-point questions or focused repeat sessions when needed.
```

## 6. Section-Specific Scope

When a topic note becomes large, area-day/repeat material may point to a section instead of the whole note.

Example:

```md
- [[Antiforgery#Token validation flow]]
  Questions: [[Antiforgery.questions#Token validation flow]]
```

The user can choose the section manually when needed.

## 7. Weak-Point Questions

If a weak part is found during a scheduled repeat, AI should:

```text
- add or update weak-point questions in the topic question note;
- create a focused repeat session note if the part needs earlier/special repeat;
- avoid pasting long topic fragments into area-day/general notes.
```

## 8. Boundary

This file owns question invariants.

It does not own:

```text
- exact question note skeleton;
- full repeat material skeleton;
- schedule update process;
- export procedure;
- topic-note content.
```
