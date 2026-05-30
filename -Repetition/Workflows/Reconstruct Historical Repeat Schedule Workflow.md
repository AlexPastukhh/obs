# Reconstruct Historical Repeat Schedule Workflow

Status: active workflow.

Use when reconstructing historical repeat chains/schedules from old drawings, old schedules, or messy legacy material.

This workflow is for recovery/reconstruction mode, not normal daily scheduling.

## Goal

Build or verify chains and monthly queues from historical source material without inventing repeat units or deleting uncertain legacy items.

## Required Reads

```text
-Repetition/Repetition Schedule Principles.md
-Repetition/Recovery/
-Repetition/Chains/
-Repetition/Schedules/
old source material only if user explicitly provides or asks to use it
```

## Applicability

Use this workflow when:

```text
- old Excalidraw schedules need to be turned into chain/schedule files;
- historical repeat units may be missing from current chain files;
- the user asks to rebuild February/March/April/etc. schedules;
- a recovery note says to reconstruct from an imagined historical state.
```

Do not use this workflow for ordinary new repeat unit creation.

## Core Assumption Pattern

Historical reconstruction may use an explicit imagined state, for example:

```text
Imagine today is 2026-04-28.
Everything before 2026-04-28 was repeated/processed as planned.
```

Such assumptions must be visible in the output/recovery note.

## Algorithm

```text
1. Identify the reconstruction scope.
   - date range;
   - source drawings/schedules;
   - imagined current date if any;
   - known last processing date;
   - active recovery notes.

2. Identify which processing/general-note dates actually created repeat units.

3. Create chain rows only for real repeat units.

4. Do not create rows for holes.

5. Use active local theoretical ladder:
   - +5;
   - +10;
   - +20;
   - +40;
   - +80 / review when active local workflow requires it.

6. Preserve old labels for legacy units.

7. Generate monthly daily queues from chain rows.

8. Add processing backlog for unprocessed raw notes.

9. If old drawing conflicts with theory, treat it as possible reschedule.
   - Do not mutate theoretical chain unless the user confirms.
   - Keep uncertain items with `review` or `stage unknown`.

10. Report assumptions, touched files, uncertain items and decisions requiring user confirmation.
```

## Unprocessed Raw Notes

Unprocessed raw notes are not repeat chains yet.

Example:

```md
- [ ] PROCESS_RAW [[2026-04-26 raw]]
- [ ] PROCESS_RAW [[2026-04-27 raw]]
- [ ] PROCESS_RAW [[2026-04-28 raw]]
```

They become repeat units only after processing.

## Output Shape

```text
Reconstruction scope:
- ...

Assumptions:
- ...

Repeat units confirmed:
- ...

Holes preserved:
- ...

Chain rows created/updated:
- ...

Schedules generated/updated:
- ...

Backlog added:
- ...

Unclear / review items:
- ...

Touched files:
- ...
```

## Do Not

```text
- Do not reconstruct from calendar dates alone.
- Do not fill holes to make sequences continuous.
- Do not delete uncertain old items only because date math is messy.
- Do not treat reconstruction mode as default future scheduling.
```
