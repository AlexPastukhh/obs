# Planning State Output Template

Status: active template.

Purpose: compact state/output template for planning AI. This is not the Default Dashboard mnemonic core.

AI uses this template to show only the maintained planning state that matters for action: result tracking, point-6 active score patterns, active promises, and finished sessions.

Emoji notation agreements are owned by `Emoji Notation Map.md`.

## 🎯 Result Tracking

| Поле | Значение |
|---|---|
| 🎯 Цель дня | `<day goal / broad daily target>` |
| 🌅 Desired | `<current meaningful desired goal/result the user wants to get now>` |
| 🌑 Undesired | `<undesired state / bad outcome the user refuses>` |
| 🗺️ Ближайшие глобальные цели | `<3–5 nearest/relevant global goals from Current Plan State.md, then ... if more exist>` |

If a field is missing, do not invent it.

Use:

| Поле | Значение |
|---|---|
| 🎯 Цель дня | ⚠️ не задана — нужно выбрать цель дня |
| 🌅 Desired | ⚠️ не задан — нужно определить текущую значимую желаемую цель |
| 🌑 Undesired | ⚠️ не задан — нужно определить реальную плохую цену / слив |
| 🗺️ Ближайшие глобальные цели | ⚠️ не подтянуты — нужно прочитать / обновить Current Plan State.md |

Use `<br>` line breaks inside table cells when values contain multiple items.

For `🎯 Цель дня`, `🌅 Desired`, and `🌑 Undesired`, do not use markdown bullets like `-`.

Write each logical phrase on a new line via `<br>`.

Each new logical line should start with a capital letter.

This capitalization marks where a new line/thought starts without using bullets.

Continuation inside the same line may stay lowercase if it is grammatically part of the same phrase.

For `🗺️ Ближайшие глобальные цели`, numbered lines are allowed and preferred for the first 3–5 goals, then `...` when more goals exist.

Each numbered global-goal line should start with a capital letter after the number.

Do not collapse day goal / Desired / Undesired / global goals into one long sentence.

Do not turn day goal / Desired / Undesired into markdown bullet lists inside table cells.

Example formatting:

| Поле | Значение |
|---|---|
| 🎯 Цель дня | Закончить систему документирования<br>Начать работать с planning-системой<br>Разобраться, как снова повторять и учиться |
| 🌅 Desired | Документирование закончено<br>Всё максимально просто и ясно<br>Есть понимание движения дальше<br>Веду планирование лучше, чем когда-либо |
| 🌑 Undesired | Рассеянный фокус<br>Нет реальной пользы от действий |
| 🗺️ Ближайшие глобальные цели | 1. Запустить planning/doc/AI-work систему<br>2. Снова начать повторять и учить теорию<br>3. Вспомнить важное забытое<br>4. Доделать диплом<br>... |

## 🏁📊 Point 6 — Short D/F/K/P Race

| Влияет на | Active score patterns |
|---|---|
| ✅D | 🎯📈≠🎭🔁 Result Tracking over process<br>🧩🪜⚠️➡️🧲⚡ Complex multi-level problem → easy stimulation (Frequent)<br>🚂🛤️⚠️🎯 Automatic rails but Result forgotten (Frequent) |
| ⚡F | 🏁🥊👤↔️👤⏱️ Short-distance self-competition (also D/K/P + future inertia)<br>⏱️🚂🛤️➡️🎯 Session frame / visible target<br>🧲⚡🧪➡️🎯 Targeted stimuli / chemistry only<br>🧩🪜⚠️➡️🧲⚡ Complex multi-level problem → easy stimulation (Frequent) |
| 🛤️K | 🛤️🌅➡️🎯 Course / Desired connection<br>🧩🪜⚠️➡️🧲⚡ Complex multi-level problem → easy stimulation (Frequent) |
| 💎P | 👁️⏳➡️💎 Value left after attention ends<br>🚂🛤️⚠️🎯 Automatic rails but Result forgotten (Frequent) |
| 🔎 Full patterns | `/patterns` |

Rules:

- Show only active pattern names in this block.
- Do not show detailed `adds score` / `subtracts score` text in default daily output.
- Fundamental score patterns are always active.
- Situational patterns marked `Frequency: frequent` are active while frequent.
- Non-frequent Situational patterns are not shown by default.
- Frequent Situational patterns are shown inside the concrete D/F/K/P rows they affect, not as a separate row.
- Full pattern templates are shown only by `/patterns` or `/pattern <name>`.
- Pattern names and meanings are owned by `Workflows/Real Reward Pattern Playbook.md`.

## 🧵📜>🧪 Active Promises

When active promises exist:

| # | 🧪 Сейчас чувствую / тянет | 📐 Аналитически выведено | 🧵📜 Пришить как истину | 🌑 Не покупать | 🏁 Отрезок |
|---|---|---|---|---|---|
| 1 | `<current feeling / pull / lack of pull>` | `<analytical prediction>` | `<what should replace current feeling as source of truth>` | `<false promise / drift lie>` | `<short-distance segment / concrete short action>` |

If no active promises exist, do not invent rows.

Use:

Нет активных promises.

⚠️ Promise не создаётся автоматически. Сначала нужно определить цель / Desired / текущее ощущение / аналитическое предсказание.

## 🧾 Finished Sessions

When finished sessions exist:

| # | Session | D/F/K/P | Points | Progress Signal | Result |
|---|---|---|---:|---|---|
| 1 | `<finished session>` | `<D# F# K# P#>` | `<points>` | `<progress signal>` | `<what changed>` |

If no finished sessions exist, use a header-only table or `none yet`; do not fabricate sessions.

## Rule

This template owns compact planning state output.

Default Planning State Output contains only:

1. 🎯 Result Tracking;
2. 🏁📊 Point 6 — Short D/F/K/P Race;
3. 🧵📜>🧪 Active Promises;
4. 🧾 Finished Sessions.

Result Tracking contains only:

- 🎯 Цель дня;
- 🌅 Desired;
- 🌑 Undesired;
- 🗺️ Ближайшие глобальные цели.

Desired means the current meaningful desired goal/result the user wants to get now.

Global goals are not a separate default block.

Global goals live inside 🎯 Result Tracking as a compact snapshot.

Use 3–5 nearest/relevant global goals from `Current Plan State.md`, preferably numbered, then `...` when more goals exist.

Point 6 is a compact active score-check layer, not the full workflow.

Point 6 shows active pattern names grouped under D/F/K/P.

Point 6 does not show detailed `adds score` / `subtracts score` text by default.

Concrete next/short action is not a separate Planning State Output block and not a Result Tracking field.

Concrete action belongs inside Active Promises as `🏁 Отрезок`.

Progress Signal is not a Result Tracking field.

Progress is represented by Finished Sessions, not by a separate Progress counters block.

Active promises are represented as rows in the Active Promises table only when they actually exist.

Global/background context is not shown as a separate default block. A compact global-goals snapshot may be shown inside 🎯 Result Tracking.

Flags may exist in `Session Log.md`, but they are not shown in default Planning State Output.

Do not force the user to memorize this template. AI maintains and fills it.

## No-fabrication rule

AI must not convert lack of input into invented planning content.

Missing target is not a target.

Missing Desired is not a Desired.

Missing promise is not a promise.

At start-day, if input is missing, surface the missing fields.

The user should define them as part of starting the day.
