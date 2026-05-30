# Planning Responsibility Map

Status: active responsibility map.

Purpose: explain what information belongs in which file.

## Core rule

Prefer existing owner file.

Create a new file only when there is a new durable responsibility.

## Files

| File | Owns |
|---|---|
| `START HERE.md` | entrypoint, read order, navigation |
| `System Overview.md` | conceptual model |
| `Use Case Map.md` | routing only; points to owners instead of owning schemas |
| `Responsibility Map.md` | file ownership |
| `Documentation Principles.md` | file types and documentation rules |
| `Current Plan State.md` | flexible current plan, focus, tasks, rough schedule, background recovery goal, global goals / active directions |
| `Days/README.md` | date-based day file storage, naming, and active/completed day-file rule |
| `Days/YYYY/YYYY-MM-DD.md` | concrete day record for one date; owns that date's Result Tracking, Active Promises, Finished Sessions, Work Score Summary, Support Facts, Support Score Review, Final Day Summary, and Notes |
| `Support Score Guide.md` | rules for approximate support scoring; max 10, category max 2, sleep min -5/max 2, AI participation, and separation from Work Score |
| `Tools/Pattern Capture/README.md` | owner folder entrypoint for the Tampermonkey Pattern Capture tool plan and boundaries |
| `Tools/Pattern Capture/Panel UI Requirements.md` | collapsed/expanded draggable panel UX requirements |
| `Tools/Pattern Capture/Storage and Data Model.md` | GM storage keys, persistence, event schemas, and safety requirements |
| `Tools/Pattern Capture/Event Taxonomy.md` | work-pattern/support-fact button taxonomy and event effects |
| `Tools/Pattern Capture/Export Format.md` | markdown/json export contract for chat import |
| `Tools/Pattern Capture/Implementation Plan.md` | staged v1/v2 implementation plan |
| `Tools/Pattern Capture/Script File Structure.md` | planned internal structure of the Tampermonkey userscript |
| `Today State.md` | legacy pointer only; replaced by date-based day files |
| `Session Log.md` | legacy / optional index; detailed sessions and day summaries live in date-based day files |
| `Work Rails Principles.md` | meaning and principles only; does not own rendered dashboard or compact state tables |
| `Deferred and Ideas Notes.md` | deferred tasks, unstable ideas, future workflows, open/dangerous scenarios |
| `Emoji Notation Map.md` | explicit emoji notation agreements used across planning docs; prevents notation drift; not a full glossary and not owner of dashboard layout |
| `Templates/Day File Template.md` | reusable skeleton for creating new date-based day files |
| `Templates/Planning State Output Template.md` | compact Planning State Output structure, including Result Tracking, Point 6, Active Promises, Finished Sessions, and optional Support Facts when relevant |
| `Templates/Support Facts Table Template.md` | reusable table structure for between-session/support facts; no scoring during the day |
| `Templates/Support Score Review Template.md` | reusable layout for day close / next-morning support review |
| `Templates/Pattern Capture Export Template.md` | expected markdown export shape from the Tampermonkey Pattern Capture tool |
| `Templates/Today State Template.md` | legacy template; replaced by `Templates/Day File Template.md` |
| `Templates/Default Dashboard Template.md` | source of truth for full Dashboard Core and Mnemonic Emoji Table |
| `Templates/Session Log Entry Template.md` | legacy/general entry skeleton; date-based day files own detailed daily records |
| `Examples/*.md` | rendered reference outputs only; templates win if conflict exists |
| `Examples/Start Day Missing Input Example.md` | example of starting a date-based day file when target / Desired / Undesired / promises are missing |
| `Examples/Midday Planning State Output Example.md` | example of default planning-mode output using mnemonic and compact planning state from a day file |
| `Examples/Support Score Day Examples.md` | curated support-score calibration examples; not factual complete log |
| `Workflows/Use Day File Workflow.md` | how to resolve, create, read, and update date-based day files |
| `Workflows/Support Score Review Workflow.md` | how to calculate previous-day / day-close Support Score from support facts |
| `Workflows/Pattern Capture Import Workflow.md` | how to import Tampermonkey Pattern Capture exports into date-based day files |
| `Workflows/Start Day Workflow.md` | how to start/update a date-based day file, including missing-input handling and no default promise creation |
| `Workflows/Log Session Workflow.md` | how to log work sessions into date-based day files and update Work Score Summary |
| `Workflows/End Day Workflow.md` | how to close date-based day files and write final day summary/support review |
| `Workflows/Use Dashboard Workflow.md` | behavior for combining mnemonic + compact state; source precedence for full dashboard and mnemonic |
| `Workflows/Real Reward Work Loop Workflow.md` | core work loop: real reward vs empty stimulation/chemistry and short-distance D/F/K/P race |
| `Workflows/Real Reward Pattern Playbook.md` | score-relevant behavioral patterns for Real Reward Work Loop |
| `Workflows/Build Truth Promise Workflow.md` | how to create or refresh a stitched analytical promise and Active Promises row |
| `Workflows/Update Current Plan Workflow.md` | how to update current/global plan and return mnemonic + compact planning state by default |
| `Workflows/*.md` | algorithms |
| `Templates/*.md` | skeletons |

## State vs Log

State = current active situation.

Log = accumulated facts.

Day file = factual state/history for one concrete date.

Tool docs = requirements and implementation plan for external helpers.

Notes = incubator for deferred, unstable, or not-yet-owned information.

Templates = reusable skeletons.

Workflows = step-by-step algorithms.

Examples = rendered reference outputs. They are not state, not templates, and not the source of truth.

## New file rule

If it is not clearly a new responsibility, put it into `Deferred and Ideas Notes.md`.
