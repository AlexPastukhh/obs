# Process New Repeat Unit Workflow

Status: active workflow.

Use when the user says they processed / запроцессил a raw note, area note, topic note, client/server material, or another study unit.

## Goal

Create a new repeat unit and schedule all future repeats.

## Required Reads

```text
-Repetition/Repetition Schedule Principles.md
-Repetition/Chains/
-Repetition/Schedules/
```

Use templates as reference when creating a new chain/schedule style:

```text
-Repetition/Templates/Repeat Chains Template.md
-Repetition/Templates/Month Repeat Plan Template.md
```

## Inputs

```text
- what was processed;
- processing date;
- optional raw/source date;
- optional area: server/client/react/asp/sql/etc.;
- optional source notes created;
- optional question/repeat material links.
```

## Algorithm

```text
1. Identify processing date.
   - Use today's date unless user explicitly gives another processing date.
   - If user gives a raw date, keep it as source context, not as repeat unit date.

2. Create unit name.
   Preferred examples:
   - `2026-06-05.server`
   - `2026-06-05.client`
   - `2026-06-05 processing of 2026-04-26 raw`

3. Add the unit to the relevant chain file.
   If current chain file is too old/large, create/use a new month chain file.

4. Calculate repeat dates from processing date D:
   - +5  = D + 5 days
   - +10 = D + 15 days
   - +20 = D + 35 days
   - +40 = D + 75 days
   - +80 = D + 155 days

5. Add schedule entries to month files:
   - +5 item says `(+5 -> +10)`
   - +10 item says `(+10 -> +20)`
   - +20 item says `(+20 -> +40)`
   - +40 item says `(+40 -> +80)`
   - +80 item says `(+80 -> review)`

6. Create missing month files if needed.

7. Report what changed and which months were touched.
```

## Do Not

```text
- Do not use raw-study date as repeat unit date when processing date is different.
- Do not create repeat units for calendar holes.
- Do not silently apply +1 month recovery shift.
- Do not silently rollback stages.
- Do not silently rewrite existing chain rows unless explicitly asked.
```

## Output Shape

```text
Created repeat unit:
- ...

Chain row:
- ...

Schedule entries added:
- YYYY-MM-DD ...

Touched files:
- ...

Unclear / needs user check:
- ...
```
