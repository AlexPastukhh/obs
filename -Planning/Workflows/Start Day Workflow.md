# Start Day Workflow

Status: active workflow.

## Uses

- `Current Plan State.md`
- `Today State.md`
- `Session Log.md`
- `Work Rails Principles.md`
- `Templates/Today State Template.md`
- `Templates/Planning State Output Template.md`
- `Templates/Default Dashboard Template.md`
- `Workflows/Use Dashboard Workflow.md`
- `Examples/Start Day Missing Input Example.md`
- `Examples/Midday Planning State Output Example.md`

## Missing input rule

When starting a day, AI must not invent missing planning content.

Do not invent:

- 🎯 Цель дня;
- 🌅 Desired;
- 🌑 Undesired;
- Active Promises;
- external target;
- measurable output.

Missing target is not a target.

Missing Desired is not a Desired.

Missing promise is not a promise.

If the user did not provide enough information, mark the field as missing and surface what must be defined.

Use:

`⚠️ не задана — нужно выбрать / определить ...`

A missing field is a valid start-day state.

The purpose of start-day is not to fabricate a plan.

The purpose is to surface the current start state and what must be decided.

## Active Promises creation rule

Do not create Active Promises by default.

Create or refresh Active Promises only when enough current material exists:

- current target or goal;
- 🌅 Desired;
- 🌑 Undesired;
- what the user feels / where they are pulled;
- analytical prediction;
- short-distance segment.

If this material is missing, output:

`Нет активных promises.`

Then add:

`⚠️ Promise не создаётся автоматически. Сначала нужно определить цель / Desired / текущее ощущение / аналитическое предсказание.`

Do not create an empty/unclear promise row.

Do not create a generic promise such as “start external work” unless the user actually provided that target/context.

## Steps

1. Read current plan, today state, and recent session context.
2. Identify which start-day fields were actually provided by the user:
   - 🎯 Цель дня;
   - 🌅 Desired;
   - 🌑 Undesired;
   - current target;
   - current pull/chemistry;
   - active promise material.
3. Set compact Result Tracking:
   - use the user's actual values when provided;
   - use missing markers when values are not provided;
   - do not infer or fabricate defaults.
4. Set Active Promises:
   - if enough current material exists, use `Workflows/Build Truth Promise Workflow.md`;
   - if not enough material exists, write `Нет активных promises.` and list the missing requirement;
   - put the concrete next/short-distance move in `🏁 Отрезок` only when an actual promise exists.
5. Initialize Finished Sessions as empty unless there are already finished sessions for the day.
6. Update `Today State.md` using `Templates/Today State Template.md`.
7. Render Default Dashboard Core using `Templates/Default Dashboard Template.md`.
8. Render Mnemonic Emoji Table attached to `Templates/Default Dashboard Template.md`.
9. Render compact Planning State Output using `Templates/Planning State Output Template.md`.

## Required response after starting/updating day

After starting or updating the day, AI must return:

1. Default Dashboard Core:
   - compact Rails table `🎯Рез -> 🧵📜>🧪Обещ -> 📊Скор -> 🧲ЗИ`.

2. Mnemonic Emoji Table:
   - emoji table attached to the dashboard.

3. Compact Planning State Output:
   - 🎯 Result Tracking;
   - 🧵📜>🧪 Active Promises;
   - 🧾 Finished Sessions.

If start-day input is missing, the compact Planning State Output must clearly show missing fields instead of invented values.

Do not respond with only “Updated Today State.md”.

The user should immediately see the dashboard, current result tracking, active promises or lack of promises, and finished sessions.

## Output

- updated `Today State.md`;
- Default Dashboard Core;
- Mnemonic Emoji Table;
- compact Planning State Output;
- missing input markers when needed.
