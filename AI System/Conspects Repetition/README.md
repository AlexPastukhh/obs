# Conspects Repetition System

Status: planning draft

This folder describes the planned AI-assisted system for managing conspects, repetition schedules, questions, and note processing.

The current goal is not to build a full AI planning cockpit. The current goal is narrower:

1. keep repetition schedules;
2. process raw study-day notes into structured notes;
3. create questions for topic notes;
4. repeat conspects using questions;
5. track weak parts without duplicating note fragments.

## Core idea

The system separates capture, knowledge, questions, repeat chains, monthly schedules, and weak-repeat records.

```text
Raw day note
  -> processing session
  -> topic notes
  -> question notes
  -> area-day notes
  -> repeat chain
  -> month repeat plan
  -> scheduled repeats
  -> focused repeat sessions when weak parts are found
```

## Main entities

```text
Raw Day Note
= original study capture, often a large Excalidraw drawing.

Processing Session
= usually about 2 days after the raw study day; repeat the raw note, understand it again, create topic notes, question notes, and area-day notes.

Repeat Unit
= material created by a processing/general-note date. If no processing/general note exists for a date, no repeat unit exists for that date.

Repeat Chain
= theoretical path of a repeat unit through +5, +10, +20, and +40. It is the orientation/source-of-truth layer for schedule generation and checking.

Topic Note
= source of truth for knowledge.

Question Note
= markdown question bank for a topic note; questions are a main repeat method, not only a weak-part tool.

Area-Day Note
= clean markdown index for one processing/general-note day and one area, for example 2026-04-23.server.md.

Month Repeat Plan
= markdown daily queue that says what to process or repeat on each date. It is generated from repeat chains plus processing/focused-repeat tasks.

Focused Repeat Session
= separate note for a weak part found during scheduled repeat that should be repeated sooner or separately.
```

## Source-of-truth split

```text
Raw day note        = original capture
Topic note          = knowledge source
Question note       = repeat/question source
Area-day note       = clean index of day+area material
Repeat Chains.md    = theoretical repeat dates / orientation
Month repeat plan   = daily queue: what to process/repeat on each date
Focused session     = weak part / special repeat event
```

## Important schedule rule

```text
We do not generate repeats from calendar dates.
We generate repeats from existing processing/general-note units.
```

Example:

```text
2026-04-24 raw note exists
-> 2026-04-26 processing/general note exists
-> 2026-04-26 repeat unit exists
-> 2604 chain exists
```

But:

```text
2026-04-24 raw note does not exist
-> no 2026-04-26 processing from it
-> no 2026-04-26 repeat unit
-> no 2604 chain
```

Holes are valid. Do not invent missing repeat units just to make dates continuous.

## Folder projection

```text
AI System/Conspects Repetition/
  README.md
  AI Work Areas.md
  Schedule Rules.md
  Question Creation Principles.md
  Export Format Guide.md
  Templates/
    Area Day Note Template.md
    Month Repeat Plan Template.md
    Question Note Template.md
    Focused Repeat Session Template.md
    Repeat Chains Template.md
```

Later, the real working folders may be created separately, for example:

```text
03_Conspects/
  Raw Day Notes/
  Area Days/
  Topics/
  Repetition/
    Repeat Chains.md
    Months/
    Repeat Sessions/
```

This planning folder defines the rules before migrating existing notes.