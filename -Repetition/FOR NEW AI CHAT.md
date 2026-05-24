# Repetition System — For New AI Chat

Status: active AI handoff.

Read this file first when helping with the repetition system.

## 1. Where to work

Active working folder:

```text
-Repetition/
```

Old source/archive folder:

```text
Canvases/-repeat notes
```

Do not modify `Canvases/-repeat notes` unless the user explicitly asks. That folder contains old raw/source repeat data.

## 2. Read order

```text
1. -Repetition/START HERE.md
2. -Repetition/FOR NEW AI CHAT.md
3. -Repetition/Recovery/2026-05 break - active chain shift.md
4. -Repetition/Chains/Repeat Chains 2026-02..2026-04 active shifted.md
5. Current month file in -Repetition/Schedules/
6. AI System/Conspects Repetition/Schedule Rules.md when rules are needed
```

## 3. Core model

Repeat chains are the source of truth for what should be repeated.

Monthly schedules are daily queues generated from repeat chains.

```text
Repeat chain row = one repeat unit and all its planned repeat dates.
Monthly schedule = what to process/repeat on each exact date.
```

Do not generate repeat units from calendar dates. Generate repeat units only when processing/general-note material actually exists.

Holes are valid.

## 4. Critical rule: processing creates a new repeat unit

When the user says something like:

```text
I processed 2026-06-05 server today.
I processed 26.04 raw today.
Today I processed client/server notes.
Запроцессил сегодня 26.04 raw.
```

it means:

```text
Create/register a new repeat unit in the repeat chain.
```

The repeat unit date is the processing date, not the old raw-study date.

Default processing date:

```text
Use today's date unless the user explicitly gives another processing date.
```

Examples:

```text
User says on 2026-06-05: "processed 26.04 raw today"
=> processing date = 2026-06-05
=> repeat unit = 2026-06-05 processing of 2026-04-26 raw

User says: "processed 2026-06-03 server"
=> processing date = 2026-06-03
=> repeat unit = 2026-06-03.server

User says: "processed server today"
=> processing date = today's date
=> repeat unit = today's-date.server
```

If the user mentions both a raw date and a processing date, use the processing date for the repeat unit and keep the raw date as context in the unit name or notes.

## 5. What AI must update after processing

After a new repeat unit is created, AI should update:

```text
1. the relevant repeat chain file/section;
2. the monthly schedule entries for every generated repeat date;
3. optionally a recovery/note-processing note if context is important.
```

Current ladder:

```text
processing -> +5 -> +10 -> +20 -> +40 -> +80 -> review / decide next
```

For a new unit processed on date `D`, add:

```text
D          = processing date / source of unit
D + 5 days = +5 repeat
D + 15 days = +10 repeat
D + 35 days = +20 repeat
D + 75 days = +40 repeat
D + 155 days = +80 repeat / review
```

Use real calendar dates. Do not invent impossible dates.

## 6. Example update

If processing date is `2026-06-05` and unit is `2026-06-05.server`, add a chain row:

```md
| `2026-06-05.server` | 2026-06-05 | 2026-06-10 | 2026-06-20 | 2026-07-10 | 2026-08-19 | 2026-11-07 | new |
```

Then add schedule entries:

```md
## 2026-06-10
- [ ] REPEAT `2026-06-05.server` (+5 -> +10)

## 2026-06-20
- [ ] REPEAT `2026-06-05.server` (+10 -> +20)

## 2026-07-10
- [ ] REPEAT `2026-06-05.server` (+20 -> +40)

## 2026-08-19
- [ ] REPEAT `2026-06-05.server` (+40 -> +80)

## 2026-11-07
- [ ] REPEAT `2026-06-05.server` (+80 -> review)
```

## 7. If the schedule month file does not exist

Create it under:

```text
-Repetition/Schedules/YYYY-MM.md
```

Use the same pattern as existing schedule files:

```md
# Repetition Schedule — YYYY-MM

Status: active draft.

Source:
- [[../Chains/Repeat Chains 2026-02..2026-04 active shifted]]

Purpose: daily queue only — what to process or repeat on each date.
```

## 8. If a chain file needs a new month section

Add the new repeat unit to the active chain file or create a new chain file when the current chain file becomes too large.

Preferred next chain file pattern:

```text
-Repetition/Chains/Repeat Chains YYYY-MM active.md
```

Keep old shifted reconstruction chains separate from new normal chains if that becomes clearer.

## 9. Do not silently reschedule

If the user says a repeat was done late, record planned and actual dates.

Do not silently change a theoretical/active chain unless the user explicitly says to reschedule or apply a recovery rule.

## 10. User communication rule

The user may answer only one part of a message. If there was an important unanswered question or warning, repeat it briefly in the next answer.
