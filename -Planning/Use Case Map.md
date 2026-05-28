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
| “куда это записать?” | `Responsibility Map.md`, `Documentation Principles.md` | none | owner file or `Deferred and Ideas Notes.md` | Routing decision |
| “обновим текущий план” | `Current Plan State.md` | `Update Current Plan Workflow.md` | `Current Plan State.md` | Updated flexible plan |
| “сейчас главное X” | `Current Plan State.md` | `Update Current Plan Workflow.md` | `Current Plan State.md` | Updated focus |
| “вот список дел / планы / расписание” | `Current Plan State.md` | `Update Current Plan Workflow.md` | `Current Plan State.md` | Updated plan |
| “это отложенная задача / идея / потом” | `Deferred and Ideas Notes.md` | none | `Deferred and Ideas Notes.md` | Deferred note |
| “опасный сценарий / возможная ошибка” | `Deferred and Ideas Notes.md` | none | `Deferred and Ideas Notes.md` | Open/dangerous scenario note |
| `/start-day` | `Current Plan State.md`, `Today State.md` | `Start Day Workflow.md` | `Today State.md` | Structured day plan |
| “цель на день…” | `Current Plan State.md`, `Today State.md` | `Start Day Workflow.md` | `Today State.md` | Updated day goal |
| “желаемый / нежелательный результат сегодня” | `Today State.md`, `Work Rails Principles.md` | none | `Today State.md` | Updated Result Anchor |
| “я теряю результат / утопаю в процессе” | `Today State.md`, `Work Rails Principles.md` | none | maybe `Today State.md` | Re-check Result Anchor |
| “следующая сессия X” | `Current Plan State.md`, `Today State.md` | `Check Course Alignment Workflow.md` | `Today State.md` | Session goal / warning |
| `/s ...`, “30 мин делал…” | `Today State.md`, `Current Plan State.md`, `Work Rails Principles.md` | `Log Session Workflow.md` | `Session Log.md`, `Today State.md` | Session entry + counters + progress snapshot |
| “я оцениваю сессию так: D/F/K/P…” | `Today State.md`, `Current Plan State.md`, `Work Rails Principles.md` | `Log Session Workflow.md` | `Session Log.md`, `Today State.md` | Session entry; check contradictions |
| “сессия приблизила результат?” | `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | `Log Session Workflow.md` | `Session Log.md` | Progress signal |
| “это по курсу?” | `Current Plan State.md`, `Work Rails Principles.md` | `Check Course Alignment Workflow.md` | none or `Session Log.md` | K rating / justification |
| “важно, но не сейчас” | `Current Plan State.md` or `Deferred and Ideas Notes.md` | `Update Current Plan Workflow.md` or none | owner file | Added to plan or deferred notes |
| “я раскис / знал но ушёл” | `Today State.md`, `Work Rails Principles.md` | `Log Session Workflow.md` | `Session Log.md`, `Today State.md` | CV/SD event + next action |
| “что с recovery / 4г 2м 15д?” | `Current Plan State.md`, `Work Rails Principles.md` | none | maybe `Current Plan State.md` | Recovery goal / NDU explanation |
| “закрываем день” | `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | `End Day Workflow.md` | `Session Log.md`, maybe `Today State.md` | Day summary |

## Commands

`/start-day` = start/update day state.

`/s` = log session.

`/align` = check course alignment.

`/idea` = add to Deferred and Ideas Notes.

`/cv` = log possible Course Violation.

## Routing rule

If information is stable and has an owner, update the owner file.

If information is unstable, deferred, or an open scenario, put it in `Deferred and Ideas Notes.md`.

If no owner exists, check `Responsibility Map.md`.

## Scoring notation

Use D/F/K/P.

Do not use old V/Q/C/L notation.
