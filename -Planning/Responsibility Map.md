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
| `Current Plan State.md` | flexible current plan, focus, tasks, rough schedule, background recovery goal |
| `Today State.md` | active day state: compact Result Tracking, Active Promises, Finished Sessions, notes |
| `Session Log.md` | factual session/event/day-summary history; may store flags when useful |
| `Work Rails Principles.md` | meaning and principles only; does not own rendered dashboard or compact state tables |
| `Deferred and Ideas Notes.md` | deferred tasks, unstable ideas, future workflows, open/dangerous scenarios |
| `Templates/Planning State Output Template.md` | only source of truth for compact Planning State Output structure |
| `Templates/Default Dashboard Template.md` | only source of truth for rendered Dashboard Core, Mnemonic Emoji Table, and 📊Скор Details |
| `Examples/*.md` | rendered reference outputs only; templates win if conflict exists |
| `Examples/Midday Planning State Output Example.md` | example of default planning-mode output using dashboard, mnemonic, and compact planning state |
| `Workflows/Use Dashboard Workflow.md` | behavior for combining dashboard + compact state; source precedence for rendered output |
| `Workflows/Build Truth Promise Workflow.md` | how to create or refresh a stitched analytical promise and Active Promises row |
| `Workflows/*.md` | algorithms |
| `Templates/*.md` | skeletons |

## State vs Log

State = current active situation.

Log = accumulated facts.

Notes = incubator for deferred, unstable, or not-yet-owned information.

Templates = reusable skeletons.

Workflows = step-by-step algorithms.

Examples = rendered reference outputs. They are not state, not templates, and not the source of truth.

## New file rule

If it is not clearly a new responsibility, put it into `Deferred and Ideas Notes.md`.

A notes file may have a template when repeated structure is useful.
