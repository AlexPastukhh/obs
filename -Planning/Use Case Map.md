# Planning Use Case Map

Status: active use-case router.

Purpose: map user intent to reads, workflow, file updates, and expected output.

This file is not a workflow and not a template.

## Main process

User intent -> read needed files -> run workflow -> update owner file -> return Dashboard Core / Mnemonic Emoji Table / compact Planning State Output when relevant.

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
| `/start-day` | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Templates/Planning State Output Template.md`, `Templates/Default Dashboard Template.md`, `Examples/Start Day Missing Input Example.md` | `Start Day Workflow.md` | `Today State.md` | Default Dashboard Core + Mnemonic Emoji Table + compact Planning State Output; if goal/Desired/Undesired are missing, show missing fields instead of inventing them; do not create Active Promises by default |
| “цель на день…” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Templates/Planning State Output Template.md` | `Start Day Workflow.md` | `Today State.md` | Updated day goal + Default Dashboard Core + Mnemonic Emoji Table + compact Planning State Output |
| “покажи состояние” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Templates/Planning State Output Template.md`, `Examples/Start Day Missing Input Example.md`, `Examples/Midday Planning State Output Example.md` | none | none | Default Dashboard Core + Mnemonic Emoji Table + compact Planning State Output |
| “дай дашборд” | `Templates/Default Dashboard Template.md` | none | none | Default Dashboard Core + Mnemonic Emoji Table |
| “что дальше?” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Templates/Planning State Output Template.md`, `Templates/Default Dashboard Template.md`, `Examples/Start Day Missing Input Example.md`, `Examples/Midday Planning State Output Example.md` | `Use Dashboard Workflow.md` | none | Default Dashboard Core + Mnemonic Emoji Table + compact Planning State Output |
| “напомни алгоритм” | `Work Rails Principles.md`, `Templates/Default Dashboard Template.md` | none | none | Default Dashboard Core + Mnemonic Emoji Table + short principle summary |
| “дай мнемонику” | `Templates/Default Dashboard Template.md` | none | none | Dashboard core mnemonic + Mnemonic Emoji Table |
| “дай короткую таблицу” | `Templates/Default Dashboard Template.md` | none | none | Default Dashboard Core + Mnemonic Emoji Table |
| “дай пример output” / “как должен выглядеть planning output?” | `Examples/Start Day Missing Input Example.md`, `Examples/Midday Planning State Output Example.md`, `Templates/Planning State Output Template.md`, `Templates/Default Dashboard Template.md` | none | none | Example output + note that examples are reference only |
| “создай обещание” / “обнови обещание” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Templates/Planning State Output Template.md`, `Work Rails Principles.md` | `Build Truth Promise Workflow.md` | maybe `Today State.md` or note | Default Dashboard Core + Mnemonic Emoji Table + updated Active Promises table; if required material is missing, show missing fields instead of inventing a promise |
| “химия не совпадает” / “не хочется” / “тянет не туда” | `Templates/Planning State Output Template.md`, `Work Rails Principles.md` | `Build Truth Promise Workflow.md` | maybe `Today State.md` | Default Dashboard Core + Mnemonic Emoji Table + Active Promises update or missing promise requirements |
| “я начинаю работу / сессию” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Templates/Planning State Output Template.md`, `Templates/Default Dashboard Template.md` | `Use Dashboard Workflow.md` | maybe `Today State.md` | Default Dashboard Core + Mnemonic Emoji Table + compact Planning State Output |
| “следующая сессия X” | `Current Plan State.md`, `Today State.md` | `Check Course Alignment Workflow.md` | `Today State.md` | Session goal / warning |
| `/s ...`, “30 мин делал…” | `Today State.md`, `Current Plan State.md`, `Session Log.md`, `Work Rails Principles.md`, `Templates/Planning State Output Template.md`, `Templates/Default Dashboard Template.md` | `Log Session Workflow.md` | `Session Log.md`, `Today State.md` | Session entry + Default Dashboard Core + Mnemonic Emoji Table + updated compact Planning State Output + result progress |
| “я оцениваю сессию так: D/F/K/P…” | `Today State.md`, `Current Plan State.md`, `Session Log.md`, `Work Rails Principles.md` | `Log Session Workflow.md` | `Session Log.md`, `Today State.md` | Session entry + contradiction check + Default Dashboard Core + Mnemonic Emoji Table + updated compact Planning State Output |
| “сессия приблизила результат?” | `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | `Log Session Workflow.md` | maybe `Session Log.md` | Progress Signal + Default Dashboard Core + Mnemonic Emoji Table + compact Planning State Output |
| “это по курсу?” | `Current Plan State.md`, `Work Rails Principles.md` | `Check Course Alignment Workflow.md` | none or `Session Log.md` | K rating / justification |
| “важно, но не сейчас” | `Current Plan State.md` or `Deferred and Ideas Notes.md` | `Update Current Plan Workflow.md` or none | owner file | Added to plan or deferred notes |
| “я теряю результат / утопаю в процессе” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Work Rails Principles.md`, `Templates/Default Dashboard Template.md` | `Use Dashboard Workflow.md` | maybe `Today State.md` | Default Dashboard Core + Mnemonic Emoji Table + compact Planning State Output / result correction |
| “я заметил, что свернул” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Work Rails Principles.md`, `Templates/Default Dashboard Template.md` | `Use Dashboard Workflow.md` | maybe `Session Log.md` | Default Dashboard Core + Mnemonic Emoji Table + Correction Path; update compact Planning State Output if needed |
| “мне нужно поправиться” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | `Use Dashboard Workflow.md` | maybe `Session Log.md` | Diagnose what broke + restart |
| “потерял темп / вязну” | `Current Plan State.md`, `Today State.md`, `Session Log.md`, `Work Rails Principles.md`, `Templates/Default Dashboard Template.md` | `Use Dashboard Workflow.md` | maybe `Session Log.md` | Default Dashboard Core + Mnemonic Emoji Table + Score/tempo correction |
| “я раскис / знал но ушёл” | `Today State.md`, `Current Plan State.md`, `Session Log.md`, `Work Rails Principles.md` | `Log Session Workflow.md` | `Session Log.md`, `Today State.md` | CV/SD event + compact Planning State Output |
| “что с recovery / 4г 2м 15д?” | `Current Plan State.md`, `Work Rails Principles.md` | none | maybe `Current Plan State.md` | Recovery goal / NDU explanation |
| “закрываем день” | `Today State.md`, `Session Log.md`, `Work Rails Principles.md` | `End Day Workflow.md` | `Session Log.md`, maybe `Today State.md` | Day summary + final Default Dashboard Core + Mnemonic Emoji Table + final compact Planning State Output |

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

### Default Dashboard Core

Owner: `Templates/Default Dashboard Template.md`

Use it for rendered Dashboard Core, Mnemonic Emoji Table, 🎯Рез Details, 🧵📜>🧪Обещ Details, and 📊Скор Details.

Do not reconstruct dashboard from memory or from `Work Rails Principles.md`.

Old dashboard variants without `Real Fun vs Stimulation`, `стимуляция соперничает с реально хорошими вещами`, `Desired prediction`, `Real Pain vs Chemistry`, `Undesired prediction`, `Chem vs Promise`, `Fire / Wood`, `не разжигать химикаты/стимулы`, `химикаты: осознать и дать догореть`, `стимулы: переключить на нужные стимулы`, `short-distance race / 📊Скор Boost`, `Core D/F/K/P`, `Tempo`, `Guard`, and `Boost` are stale.

### Compact Planning State Output

Owner: `Templates/Planning State Output Template.md`

Use it for exact compact state structure.

### Start-day missing input

Owner: `Workflows/Start Day Workflow.md`

At day start, missing target / Desired / Undesired is valid state.

AI should surface missing input and direct the user to define it, not fabricate a default external work target or promise.

Do not create Active Promises by default.

Use `Examples/Start Day Missing Input Example.md` as reference.

### Principles

Owner: `Work Rails Principles.md`

Use it for meaning and principles, not rendered structures.

### Examples

Owner: `Examples/*.md`

Examples show rendered reference output only.

If examples conflict with templates, templates win.

Do not confuse these layers.
