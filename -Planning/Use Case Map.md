# Planning Use Case Map

Status: active use-case router.

Purpose: map user intent to reads, workflow, file updates, and expected output.

This file is not a workflow and not a template.

## Main process

User intent -> read needed files -> run workflow -> update owner file -> return Planning State Output / Default Dashboard Core / next action when relevant.

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
| `/start-day` | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Templates/Planning State Output Template.md`, `Templates/Default Dashboard Template.md` | `Start Day Workflow.md` | `Today State.md` | Planning State Output + optional Default Dashboard Core + next physical action |
| “цель на день…” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Templates/Planning State Output Template.md` | `Start Day Workflow.md` | `Today State.md` | Updated day goal + Planning State Output + next physical action |
| “покажи состояние” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Templates/Planning State Output Template.md` | none | none | Planning State Output |
| “дай дашборд” | `Templates/Default Dashboard Template.md`, `Work Rails Principles.md` | none | none | Default Dashboard Core |
| “что дальше?” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Templates/Planning State Output Template.md`, `Templates/Default Dashboard Template.md` | `Use Dashboard Workflow.md` | none | Planning State Output + Default Dashboard Core + next physical action |
| “напомни алгоритм” | `Work Rails Principles.md`, `Templates/Default Dashboard Template.md` | none | none | Default Dashboard Core + short principle summary |
| “дай мнемонику” | `Templates/Default Dashboard Template.md` | none | none | Dashboard core mnemonic + optional Mnemonic Emoji Table |
| “дай короткую таблицу” | `Templates/Default Dashboard Template.md` | none | none | Default Dashboard Core table |
| “создай обещание” / “обнови обещание” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Templates/Planning State Output Template.md`, `Work Rails Principles.md` | `Build Truth Promise Workflow.md` | maybe `Today State.md` or note | Truth Promise + short-distance action |
| “химия не совпадает” / “не хочется” / “тянет не туда” | `Templates/Planning State Output Template.md`, `Work Rails Principles.md` | `Build Truth Promise Workflow.md` | maybe `Session Log.md` | Recall/build Truth Promise + Default Dashboard Core + short-distance action |
| “я начинаю работу / сессию” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Templates/Planning State Output Template.md`, `Templates/Default Dashboard Template.md` | `Use Dashboard Workflow.md` | maybe `Today State.md` | Planning State Output + Default Dashboard Core + next physical action |
| “следующая сессия X” | `Current Plan State.md`, `Today State.md` | `Check Course Alignment Workflow.md` | `Today State.md` | Session goal / warning |
| `/s ...`, “30 мин делал…” | `Today State.md`, `Current Plan State.md`, `Session Log.md`, `Work Rails Principles.md`, `Templates/Planning State Output Template.md`, `Templates/Default Dashboard Template.md` | `Log Session Workflow.md` | `Session Log.md`, `Today State.md` | Session entry + Planning State Output + optional Default Dashboard Core + next physical action |
| “я оцениваю сессию так: D/F/K/P…” | `Today State.md`, `Current Plan State.md`, `Session Log.md`, `Work Rails Principles.md` | `Log Session Workflow.md` | `Session Log.md`, `Today State.md` | Session entry + contradiction check + Planning State Output + next physical action |
| “сессия приблизила результат?” | `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | `Log Session Workflow.md` | maybe `Session Log.md` | Progress Signal + Planning State Output |
| “это по курсу?” | `Current Plan State.md`, `Work Rails Principles.md` | `Check Course Alignment Workflow.md` | none or `Session Log.md` | K rating / justification |
| “важно, но не сейчас” | `Current Plan State.md` or `Deferred and Ideas Notes.md` | `Update Current Plan Workflow.md` or none | owner file | Added to plan or deferred notes |
| “я теряю результат / утопаю в процессе” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Work Rails Principles.md`, `Templates/Default Dashboard Template.md` | `Use Dashboard Workflow.md` | maybe `Today State.md` | Planning State Output + Default Dashboard Core / result correction |
| “я заметил, что свернул” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Work Rails Principles.md`, `Templates/Default Dashboard Template.md` | `Use Dashboard Workflow.md` | maybe `Session Log.md` | Default Dashboard Core + Correction Path + next physical action |
| “мне нужно поправиться” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | `Use Dashboard Workflow.md` | maybe `Session Log.md` | Diagnose what broke + restart |
| “потерял темп / вязну” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Work Rails Principles.md`, `Templates/Default Dashboard Template.md` | `Use Dashboard Workflow.md` | maybe `Session Log.md` | Default Dashboard Core + Score/tempo correction |
| “я раскис / знал но ушёл” | `Today State.md`, `Current Plan State.md`, `Session Log.md`, `Work Rails Principles.md` | `Log Session Workflow.md` | `Session Log.md`, `Today State.md` | CV/SD event + Planning State Output + next action |
| “что с recovery / 4г 2м 15д?” | `Current Plan State.md`, `Work Rails Principles.md` | none | maybe `Current Plan State.md` | Recovery goal / NDU explanation |
| “закрываем день” | `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | `End Day Workflow.md` | `Session Log.md`, maybe `Today State.md` | Day summary + final Planning State Output |

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

## Output layers

Planning State Output:

- owned by `Templates/Planning State Output Template.md`;
- AI-maintained state output;
- includes goals, desired/undesired, Progress Signal, sessions/score, global context, current/next.

Default Dashboard Core:

- owned by `Templates/Default Dashboard Template.md`;
- compact mnemonic/action core;
- `🎯Рез -> 🧵📜>🧪Обещ -> 📊Скор -> 🧲ЗИ`.

Truth Promise:

- principle described in `Work Rails Principles.md`;
- step-by-step creation in `Workflows/Build Truth Promise Workflow.md`.

Do not confuse these layers.
