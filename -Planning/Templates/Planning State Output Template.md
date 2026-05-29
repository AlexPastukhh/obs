# Planning State Output Template

Status: active template.

Purpose: compact state/output template for planning AI. This is not the Default Dashboard mnemonic core.

AI uses this template to show only the maintained planning state that matters for action: result tracking, active promises, and finished sessions.

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

For `🗺️ Ближайшие глобальные цели`, numbered lines are allowed and preferred for the first 3–5 goals, then `...` when more goals exist.

Do not collapse day goal / Desired / Undesired / global goals into one long sentence.

Do not turn day goal / Desired / Undesired into markdown bullet lists inside table cells.

Example formatting:

| Поле | Значение |
|---|---|
| 🎯 Цель дня | закончить систему документирования<br>начать работать с planning-системой<br>разобраться, как снова повторять и учиться |
| 🌅 Desired | документирование закончено<br>всё максимально просто и ясно<br>есть понимание движения дальше<br>веду планирование лучше, чем когда-либо |
| 🌑 Undesired | рассеянный фокус<br>нет реальной пользы от действий |
| 🗺️ Ближайшие глобальные цели | 1. запустить planning/doc/AI-work систему<br>2. снова начать повторять и учить теорию<br>3. вспомнить важное забытое<br>4. доделать диплом<br>... |

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
2. 🧵📜>🧪 Active Promises;
3. 🧾 Finished Sessions.

Result Tracking contains only:

- 🎯 Цель дня;
- 🌅 Desired;
- 🌑 Undesired;
- 🗺️ Ближайшие глобальные цели.

Desired means the current meaningful desired goal/result the user wants to get now.

Global goals are not a separate default block.

Global goals live inside 🎯 Result Tracking as a compact snapshot.

Use 3–5 nearest/relevant global goals from `Current Plan State.md`, preferably numbered, then `...` when more goals exist.

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
