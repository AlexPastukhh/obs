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
| `Use Case Map.md` | use-case routing |
| `Responsibility Map.md` | file ownership |
| `Documentation Principles.md` | file types and documentation rules |
| `Current Plan State.md` | flexible current plan, focus, tasks, rough schedule, background recovery goal |
| `Today State.md` | active day state: compact Result Tracking, Active Promises, Finished Sessions, notes |
| `Session Log.md` | factual session/event/day-summary history; may store flags when useful |
| `Work Rails Principles.md` | D/F/K/P, flags, course violations, recovery/NDU, work rails context, Truth Promise principles, dashboard meaning |
| `Deferred and Ideas Notes.md` | deferred tasks, unstable ideas, future workflows, open/dangerous scenarios |
| `Templates/Planning State Output Template.md` | compact planning state output skeleton: Result Tracking, Active Promises, Finished Sessions |
| `Templates/Default Dashboard Template.md` | compact action/memory core + attached Mnemonic Emoji Table: 🎯Рез -> 🧵📜>🧪Обещ -> 📊Скор -> 🧲ЗИ |
| `Examples/*.md` | concrete examples of expected rendered planning outputs; reference only, not source of truth |
| `Examples/Midday Planning State Output Example.md` | example of default planning-mode output using dashboard, mnemonic, and compact planning state |
| `Workflows/Use Dashboard Workflow.md` | how to combine compact Planning State Output with Default Dashboard Core |
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
