# AI Work Areas

Status: planning draft

## 1. Schedule keeper

AI keeps repetition schedules.

User tells AI:

```text
- what raw day note was processed;
- what processing/general-note date created a repeat unit;
- what area-day notes were created;
- what topic/question notes were created;
- what was repeated on a specific day;
- whether the repeat was successful, weak, partial, late, very late, or explicitly rescheduled.
```

AI updates or proposes updates for:

```text
- Repeat Chains.md;
- month repeat plans;
- next repeat dates;
- explicit stage / next-gap markers;
- focused repeat sessions when weak parts are found;
- area-day note repeat schedule fields.
```

Core responsibility:

```text
AI must create repeats only from existing processing/general-note repeat units.
AI must not invent repeat chains for calendar dates that did not produce notes.
Holes are valid.
```

Example input:

```text
Processed 2026-04-23 server today. Created Antiforgery and SQL Server Indexes topic notes with questions.
```

Expected AI action:

```text
Create/register 2026-04-23.server as a repeat unit/chain.
Schedule first normal repeat at processing date + 5 days.
Add explicit marker: (+5 -> +10) on the planned item.
```

Example negative case:

```text
No 2026-04-24 raw note existed, so no 2026-04-26 processing happened.
```

Expected AI action:

```text
Do not create a 2026-04-26 repeat unit.
Do not add a 2604 chain row just to make dates continuous.
```

## 2. Question creator

AI creates repeat questions from:

```text
- Excalidraw exports;
- topic notes;
- raw day notes;
- focused weak repeat sessions;
- user explanation of what is important.
```

Questions are not optional. They are one of the main repeat mechanisms.

Rule:

```text
Every topic note should have a related markdown question note.
Repeating a topic means answering questions, not only rereading.
```

AI should create questions that test:

```text
- understanding;
- explanation from memory;
- flows/processes;
- differences and comparisons;
- common mistakes;
- weak parts;
- section-specific knowledge when the topic note becomes large.
```

## 3. Note processor

AI helps process raw day notes into structured material.

Processing means:

```text
- read / inspect raw Excalidraw export;
- identify topics;
- create or update topic notes;
- create or update question notes;
- create area-day notes with links;
- avoid duplicating long fragments from topic notes;
- prepare repeat chain and schedule entries.
```

Processing session should not create pasted fragments in general/area notes.

## 4. Repeat assistant

AI helps run repetition sessions.

During repeat AI should:

```text
- open the area-day note;
- identify topic notes and question notes;
- ask questions;
- check answers;
- mark weak parts;
- create focused repeat session notes when needed;
- update next schedule using the repeat chain and explicit stage / next-gap marker.
```

## 5. Focused repeat assistant

When a weak part is found, AI should create a focused repeat session instead of pasting fragments into general notes.

Focused repeat session should link to:

```text
- source scheduled repeat;
- source area-day note;
- source topic note or section;
- relevant question note section.
```

It should include:

```text
- why it exists;
- repeat focus;
- questions;
- next due date;
- status.
```