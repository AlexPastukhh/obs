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

Current local area-processing artifact names use descriptive names (`Area Source Conversion`, `Deep Fragment Processing`, `Processing Notes`) until reusable docs principles define a stricter artifact type. They are owned by `-Repetition/Area Processing/`.

## Root Files

### `-Repetition/START HERE.md`

Owns:
- entrypoint;
- read order;
- high-level navigation;
- links to root docs, active chains, schedules and indexes.

### `-Repetition/SYSTEM OVERVIEW.md`

Owns:
- conceptual explanation of how the whole repetition system works;
- relationships between chains, schedules, recovery, repeat material, lookup and further study;
- source-of-truth boundaries at system level.

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

## Active Principles And Profiles

### `-Repetition/Repetition Schedule Principles.md`

Owns:
- repeat-unit and schedule invariants;
- source-of-truth split between chains and schedules;
- rule that repeat units come from processing/general-note units, not calendar dates;
- holes-valid rule;
- theoretical chain default;
- late/recovery boundary principles.

Does not own:
- step-by-step schedule update algorithm;
- actual chain rows;
- actual monthly schedules.

### `-Repetition/Question Creation Principles.md`

Owns:
- question creation invariants;
- role of questions as active recall layer;
- question note per topic-note principle;
- question quality rules;
- weak-point question principle.

Does not own:
- exact question note skeleton;
- full repeat material skeleton;
- export procedure.

### `-Repetition/AI Work Areas Profile.md`

Owns:
- AI roles/capabilities in the repetition system;
- relationship between AI roles and owner workflows/principles/templates.

Does not own:
- algorithms;
- templates;
- schedule data.

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

## Workflows

### `-Repetition/Workflows/Process New Repeat Unit Workflow.md`

Owns:
- creating a new repeat unit after processing/general-note creation;
- adding chain row and future schedule entries for new unit.

### `-Repetition/Workflows/Process Repeat Completion Workflow.md`

Owns:
- marking a repeat done;
- recording planned vs actual completion date;
- handling late/very late completion without silent reschedule;
- creating/proposing next repeat event from chain.

### `-Repetition/Workflows/Reconstruct Historical Repeat Schedule Workflow.md`

Owns:
- recovery reconstruction from old drawings/schedules;
- preserving holes and uncertain legacy items;
- generating chains/schedules from confirmed historical repeat units.

### `-Repetition/Workflows/Export Conspect For AI Processing Workflow.md`

Owns:
- how to prepare SVG/PNG/PDF/markdown source input for AI-assisted processing.

### `-Repetition/Workflows/Create Repeat Material From Conspect Workflow.md`

Owns:
- creating repeat material drafts from source conspects;
- connecting visual anchors, questions, use cases, lookup and weak spots.

### `-Repetition/Workflows/Add Or Route New Information Workflow.md`

Owns:
- process for deciding where new information belongs.

## Templates

### `-Repetition/Templates/`

Owns:
- output/file skeletons.

Key templates:
- `Repeat Material Template.md`;
- `Question Note Template.md`;
- `Area Day Note Template.md`;
- `Repeat Chains Template.md`;
- `Month Repeat Plan Template.md`;
- `Focused Repeat Session Template.md`;
- `Knowledge Locator Entry Template.md`;
- `Further Study Branch Template.md`;
- `Responsibility Map Entry Template.md`.

## Area Processing

### `-Repetition/Area Processing/`

Owns:
- durable source-derived area processing artifacts;
- conversion of old area/source notes into topic-note candidates, literal fragments, deep fragment questions and clarity review;
- drafts before promotion into final repeat material, question notes, locator entries or further-study branches.

Does not own:
- active repeat chains;
- active schedules;
- final canonical topic notes outside this processing layer;
- final canonical question notes after promotion;
- recovery decisions.

### `-Repetition/Area Processing/Area Processing Index.md`

Owns:
- list of active area-processing artifacts;
- source file names;
- area/domain;
- status;
- links to conversion/deep-processing/notes files;
- next action.

### `-Repetition/Area Processing/ASP/ASP 0326 Area Source Conversion.md`

Owns:
- day-by-day topic-note candidates;
- topic-note sections;
- first-pass literal fragments and broad questions;
- source labels and missing-day notes;
- warning that source days do not automatically create repeat units.

### `-Repetition/Area Processing/ASP/ASP 0326 Deep Fragment Processing.md`

Owns:
- deeper interpretation of screenshot/code fragments;
- mechanism/syntax guesses;
- deep repeat questions;
- confidence and source-check markers;
- priority fragments for later promotion.

### `-Repetition/Area Processing/ASP/ASP 0326 Processing Notes.md`

Owns:
- processing status;
- batch history;
- what has and has not been deep-processed;
- promotion targets and next actions;
- unresolved source checks.

## Knowledge And Conspect Support

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

## Superseded Source Material

### `AI System/Conspects Repetition/`

Status:
- retained old/source material;
- not active owner after R-AI-1 promotion.
