# Use Dashboard Workflow

Status: active workflow.

Purpose: explain how AI should use the compact Planning State Output together with the Default Dashboard Core and attached Mnemonic Emoji Table.

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

## Steps

1. Show Default Dashboard Core.
2. Show the attached Mnemonic Emoji Table.
3. Read or reconstruct compact Planning State Output when state/action guidance is needed:
   - 🎯 Result Tracking;
   - 🧵📜>🧪 Active Promises;
   - 🧾 Finished Sessions.
4. Identify the current Result Tracking:
   - 🎯 Цель дня;
   - 🌅 Desired;
   - 🌑 Undesired.
5. Identify Active Promises as rows:
   - 🧪 Сейчас чувствую / тянет;
   - 📐 Аналитически выведено;
   - 🧵📜 Пришить как истину;
   - 🌑 Не покупать;
   - 🏁 Отрезок.
6. Use `🏁 Отрезок` from Active Promises when a concrete action / short-distance move is needed.
7. Read progress from Finished Sessions, not from a separate Progress counters block.
8. Decide which dashboard column is most relevant now:
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
9. If the user is confused by `📊Скор`, explain:
   - D = useful work actually done;
   - F = focus / self-management;
   - K = relation to current course;
   - P = value left after the session;
   - Tempo supports D/F but is not a fifth score criterion;
   - Guard prevents fake progress: занятость≠D, процесс≠результат, интересно≠нужно;
   - Boost means short-distance execution / self-competition.

## Output rule

In normal planning/session-control answers, output:

1. Default Dashboard Core.
2. Mnemonic Emoji Table.
3. Compact Planning State Output when state/action guidance is needed:
   - 🎯 Result Tracking;
   - 🧵📜>🧪 Active Promises;
   - 🧾 Finished Sessions.

Dashboard Core and Mnemonic Emoji Table travel together by default.

Do not treat Mnemonic Emoji Table as optional in planning mode.

For narrow technical answers, diffs, file checks, or when the user explicitly asks for a short answer, AI may omit the dashboard pack.

Do not force the user to manually open state files unless manual review, edit, or diff inspection is actually needed.

Use `Examples/Midday Planning State Output Example.md` only as a formatting/reference example. Templates and workflows remain the source of truth.
