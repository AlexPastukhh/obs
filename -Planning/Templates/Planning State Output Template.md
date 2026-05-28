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

## 🧵📜>🧪 Active Promises

| # | 🧪 Сейчас чувствую / тянет | 📐 Аналитически выведено | 🧵📜 Пришить как истину | 🌑 Не покупать | 🏁 Отрезок |
|---|---|---|---|---|---|
| 1 | `<current feeling / pull / lack of pull>` | `<analytical prediction>` | `<what should replace current feeling as source of truth>` | `<false promise / drift lie>` | `<short-distance segment / concrete short action>` |

## 🧾 Finished Sessions

| # | Session | D/F/K/P | Points | Progress Signal | Result |
|---|---|---|---:|---|---|
| 1 | `<finished session>` | `<D# F# K# P#>` | `<points>` | `<progress signal>` | `<what changed>` |

## Rule

This template owns compact planning state output.

Default Planning State Output contains only:

1. 🎯 Result Tracking;
2. 🧵📜>🧪 Active Promises;
3. 🧾 Finished Sessions.

Result Tracking contains only:

- 🎯 Цель дня;
- 🌅 Desired;
- 🌑 Undesired.

Desired means the current meaningful desired goal/result the user wants to get now.

Concrete next/short action is not a separate Planning State Output block and not a Result Tracking field.

Concrete action belongs inside Active Promises as `🏁 Отрезок`.

Progress Signal is not a Result Tracking field.

Progress is represented by Finished Sessions, not by a separate Progress counters block.

Active promises are represented as rows in the Active Promises table.

Global/background context is not shown as a default block. Use it only when directly relevant.

Flags may exist in `Session Log.md`, but they are not shown in default Planning State Output.

Do not force the user to memorize this template. AI maintains and fills it.
