# Planning Use Case Map

Status: active use-case router.

Purpose: map user intent to reads, workflow, file updates, and expected output.

This file is not a workflow and not a template.

## Main process

User intent -> identify date when day-state is involved -> read needed files -> run workflow -> update owner file -> return normal work/update summary -> return Default Daily Template Pack when relevant.

AI must not infer current day automatically.

For day-state work, the user provides the date or establishes an active conversation day date.

Date-based day file:

`Days/YYYY/YYYY-MM-DD.md`

## Default Daily Template Pack

1. Mnemonic Emoji Table.
2. Compact Planning State Output.

Full Dashboard Core is not part of the default pack.

Support Facts are not part of default compact output unless relevant, requested, or during day close / support review.

## Core date-based routes

| User says / means | Read | Workflow | Update | Output |
|---|---|---|---|---|
| “начинаем 2026-05-30” / “создай день 2026-05-30” / “работаем с 2026-05-30” / “открой день 2026-05-30” | `Days/README.md`, `Templates/Day File Template.md`, `Current Plan State.md`, `Templates/Planning State Output Template.md`, `Templates/Default Dashboard Template.md` | `Use Day File Workflow.md`, `Start Day Workflow.md` | `Days/YYYY/YYYY-MM-DD.md` | Created/opened day file + Mnemonic Emoji Table + compact Planning State Output |
| `/s 2026-05-30 30м ...` / `/s 30м ...` with active day date | `Days/YYYY/YYYY-MM-DD.md`, `Current Plan State.md`, `Work Rails Principles.md`, `Templates/Planning State Output Template.md`, `Templates/Default Dashboard Template.md` | `Log Session Workflow.md`, `Use Day File Workflow.md` | `Days/YYYY/YYYY-MM-DD.md` | Logged session + Work Score Summary + Default Daily Template Pack |
| “2026-05-30: не объелся” / “после S5 двигался 15 минут” / “объелся” / “пытался заснуть час” / “был stimulus drift перед сном” | `Days/YYYY/YYYY-MM-DD.md`, `Templates/Support Facts Table Template.md`, `Support Score Guide.md` | `Use Day File Workflow.md` | `Days/YYYY/YYYY-MM-DD.md` | Support fact added. No Support Score calculated during the day. |
| “посчитай support за 2026-05-30” / “закрой support за вчера” / “утренний review 2026-05-30” | `Days/YYYY/YYYY-MM-DD.md`, `Support Score Guide.md`, `Templates/Support Score Review Template.md`, `Examples/Support Score Day Examples.md` | `Support Score Review Workflow.md`, `Use Day File Workflow.md` | `Days/YYYY/YYYY-MM-DD.md` | Support Score breakdown + interpretation + updated day file |
| “закрываем 2026-05-30” / “закрой день 2026-05-30” | `Days/YYYY/YYYY-MM-DD.md`, `Support Score Guide.md`, `Templates/Support Score Review Template.md`, `Templates/Default Dashboard Template.md`, `Templates/Planning State Output Template.md` | `End Day Workflow.md`, `Use Day File Workflow.md`, maybe `Support Score Review Workflow.md` | `Days/YYYY/YYYY-MM-DD.md` | Final Day Summary + Work Score + Support Score if calculated + final compact output |

## Pattern Capture routes

| User says / means | Read | Workflow | Update | Output |
|---|---|---|---|---|
| “спланируем Tampermonkey capture” / “как делать панель паттернов” | `Tools/Pattern Capture/README.md`, files in `Tools/Pattern Capture/` | none or docs update | tool docs | Tool plan / requirements |
| “обновим требования к Pattern Capture panel” | `Tools/Pattern Capture/Panel UI Requirements.md`, `Tools/Pattern Capture/Storage and Data Model.md` | docs update | tool docs | Updated UI/storage requirements |
| “импортируй pattern capture в day file 2026-05-30” | `Templates/Pattern Capture Export Template.md`, `Workflows/Pattern Capture Import Workflow.md`, `Days/YYYY/YYYY-MM-DD.md`, `Templates/Support Facts Table Template.md` | `Pattern Capture Import Workflow.md`, `Use Day File Workflow.md` | `Days/YYYY/YYYY-MM-DD.md` | Imported event counts + updated day file |
| “дай формат экспорта Pattern Capture” | `Tools/Pattern Capture/Export Format.md`, `Templates/Pattern Capture Export Template.md` | none | none | Markdown/json export format |
| “какие кнопки должны быть в Pattern Capture” | `Tools/Pattern Capture/Event Taxonomy.md`, `Workflows/Real Reward Pattern Playbook.md`, `Emoji Notation Map.md` | none or docs update | maybe tool docs | Button taxonomy |
| “реализуем userscript” / “напиши Tampermonkey v1” | `Tools/Pattern Capture/Implementation Plan.md`, `Tools/Pattern Capture/Script File Structure.md`, `Tools/Pattern Capture/Storage and Data Model.md`, `Tools/Pattern Capture/Panel UI Requirements.md` | implementation task | script file / response | Userscript implementation plan or code |

