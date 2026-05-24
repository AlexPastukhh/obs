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

The system separates capture, knowledge, questions, schedule, and weak-repeat records.

```text
Raw day note
  -> processing session
  -> topic notes
  -> question notes
  -> area-day notes
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

Topic Note
= source of truth for knowledge.

Question Note
= markdown question bank for a topic note; questions are a main repeat method, not only a weak-part tool.

Area-Day Note
= clean markdown index for one raw study day and one area, for example 2026-04-23.server.md.

Month Repeat Plan
= markdown calendar/queue that says what to repeat and when.

Focused Repeat Session
= separate note for a weak part found during scheduled repeat that should be repeated sooner or separately.
```

## Source-of-truth split

```text
Raw day note        = original capture
Topic note          = knowledge source
Question note       = repeat/question source
Area-day note       = clean index of day+area material
Month repeat plan   = what to repeat and when
Focused session     = weak part / special repeat event
```

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
```

Later, the real working folders may be created separately, for example:

```text
03_Conspects/
  Raw Day Notes/
  Area Days/
  Topics/
  Repetition/
```

This planning folder defines the rules before migrating existing notes.