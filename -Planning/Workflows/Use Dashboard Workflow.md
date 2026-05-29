# Use Dashboard Workflow

Status: active workflow.

Purpose: explain how AI should use the compact Planning State Output together with the Mnemonic Emoji Table and the on-demand full Dashboard Core.

## Uses

- `Templates/Planning State Output Template.md`
- `Templates/Default Dashboard Template.md`
- `Work Rails Principles.md`
- `Workflows/Real Reward Work Loop Workflow.md`
- `Current Plan State.md`
- `Today State.md`
- `Session Log.md`
- `Examples/Start Day Missing Input Example.md`
- `Examples/Midday Planning State Output Example.md`

## Source precedence

When rendering the Mnemonic Emoji Table or full Dashboard Core, use:

`Templates/Default Dashboard Template.md`

Do not reconstruct dashboard/mnemonic from:

- memory;
- old chat context;
- `Work Rails Principles.md` prose;
- older examples.

A rendered dashboard or mnemonic is stale if it lacks:

- Real Fun vs Stimulation;
- `стимуляция соперничает с реально хорошими вещами`;
- Desired prediction;
- Real Pain vs Chemistry;
- Undesired prediction;
- Chem vs Promise;
- Fire / Wood;
- `не разжигать химикаты/стимулы`;
- `химикаты: осознать и дать догореть`;
- `стимулы: переключить на нужные стимулы`;
- short-distance race / `📊Скор -> Boost`;
- Core D/F/K/P;
- Tempo;
- Guard;
- Boost.

When rendering compact Planning State Output, use:

`Templates/Planning State Output Template.md`

Examples are references only.

## Default output contract

In normal planning/state/session-control answers, after the normal work/update answer, output the Default Daily Template Pack:

1. Mnemonic Emoji Table.
2. Compact Planning State Output:
   - 🎯 Result Tracking;
   - 🧵📜>🧪 Active Promises;
   - 🧾 Finished Sessions.

Do not render full Dashboard Core by default.

Render full Dashboard Core only when the user explicitly asks:

- “дай дашборд”;
- “покажи полный дашборд”;
- “покажи структуру дашборда”;
- “обновим дашборд”;
- “проверим дашборд”;
- or when the dashboard itself is the object of discussion.

Mnemonic Emoji Table still comes from `Templates/Default Dashboard Template.md`.
The full Dashboard Core and Mnemonic Emoji Table share one source of truth, but only the mnemonic travels by default.

## Steps

1. Load `Templates/Default Dashboard Template.md` as source of truth for the mnemonic.
2. Show Mnemonic Emoji Table by default in planning/state/session-control mode.
3. Show full Dashboard Core only on explicit dashboard request.
4. Render compact Planning State Output when state/action guidance is relevant:
   - 🎯 Result Tracking;
   - 🧵📜>🧪 Active Promises;
   - 🧾 Finished Sessions.
5. Identify the current Result Tracking:
   - 🎯 Цель дня;
   - 🌅 Desired;
   - 🌑 Undesired;
   - 🗺️ Ближайшие глобальные цели.
6. Identify Active Promises as rows when they exist:
   - 🧪 Сейчас чувствую / тянет;
   - 📐 Аналитически выведено;
   - 🧵📜 Пришить как истину;
   - 🌑 Не покупать;
   - 🏁 Отрезок.
7. Use `🏁 Отрезок` from Active Promises when a concrete action / short-distance move is needed.
8. Read progress from Finished Sessions, not from a separate Progress counters block.
9. Decide which dashboard column is most relevant now:
   - 🎯Рез = reconnect to real result:
     - identify real fun vs stimulation;
     - remember that stimulation competes with real good things;
     - identify real pain vs chemistry;
     - build Desired/Undesired as analytical predictions;
     - return to Result Tracking instead of process.
   - 🧵📜>🧪Обещ = use promise over chemistry:
     - do not treat chemistry as authority;
     - use analytical promise;
     - remember effect may appear after action;
     - stitch promise as source of truth;
     - do not ignite chemistry/stimulation;
     - chemistry response: notice and wait until it burns out;
     - stimulation response: switch to needed stimuli;
     - for short race, use `📊Скор -> Boost`;
     - remember wood is limited.
   - 📊Скор = Core D/F/K/P + Tempo + Guard + Boost;
   - 🧲ЗИ = notice where the magnet pulls and what happens to future actions.
10. If the user is confused by `📊Скор`, explain:
    - D = useful work actually done;
    - F = focus / self-management;
    - K = relation to current course;
    - P = value left after the session;
    - Tempo supports D/F but is not a fifth score criterion;
    - Guard prevents fake progress: занятость≠D, процесс≠результат, интересно≠нужно;
    - Boost means short-distance execution / self-competition.

## Real Reward Work Loop

For the full action loop that connects real reward, empty stimulation/chemistry, needed stimuli, promises, and D/F/K/P short-distance race, use:

`Workflows/Real Reward Work Loop Workflow.md`

This workflow answers:

- What real reward makes the time non-empty?
- What is only stimulation / chemistry pretending to be reward?
- Which stimulation should be redirected toward the target?
- Does chemistry need to be noticed and allowed to burn out?
- Is a promise needed?
- What short D/F/K/P race should be won now?

Do not duplicate the full Real Reward Work Loop here.

This file owns dashboard/mnemonic usage and output composition only.

## Output rule

In normal planning/session-control answers, output:

1. Normal answer:
   - what was updated/done;
   - commit/hash if available;
   - missing input / next required input if relevant.

2. Mnemonic Emoji Table:
   - from `Templates/Default Dashboard Template.md`.

3. Compact Planning State Output when state/action guidance is needed:
   - 🎯 Result Tracking;
   - 🧵📜>🧪 Active Promises;
   - 🧾 Finished Sessions.

Do not output only the normal answer after a planning-state update.

Do not render full Dashboard Core by default.

Render full Dashboard Core only on explicit dashboard request or dashboard-structure discussion.

For narrow technical answers, file checks, archive/package delivery, or when the user explicitly asks for a short answer, AI may omit the Default Daily Template Pack.

Do not force the user to manually open state files unless manual review, edit, or diff inspection is actually needed.

Use `Examples/Midday Planning State Output Example.md` and `Examples/Start Day Missing Input Example.md` only as formatting/reference examples. Templates and workflows remain the source of truth.
