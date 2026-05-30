# Repetition Schedule Principles

Status: active principles.

Purpose: define stable schedule/repeat-chain invariants for the `-Repetition/` system.

This file is a **Principles** file. It stores invariants and source-of-truth boundaries, not step-by-step procedures.

Use workflows for action steps:

```text
-Repetition/Workflows/Process New Repeat Unit Workflow.md
-Repetition/Workflows/Process Repeat Completion Workflow.md
-Repetition/Workflows/Reconstruct Historical Repeat Schedule Workflow.md
-Repetition/Workflows/Long Break Stage Rollback Workflow.md
```

## 1. Core Rule

```text
Do not generate repeats from calendar dates.
Generate repeats only from existing processing/general-note repeat units.
```

A date can exist on the calendar without producing a repeat unit.

A repeat unit exists only when material was actually processed or created as a general/repeatable note.

## 2. Repeat Unit Date

In the current `-Repetition/` system:

```text
raw/source date = context;
processing date = repeat unit date.
```

Example:

```text
2026-04-24 raw note exists
-> processed on 2026-04-26
-> 2026-04-26 is the repeat unit date
-> chain row may be created for the 2026-04-26 processing unit
```

But:

```text
2026-04-24 raw note does not exist
-> no 2026-04-26 processing from it
-> no 2026-04-26 repeat unit
-> no chain row just to fill the date
```

## 3. Holes Are Valid

If a processing/general-note date does not exist, the chain has a valid hole.

Example:

```text
1904 exists
2004 exists
2104 missing
2204 exists
```

This does not mean `2104` is missing and should be invented.

It means:

```text
No processing/general note created a 2104 repeat unit.
Therefore no 2104 chain row should exist.
```

Do not fill missing calendar dates just to make chains continuous.

## 4. Source-of-Truth Split

The repetition system has two schedule layers:

```text
Repeat Chains
  = source of truth / orientation for existing repeat units and planned repeat dates.

Monthly Schedules
  = derived daily queues generated from chains, processing backlog, focused repeats and explicit recovery decisions.
```

A monthly schedule answers only:

```text
What do I process or repeat on this date?
```

A monthly schedule should not contain:

```text
- schedule theory;
- copied topic fragments;
- long topic-note content;
- duplicate source-of-truth rules.
```

Detailed learning material belongs in:

```text
- repeat material;
- area-day notes;
- topic notes;
- question notes;
- focused repeat session notes.
```

## 5. Repeat Chain Definition

A repeat chain is the theoretical path of one repeat unit.

Current active local ladder:

```text
processing
  -> +5
  -> +10
  -> +20
  -> +40
  -> +80
  -> review / decide next
```

For a new unit processed on date `D`, active local workflow currently uses:

```text
D            = processing date / source of unit
D + 5 days   = +5 repeat
D + 15 days  = +10 repeat
D + 35 days  = +20 repeat
D + 75 days  = +40 repeat
D + 155 days = +80 repeat / review
```

The chain helps us:

```text
- check whether a repeat unit disappeared from schedules;
- know what next repeat should be;
- preserve orientation when old schedules are messy;
- reconstruct schedules after breaks or legacy imports.
```

## 6. Theoretical Chains Are Default

For each repeat unit that exists, store the theoretical chain.

Use theoretical chains by default.

Change a chain only when:

```text
- the user explicitly says to reschedule;
- a recovery note defines an explicit non-default decision;
- there is clear evidence the current chain row is wrong and the user approves correction.
```

Do not silently rewrite theoretical chains because a repeat was done late.

## 7. Stage Markers

Schedule items should show current stage and next gap.

Preferred compact examples:

```md
- [ ] REPEAT [[2026-04-23.server]] (+5 -> +10)
- [ ] REPEAT `0104 added asp react` (+20 -> +40)
```

If the stage is unclear in legacy notes:

```md
- [ ] REPEAT `react 2` (stage unknown)
```

Unknown stage is better than invented precision.

## 8. Exact Gaps vs Chain Preservation

Exact gaps are the normal rule.

But chain preservation can win when old schedules are messy.

Example:

```text
Day 14 and Day 15 were accidentally repeated in swapped order.
Pure date math would make Day 15 appear before Day 14 next time.
```

In that case, preserve orientation:

```text
14 -> 15 -> 16
```

not:

```text
15 -> 14 -> 16
```

This does not mean dates are ignored. It means exact dates are default, but chain order can be preserved when swaps/reschedules would make the schedule confusing.

## 9. Late And Very Late Repeats

If a repeat is slightly late, record both planned and actual completion date.

Do not silently mutate the chain.

If a repeat is very late, treat it as a schedule conflict/recovery question.

Possible explicit outcomes:

```text
- keep the theoretical chain but record late completion;
- schedule a recovery repeat;
- create a focused repeat session;
- explicitly reschedule the chain if user asks;
- apply a documented recovery workflow/rule.
```

Use:

```text
-Repetition/Workflows/Process Repeat Completion Workflow.md
-Repetition/Workflows/Long Break Stage Rollback Workflow.md
```

## 10. Old Drawing / Legacy Reconstruction

Old Excalidraw schedules can be messy but valid.

If an item appears on a date in an old schedule, treat it as a valid scheduled event unless there is evidence it is wrong.

Strange date math may mean:

```text
- manual reschedule;
- old naming style;
- legacy repeat unit;
- shifted chain event;
- old recovery decision.
```

If uncertain, keep the item with `review` or `stage unknown` rather than deleting it.

Historical reconstruction is a recovery mode, not default scheduling behavior.

Use:

```text
-Repetition/Workflows/Reconstruct Historical Repeat Schedule Workflow.md
```

## 11. Do Not

```text
- Do not create repeat units from calendar holes.
- Do not use raw-study date as repeat unit date when processing date is different.
- Do not copy topic-note content into schedules.
- Do not silently change theoretical chains after late completion.
- Do not treat recovery decisions as default schedule rules.
- Do not delete uncertain legacy items just because they do not match clean date math.
```
