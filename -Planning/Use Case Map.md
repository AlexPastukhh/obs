# Planning Use Case Map

Status: active use-case router.

Purpose: map user intent to reads, workflow, file updates, and expected output.

This file is not a workflow and not a template.

## Main process

User intent -> read needed files -> run workflow -> update owner file -> return Default Dashboard + next action when relevant.

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
| `/start-day` | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | `Start Day Workflow.md` | `Today State.md` | Default Dashboard + structured day plan + next physical action |
| “цель на день…” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | `Start Day Workflow.md` | `Today State.md` | Updated day goal + Default Dashboard + next physical action |
| “что дальше?” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | none | none | Default Dashboard + next physical action |
| “покажи состояние” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | none | none | Default Dashboard |
| “дай дашборд” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | none | none | Default Dashboard |
| “я начинаю работу / сессию” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | none | maybe `Today State.md` | Default Dashboard + Core Rails Algorithm / Start Path + next physical action |
| “следующая сессия X” | `Current Plan State.md`, `Today State.md` | `Check Course Alignment Workflow.md` | `Today State.md` | Session goal / warning |
| `/s ...`, “30 мин делал…” | `Today State.md`, `Current Plan State.md`, `Session Log.md`, `Work Rails Principles.md` | `Log Session Workflow.md` | `Session Log.md`, `Today State.md` | Session entry + Default Dashboard + next physical action |
| “я оцениваю сессию так: D/F/K/P…” | `Today State.md`, `Current Plan State.md`, `Session Log.md`, `Work Rails Principles.md` | `Log Session Workflow.md` | `Session Log.md`, `Today State.md` | Session entry + contradiction check + Default Dashboard + next physical action |
| “сессия приблизила результат?” | `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | `Log Session Workflow.md` | maybe `Session Log.md` | Progress Signal + Default Dashboard |
| “это по курсу?” | `Current Plan State.md`, `Work Rails Principles.md` | `Check Course Alignment Workflow.md` | none or `Session Log.md` | K rating / justification |
| “важно, но не сейчас” | `Current Plan State.md` or `Deferred and Ideas Notes.md` | `Update Current Plan Workflow.md` or none | owner file | Added to plan or deferred notes |
| “я теряю результат / утопаю в процессе” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | none | maybe `Today State.md` | Default Dashboard + Re-check Result Anchor / Core Rails Algorithm |
| “я заметил, что свернул” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | none | maybe `Session Log.md` | Default Dashboard + Core Rails Algorithm / Correction Path + next physical action |
| “мне нужно поправиться” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | none | maybe `Session Log.md` | Default Dashboard + diagnose what broke + restart |
| “потерял темп / вязну” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | none | maybe `Session Log.md` | Default Dashboard + Score Action / tempo correction |
| “я раскис / знал но ушёл” | `Today State.md`, `Current Plan State.md`, `Session Log.md`, `Work Rails Principles.md` | `Log Session Workflow.md` | `Session Log.md`, `Today State.md` | CV/SD event + Default Dashboard + next action |
| “что с recovery / 4г 2м 15д?” | `Current Plan State.md`, `Work Rails Principles.md` | none | maybe `Current Plan State.md` | Recovery goal / NDU explanation |
| “закрываем день” | `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | `End Day Workflow.md` | `Session Log.md`, maybe `Today State.md` | Day summary + final Default Dashboard |

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

## Default Dashboard Mode

When AI is acting as the planning/session-control assistant, outputs should default to a compact dashboard.

Use `Work Rails Principles.md` for the full Default Dashboard Mode rule.

Default Dashboard includes:

- Global context;
- Today goal / Desired / Undesired;
- Progress counters;
- Recent sessions;
- Current session / next physical action.

Do not default to telling the user to open files when AI can summarize the state itself.

## Core Rails Algorithm

Use `Work Rails Principles.md` for Core Rails Algorithm.

Core Rails Algorithm is not a separate workflow yet.

Start Path:
- Result
- Clean Field
- Score Action
- Progress

Correction Path:
- Notice
- Diagnose
- Stop
- Restart
- One Physical Action
