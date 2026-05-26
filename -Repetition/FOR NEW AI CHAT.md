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

For simple repetition work:

```text
1. -Repetition/START HERE.md
2. -Repetition/FOR NEW AI CHAT.md
3. -Repetition/USE CASE MAP.md
4. Relevant workflow/template/source files.
```

For documentation structure / new file / where-to-put-info work:

```text
1. -Repetition/START HERE.md
2. -Repetition/USE CASE MAP.md
3. -Repetition/RESPONSIBILITY MAP.md
4. -Repetition/Documentation Principles.md
5. -Repetition/Workflows/Add Or Route New Information Workflow.md
```

For active schedule/repeat-chain work:

```text
1. -Repetition/Recovery/2026-05 break - active chain shift.md
2. -Repetition/Chains/Repeat Chains 2026-02..2026-04 active shifted.md
3. Current month file in -Repetition/Schedules/
4. AI System/Conspects Repetition/Schedule Rules.md when rules are needed
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

## 6. New information / new file rule

If the user gives new information and asks where/how to document it:

```text
1. Do not guess.
2. Read USE CASE MAP.
3. Read RESPONSIBILITY MAP.
4. Read Documentation Principles.
5. Use Add Or Route New Information Workflow.
6. Prefer existing owner file when possible.
7. Create a new file only if it reduces confusion or defines a new durable responsibility.
8. If a new file/category is created, update RESPONSIBILITY MAP.
9. If navigation changes, update START HERE.
10. If command routing changes, update USE CASE MAP.
```

## 7. Do not silently reschedule

If the user says a repeat was done late, record planned and actual dates.

Do not silently change a theoretical/active chain unless the user explicitly says to reschedule or apply a recovery rule.

## 8. User communication rule

The user may answer only one part of a message. If there was an important unanswered question or warning, repeat it briefly in the next answer.
