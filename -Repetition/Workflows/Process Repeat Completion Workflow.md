# Process Repeat Completion Workflow

Status: active workflow.

Use when the user says a repeat was completed, done late, partially done, weak, very late, or explicitly rescheduled.

## Goal

Update schedule/repeat state after a repeat completion without silently rewriting repeat chains.

## Required Reads

```text
-Repetition/Repetition Schedule Principles.md
-Repetition/Chains/
-Repetition/Schedules/
-Repetition/Recovery/ if completion is late, very late, or affected by a recovery decision
```

## Inputs

```text
- repeat unit / schedule item;
- actual completion date;
- planned date if known;
- current stage marker if known;
- user statement: done / weak / partial / late / very late / rescheduled;
- optional recovery instruction.
```

## Algorithm

```text
1. Identify the repeat item.
   - Find matching schedule entry.
   - Find matching chain row.
   - If uncertain, mark as unclear and ask instead of guessing.

2. Confirm planned date and stage.
   - Use schedule item marker if present.
   - Use chain row if schedule marker is missing.
   - If stage is unclear, preserve `stage unknown`.

3. Mark the schedule item done.
   - Record actual completion date.
   - Record planned date when completion was late or recovered.
   - Preserve status: done / late done / weak / partial / recovery done.

4. Decide next event.
   - Use next stage from chain if clear.
   - Do not mutate theoretical chain just because actual completion was late.
   - If user explicitly reschedules, update chain/schedule according to that instruction and record why.

5. Handle weak or partial repeat.
   - Add weak-point note/question if needed.
   - Create or propose focused repeat session if the weak part needs earlier/special repeat.

6. Report touched files and unclear items.
```

## Late Repeat Rule

If a repeat is slightly late:

```md
- [x] REPEAT [[2026-03-20.server]] (+20 -> +40)
  planned: 2026-04-09
  done: 2026-04-11
  status: late done
```

Do not silently rewrite theoretical chain.

## Very Late Repeat Rule

If a repeat is very late, treat it as a schedule conflict / recovery question.

Possible actions:

```text
- keep theoretical chain but record late completion;
- schedule a recovery repeat;
- create focused repeat session;
- explicitly reschedule chain if user asks;
- apply Long Break Stage Rollback Workflow if user requests recovery rollback.
```

## Output Shape

```text
Completed repeat:
- ...

Planned date:
- ...

Done date:
- ...

Status:
- done / late done / weak / partial / recovery done

Chain update:
- none / next event added / explicitly rescheduled

Schedule update:
- ...

Focused repeat / weak questions:
- none / proposed / created

Touched files:
- ...

Unclear / needs user check:
- ...
```

## Do Not

```text
- Do not silently reschedule.
- Do not delete uncertain legacy items.
- Do not create a new repeat unit for a completion event.
- Do not treat recovery decisions as default schedule rules.
```
