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
| `Today State.md` | active day state: compact Result Tracking, Active Promises, Finished Sessions, notes |
| `Session Log.md` | factual session/event/day-summary history; may store flags when useful |
| `Work Rails Principles.md` | meaning and principles only; does not own rendered dashboard or compact state tables |
| `Deferred and Ideas Notes.md` | deferred tasks, unstable ideas, future workflows, open/dangerous scenarios |
| `Emoji Notation Map.md` | explicit emoji notation agreements used across planning docs; prevents notation drift; not a full glossary and not owner of dashboard layout |
| `Templates/Planning State Output Template.md` | only source of truth for compact Planning State Output structure, including Result Tracking, global-goals snapshot inside Result Tracking, Point 6 compact score-check block, Active Promises, Finished Sessions, missing-field format, and no-promises format |
| `Templates/Today State Template.md` | skeleton for active day state; starts with missing fields, global-goals snapshot placeholder, and no active promises unless user provided enough input |
| `Templates/Default Dashboard Template.md` | only source of truth for full Dashboard Core, Mnemonic Emoji Table, 🎯Рез Details, 🧵📜>🧪Обещ Details, and 📊Скор Details; full Dashboard Core is rendered only on explicit request, Mnemonic Emoji Table is used by default |
| `Examples/*.md` | rendered reference outputs only; templates win if conflict exists |
| `Examples/Start Day Missing Input Example.md` | example of `/start-day` when target / Desired / Undesired / promises are missing; shows mnemonic + compact state, not full dashboard by default |
| `Examples/Midday Planning State Output Example.md` | example of default planning-mode output using mnemonic and compact planning state |
| `Workflows/Start Day Workflow.md` | how to start/update day state, including missing-input handling, global goals inside Result Tracking, and no default promise creation |
| `Workflows/Use Dashboard Workflow.md` | behavior for combining mnemonic + compact state; source precedence for full dashboard and mnemonic |
| `Workflows/Real Reward Work Loop Workflow.md` | core personal work loop: real reward vs empty stimulation/chemistry, attaching needed stimuli, handling chemistry/stimulation, promises when needed, and short-distance D/F/K/P self-competition with active score patterns |
| `Workflows/Real Reward Pattern Playbook.md` | score-relevant behavioral patterns for Real Reward Work Loop; owns full pattern templates, emoji labels, Fundamental/Situational/Frequent categories, including frequent Situational patterns that are included in point 6 by default; not a log, not rendered output, not state |
| `Workflows/Build Truth Promise Workflow.md` | how to create or refresh a stitched analytical promise and Active Promises row; must not invent promises without enough current material |
| `Workflows/Update Current Plan Workflow.md` | how to update current/global plan and return mnemonic + compact planning state by default |
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
