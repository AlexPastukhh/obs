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
| `Today State.md` | structured active day state |
| `Session Log.md` | factual session/event/day-summary history |
| `Work Rails Principles.md` | D/F/K/P, flags, course violations, recovery/NDU, work rails context |
| `Deferred and Ideas Notes.md` | deferred tasks, unstable ideas, future workflows, open/dangerous scenarios |
| `Workflows/*.md` | algorithms |
| `Templates/*.md` | skeletons |

## State vs Log

State = current active situation.

Log = accumulated facts.

Notes = incubator for deferred, unstable, or not-yet-owned information.

## New file rule

If it is not clearly a new responsibility, put it into `Deferred and Ideas Notes.md`.

A notes file may have a template when repeated structure is useful.
