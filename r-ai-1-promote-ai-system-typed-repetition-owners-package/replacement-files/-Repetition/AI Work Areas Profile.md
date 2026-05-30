# AI Work Areas Profile

Status: active profile.

Purpose: define the AI roles/capabilities used in the `-Repetition/` system.

This file is a **Profile**, not a Workflow and not a Principles file.

It describes what kinds of repetition work AI can help with, which owner files each role must use, and what each role must avoid.

## 1. Schedule Keeper

The schedule keeper helps maintain repeat chains, schedules, next repeat dates, and explicit recovery context.

Use for:

```text
- user reports a newly processed repeat unit;
- user reports a completed repeat;
- user reports late / very late completion;
- user asks to check upcoming repeats;
- user asks to rebuild or verify schedule consistency.
```

Required owner files:

```text
-Repetition/Repetition Schedule Principles.md
-Repetition/Workflows/Process New Repeat Unit Workflow.md
-Repetition/Workflows/Process Repeat Completion Workflow.md
-Repetition/Workflows/Reconstruct Historical Repeat Schedule Workflow.md
-Repetition/Templates/Repeat Chains Template.md
-Repetition/Templates/Month Repeat Plan Template.md
```

Must preserve:

```text
- create repeat units only from existing processing/general-note units;
- do not invent repeat chains for calendar holes;
- holes are valid;
- do not silently rewrite chains;
- schedules are derived queues, not source-of-truth theory.
```

Expected actions:

```text
- update or propose updates to repeat chains;
- update monthly schedule entries;
- record planned vs actual date when repeats are late;
- create focused repeat sessions when weak parts need special repeat;
- report touched files and unclear items.
```

## 2. Question Creator

The question creator helps build active recall material from topic notes, source conspects, raw day notes, focused repeat sessions, and user explanations.

Use for:

```text
- creating markdown question notes;
- improving existing question notes;
- adding weak-point questions;
- splitting questions by topic section;
- connecting questions to visual/source anchors.
```

Required owner files:

```text
-Repetition/Question Creation Principles.md
-Repetition/Templates/Question Note Template.md
-Repetition/Workflows/Create Repeat Material From Conspect Workflow.md
-Repetition/Workflows/Export Conspect For AI Processing Workflow.md
```

Must preserve:

```text
- questions are a main repeat method, not only a weak-part tool;
- every topic note should have a related question note;
- repeating a topic means answering questions, not only rereading;
- questions do not replace the visual/source conspect.
```

## 3. Note Processor

The note processor helps transform raw/source material into structured repeat material.

Processing can include:

```text
- inspect raw Excalidraw/SVG/PNG/PDF/markdown source;
- identify topics and visual anchors;
- create or update topic-note candidates;
- create or update question-note candidates;
- create area-day note entries;
- prepare repeat material;
- propose chain/schedule updates when processing creates a repeat unit.
```

Required owner files:

```text
-Repetition/Workflows/Export Conspect For AI Processing Workflow.md
-Repetition/Workflows/Create Repeat Material From Conspect Workflow.md
-Repetition/Templates/Repeat Material Template.md
-Repetition/Templates/Area Day Note Template.md
```

Must avoid:

```text
- pasting long topic fragments into general/area notes;
- treating uncertain visual interpretation as confirmed truth;
- creating active repeat units without a processing/general-note event.
```

## 4. Repeat Assistant

The repeat assistant helps run a scheduled repetition session.

During repeat, AI should:

```text
- open the relevant area-day/repeat material/source material;
- identify topic notes and question notes;
- ask active recall questions;
- check answers against source;
- mark weak parts;
- propose focused repeat sessions when needed;
- update schedule status through the repeat completion workflow.
```

Required owner files:

```text
-Repetition/Repetition Schedule Principles.md
-Repetition/Question Creation Principles.md
-Repetition/Workflows/Process Repeat Completion Workflow.md
-Repetition/Templates/Focused Repeat Session Template.md
```

## 5. Focused Repeat Assistant

When a weak part is found, AI should create or update focused repeat material instead of duplicating long fragments into general notes.

A focused repeat session should link to:

```text
- source scheduled repeat;
- source area-day note or repeat material;
- source topic note or section;
- relevant question note section.
```

It should include:

```text
- why it exists;
- repeat focus;
- questions;
- next due date;
- status.
```

Use:

```text
-Repetition/Templates/Focused Repeat Session Template.md
```

## 6. Profile Boundary

This profile does not own algorithms or file shapes.

Use workflows for algorithms:

```text
-Repetition/Workflows/
```

Use templates for file/output shapes:

```text
-Repetition/Templates/
```

Use principles for invariants:

```text
-Repetition/Repetition Schedule Principles.md
-Repetition/Question Creation Principles.md
```