## Other routes

| User says / means | Read | Workflow | Update | Output |
|---|---|---|---|---|
| “что это за система?” | `System Overview.md`, `Work Rails Principles.md`, `Days/README.md`, `Templates/Default Dashboard Template.md` | none | none | Explanation + Default Daily Template Pack if relevant |
| “куда это записать?” | `Responsibility Map.md`, `Documentation Principles.md` | none | owner file or `Deferred and Ideas Notes.md` | Routing decision |
| “дай дашборд” / “покажи полный дашборд” / “покажи структуру дашборда” | `Templates/Default Dashboard Template.md` | none | none | Full Dashboard Core + Mnemonic Emoji Table |
| “дай мнемонику” | `Templates/Default Dashboard Template.md` | none | none | Mnemonic Emoji Table |
| “дай пример output” | `Examples/Start Day Missing Input Example.md`, `Examples/Midday Planning State Output Example.md`, `Templates/Planning State Output Template.md` | none | none | Example output + source-of-truth note |
| `/patterns` / “покажи паттерны пункта 6” | `Workflows/Real Reward Work Loop Workflow.md`, `Workflows/Real Reward Pattern Playbook.md`, `Emoji Notation Map.md` | none | none | Full templates for active point-6 patterns |
| `/pattern <name>` | `Workflows/Real Reward Pattern Playbook.md`, `Emoji Notation Map.md` | none | none | Full selected pattern template |
| “что значит emoji X?” / “обновим emoji notation” | `Emoji Notation Map.md` | none or docs update | owner file | Emoji meaning / update routing |
| “создай обещание” / “обнови обещание” | relevant day file, `Current Plan State.md`, `Work Rails Principles.md` | `Build Truth Promise Workflow.md`, `Use Day File Workflow.md` | day file | Updated Active Promises or missing requirement |
| “это по курсу?” | `Current Plan State.md`, `Work Rails Principles.md` | `Check Course Alignment Workflow.md` | none or relevant day file if logging result | K rating / justification |
| “обновим текущий план” / “сейчас главное X” | `Current Plan State.md`, relevant day file if day-state involved | `Update Current Plan Workflow.md` | `Current Plan State.md` | Updated plan/focus summary + Default Daily Template Pack |
| “это отложенная задача / идея / потом” | `Deferred and Ideas Notes.md` | none | `Deferred and Ideas Notes.md` | Deferred note |

## Commands

`/start-day <YYYY-MM-DD>` = create/open/update date-based day file.

`/s <YYYY-MM-DD> ...` = log work session to date-based day file.

`/support <YYYY-MM-DD> ...` = add support fact to date-based day file.

`/support-review <YYYY-MM-DD>` = calculate support score for the day.

`/close-day <YYYY-MM-DD>` = close day file.

`/pattern-capture-import <YYYY-MM-DD>` = import Pattern Capture export into date-based day file.

`/patterns` = show full templates for active point-6 patterns.

`/pattern <name>` = show one selected full pattern template.

## Date rule

AI must not infer current day automatically.

Use the date provided by the user or the active conversation day date established by the user.

If no date is available for a day-state update, ask for the date.

## Support rule

Support Facts are collected during the day.

Support Score is calculated at day close / next morning.

Support Score never replaces Work Score and never closes 35 / 70.

## Pattern Capture rule

Pattern Capture exports are raw events.

They do not calculate Work Score.

They do not calculate Support Score.

They are imported into date-based day files through `Workflows/Pattern Capture Import Workflow.md`.

## Output layers

Full Dashboard Core owner: `Templates/Default Dashboard Template.md`

Emoji notation owner: `Emoji Notation Map.md`

Compact Planning State Output owner: `Templates/Planning State Output Template.md`

Day files owner: `Days/YYYY/YYYY-MM-DD.md`, created from `Templates/Day File Template.md`

Support facts layout owner: `Templates/Support Facts Table Template.md`

Support score rules owner: `Support Score Guide.md`

Pattern Capture tool docs owner: `Tools/Pattern Capture/README.md`

Pattern Capture export template owner: `Templates/Pattern Capture Export Template.md`

Pattern Capture import workflow owner: `Workflows/Pattern Capture Import Workflow.md`

Examples owner: `Examples/*.md`
