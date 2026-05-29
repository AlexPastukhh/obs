# Use Dashboard Workflow

Status: active workflow.

Purpose: explain how AI should return the default day template pack and use the compact Planning State Output together with the Default Dashboard Core and attached Mnemonic Emoji Table.

## Uses

- `Templates/Planning State Output Template.md`
- `Templates/Default Dashboard Template.md`
- `Work Rails Principles.md`
- `Current Plan State.md`
- `Today State.md`
- `Session Log.md`
- `Examples/Midday Planning State Output Example.md`

## Source precedence

When rendering Dashboard Core or Mnemonic Emoji Table, use:

`Templates/Default Dashboard Template.md`

Do not reconstruct dashboard from:

- memory;
- old chat context;
- `Work Rails Principles.md` prose;
- older examples.

A rendered dashboard is stale if it lacks:

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

## Default response contract

In normal planning / state-control / session-control answers, AI returns the usual work/update summary first, then the Default Day Template Pack.

Default Day Template Pack:

1. Default Dashboard Core.
2. Mnemonic Emoji Table.
3. Compact Planning State Output:
   - 🎯 Result Tracking;
   - 🧵📜>🧪 Active Promises;
   - 🧾 Finished Sessions.

This default applies after:

- updating `Current Plan State.md`;
- updating `Today State.md`;
- updating `Session Log.md`;
- starting or updating the day;
- updating 🎯 Цель дня / 🌅 Desired / 🌑 Undesired;
- logging a session;
- answering “покажи состояние” / “что дальше?” / “я начинаю работу”;
- refreshing Active Promises.

Do not omit Dashboard Core or Mnemonic Emoji Table merely because the primary action was a file update.

Do not respond with only:

- “Updated X.md”;
- commit hash;
- a prose summary;
- compact Planning State Output alone.

The user should see what changed and then immediately see the day template pack.

## Narrow-output exception

AI may omit the Default Day Template Pack only when the user explicitly asks for a short answer, a narrow technical check, a repo/file diff check, archive creation, or a routing decision where the day state is not relevant.

If the answer affects planning state, current plan, today state, promises, sessions, or next work direction, the Default Day Template Pack is relevant by default.

## Steps

1. Give the normal work/update summary if something was changed:
   - what file/state was updated;
   - commit/hash if available;
   - what was not changed if relevant.
2. Show Default Dashboard Core.
3. Show the attached Mnemonic Emoji Table.
4. Read or reconstruct compact Planning State Output when state/action guidance is needed:
   - 🎯 Result Tracking;
   - 🧵📜>🧪 Active Promises;
   - 🧾 Finished Sessions.
5. Identify the current Result Tracking:
   - 🎯 Цель дня;
   - 🌅 Desired;
   - 🌑 Undesired.
6. Identify Active Promises as rows only when they actually exist:
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

## Output rule

Default output for normal planning mode:

1. Work/update summary.
2. Default Dashboard Core.
3. Mnemonic Emoji Table.
4. Compact Planning State Output.

Dashboard Core and Mnemonic Emoji Table travel together by default.

Do not treat Mnemonic Emoji Table as optional in planning mode.

For narrow technical answers, diffs, file checks, archive creation, or when the user explicitly asks for a short answer, AI may omit the dashboard pack.

Do not force the user to manually open state files unless manual review, edit, or diff inspection is actually needed.

Use `Examples/Midday Planning State Output Example.md` only as a formatting/reference example. Templates and workflows remain the source of truth.
