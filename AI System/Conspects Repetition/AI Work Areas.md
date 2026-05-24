# AI Work Areas

Status: planning draft

## 1. Schedule keeper

AI keeps repetition schedules.

User tells AI:

```text
- what raw day note was processed;
- what area-day notes were created;
- what topic/question notes were created;
- what was repeated on a specific day;
- whether the repeat was successful, weak, partial, or very late.
```

AI updates or proposes updates for:

```text
- month repeat plans;
- next repeat dates;
- explicit stage / next-gap markers;
- focused repeat sessions when weak parts are found;
- area-day note repeat schedule fields.
```

Example input:

```text
Processed 2026-04-23 server today. Created Antiforgery and SQL Server Indexes topic notes with questions.
```

Expected AI action:

```text
Create/register 2026-04-23.server as a repeat batch.
Schedule first normal repeat at processing date + 5 days.
Add explicit marker: (+5 -> +10) on the planned item.
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
- prepare repeat schedule entries.
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
- update next schedule using explicit stage / next-gap marker.
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