# Planning Use Case Map

Status: active use-case router.

Purpose: map user intent to reads, workflow, file updates, and expected output.

This file is not a workflow and not a template.

## Main process

User intent -> read needed files -> run workflow -> update owner file -> return next action.

## Use cases

| User says / means | Read | Workflow | Update | Output |
|---|---|---|---|---|
| “что это за система?” | `System Overview.md`, `Work Rails Principles.md` | none | none | Explanation |
| “куда это записать?” | `Responsibility Map.md`, `Documentation Principles.md` | none | owner file or `Planning Ideas Notes.md` | Routing decision |
| “обновим текущий план” | `Current Plan State.md` | `Update Current Plan Workflow.md` | `Current Plan State.md` | Updated flexible plan |
| “сейчас главное X” | `Current Plan State.md` | `Update Current Plan Workflow.md` | `Current Plan State.md` | Updated focus |
| “вот список дел / планы / расписание” | `Current Plan State.md` | `Update Current Plan Workflow.md` | `Current Plan State.md` | Updated plan |
| `/start-day` | `Current Plan State.md`, `Today State.md` | `Start Day Workflow.md` | `Today State.md` | Structured day plan |
| “цель на день…” | `Current Plan State.md`, `Today State.md` | `Start Day Workflow.md` | `Today State.md` | Updated day goal |
| “следующая сессия X” | `Current Plan State.md`, `Today State.md` | `Check Course Alignment Workflow.md` | `Today State.md` | Session goal / warning |
| `/s ...`, “30 мин делал…” | `Today State.md`, `Current Plan State.md`, `Work Rails Principles.md` | `Log Session Workflow.md` | `Session Log.md`, `Today State.md` | Session entry + counters |
| “это по курсу?” | `Current Plan State.md`, `Work Rails Principles.md` | `Check Course Alignment Workflow.md` | none or `Session Log.md` | C rating / justification |
| “важно, но не сейчас” | `Current Plan State.md` | `Update Current Plan Workflow.md` | `Current Plan State.md` | Added to important-but-not-now |
| “я раскис / знал но ушёл” | `Today State.md`, `Work Rails Principles.md` | `Log Session Workflow.md` | `Session Log.md`, `Today State.md` | CV/SD event + next action |
| “закрываем день” | `Today State.md`, `Session Log.md` | `End Day Workflow.md` | `Session Log.md`, maybe `Today State.md` | Day summary |
| “идея для системы” | `Planning Ideas Notes.md` | none | `Planning Ideas Notes.md` | Incubated idea |

## Commands

`/start-day` = start/update day state.

`/s` = log session.

`/align` = check course alignment.

`/idea` = add to Planning Ideas Notes.

`/cv` = log possible Course Violation.

## Routing rule

If information is stable and has an owner, update the owner file.

If information is unstable, put it in `Planning Ideas Notes.md`.

If no owner exists, check `Responsibility Map.md`.
