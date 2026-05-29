# Batch 21: Date-based day files and support facts

PUT-style package.

## Purpose

Move active/completed day state from `Today State.md` into date-based day files:

`Days/YYYY/YYYY-MM-DD.md`

Add support-facts collection during the day and next-morning/day-close Support Score review.

## Core agreements

- AI must not infer current day automatically.
- User provides the date or establishes an active conversation day date.
- Day files are created from `Templates/Day File Template.md`.
- Work Score stays separate from Support Score.
- Work Score closes 35 / 70 baselines.
- Support Score never closes 35 / 70.
- During the day, collect support facts only.
- Support Score is calculated at day close / next morning.
- Support Score max is 10.
- Each support category max is 2.
- Sleep is special: max 2, min -5.
- Support facts table has no `Tags` column; emoji is part of `Type`.

## Commit message

`Add date-based day files and support scoring`
