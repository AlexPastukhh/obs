# Schedule Rules

Status: planning draft

This file defines how repetition schedules are created, checked, and reconstructed.

Core rule:

```text
We do not generate repeats from calendar dates.
We generate repeats from existing processing/general-note repeat units.
```

---

## 1. Core model

The repetition system has two layers:

```text
Repeat Chains
= theoretical source of truth / orientation for every existing repeat unit.

Monthly Schedules
= daily queues generated from chains and processing tasks.
```

A monthly schedule answers only:

```text
What do I process or repeat on this date?
```

It should not contain theory, copied topic fragments, or topic-note content.

Detailed material belongs in:

```text
area-day notes
topic notes
question notes
focused repeat session notes
```

---

## 2. Repeat units are created by processing

A repeat chain row exists only when a repeat unit was actually created.

In the old workflow, the repeat unit date usually means the **processing/general-note date**, not the raw study date.

Processing normally happens about 2 days after the raw day note.

Example where a chain exists:

```text
2026-04-24 raw note exists
-> 2026-04-26 processing/general note exists
-> 2026-04-26 repeat unit exists
-> 2604 may appear in repeat chains
```

Example where a chain does not exist:

```text
2026-04-24 raw note does not exist
-> no 2026-04-26 processing from it
-> no 2026-04-26 repeat unit
-> no 2604 chain row/event
```

This rule prevents AI from inventing repeat work just because a calendar date exists.

---

## 3. Holes are valid

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

---

## 4. Repeat chain definition

A repeat chain is the theoretical path of one repeat unit:

```text
source / processing date
-> +5
-> +10
-> +20
-> +40
```

Example:

```text
0104 added asp react
-> 06.04 (+5)
-> 16.04 (+10)
-> 06.05 (+20)
-> 15.06 (+40)
```

The chain helps us:

```text
1. check whether a repeat unit disappeared from the schedule;
2. know what the next repeat should be;
3. preserve orientation when old schedules are messy.
```

This does not mean we need one file per chain. One `Repeat Chains.md` file with month sections is enough for now.

---

## 5. Normal stage ladder

```text
processing
-> +5
-> +10
-> +20
-> +40
-> done / maintenance / future review
```

Each schedule item should show the current stage and next gap.

Preferred compact format:

```md
- [ ] REPEAT [[2026-04-23.server]] (+5 -> +10)
- [ ] REPEAT `0104 added asp react` (+20 -> +40)
```

If the stage is unclear in old notes:

```md
- [ ] REPEAT `react 2` (stage unknown)
```

---

## 6. Theoretical chains are the default

For each repeat unit that exists, store the theoretical chain.

Example table:

```md
## 2026-04 chains

| Unit | Processing date | +5 | +10 | +20 | +40 | Notes |
|---|---:|---:|---:|---:|---:|---|
| `0104 added asp react` | 2026-04-01 | 2026-04-06 | 2026-04-16 | 2026-05-06 | 2026-06-15 | theoretical |
| `0204 added asp` | 2026-04-02 | 2026-04-07 | 2026-04-17 | 2026-05-07 | 2026-06-16 | theoretical |
| `0404 added asp react` | 2026-04-04 | 2026-04-09 | 2026-04-19 | 2026-05-09 | 2026-06-18 | theoretical |
```

If `0304` did not actually exist, it is simply absent from the table.

Use theoretical chains by default.

Change a chain only when explicitly requested or when the user says a repeat was actually rescheduled.

---

## 7. Monthly schedules are generated from chains

Monthly schedule files are daily queues generated from repeat chains plus processing/focused-repeat tasks.

Example:

```md
# Repetition Plan — 2026-05

## 2026-05-06

- [ ] REPEAT `0104 added asp react` (+20 -> +40)

## 2026-05-07

- [ ] REPEAT `0204 added asp` (+20 -> +40)
```

The monthly schedule is useful for daily work.

The chain table is useful for checking that nothing was lost.

---

## 8. Exact gaps vs chain preservation

Exact gaps are still the normal rule:

```text
+5
+10
+20
+40
```

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

This matters more for long gaps:

```text
+20
+40
```

---

## 9. Live scheduling rule

When the user reports a completed repeat, AI should:

```text
1. find the chain;
2. confirm current stage;
3. mark the event done in the monthly schedule;
4. add the next event from the chain;
5. only change the theoretical chain if user explicitly says to reschedule.
```

Example:

```text
User: I repeated 0104 today.
```

AI checks:

```text
Was 0104 expected today according to the chain?
What stage is this? +20?
Next should be +40 on 15.06, unless user says reschedule.
```

---

## 10. Late and very late repeats

If a repeat is slightly late, record both planned and actual completion date.

```md
- [x] REPEAT [[2026-03-20.server]] (+20 -> +40)
  planned: 2026-04-09
  done: 2026-04-11
  status: late done
```

If a repeat is very late, AI should not blindly mutate the chain.

AI should mark it as a schedule conflict and either ask or apply a later agreed rule.

Possible actions:

```text
- keep the theoretical chain but record late completion;
- schedule a recovery repeat;
- create focused repeat session;
- explicitly reschedule the chain if user asks.
```

Do not silently rewrite theoretical chains.

---

## 11. Old drawing reconstruction rule

Old Excalidraw schedules are messy but valid.

If an item appears on a date in the old schedule, treat it as a valid scheduled chain event unless there is evidence it is wrong.

Strange date math may mean:

```text
- manual reschedule;
- old naming style;
- legacy repeat unit;
- shifted chain event.
```

If uncertain, keep the item with `review` or `stage unknown` rather than deleting it.

---

## 12. Historical reconstruction mode

Historical reconstruction mode is for recovery.

Assumption:

```text
Imagine today is 2026-04-28.
Everything before 2026-04-28 was repeated/processed as planned.
```

Goal:

```text
Build chains from February/March/April source units.
Generate rest-of-April, May, June, and July daily queues from those chains.
Include unprocessed raw notes as processing backlog.
```

This does not mean we normally fill all future months far ahead.

It is a recovery mode to prevent losing old conspect repeats.

---

## 13. Current reconstruction state

Known recovery state:

```text
Imagined current date: 2026-04-28
Last known processing: 2026-04-27
```

Unprocessed raw day notes:

```md
- [ ] PROCESS_RAW [[2026-04-26 raw]]
- [ ] PROCESS_RAW [[2026-04-27 raw]]
- [ ] PROCESS_RAW [[2026-04-28 raw]]
```

These are not repeat chains yet.

They become repeat units only after processing.

Example if processed immediately:

```text
2026-04-26 raw -> process 2026-04-28 -> repeat unit created on 2026-04-28
2026-04-27 raw -> process 2026-04-29 -> repeat unit created on 2026-04-29
2026-04-28 raw -> process 2026-04-30 -> repeat unit created on 2026-04-30
```

Then each created unit gets its own chain.

---

## 14. Reconstruction algorithm

To build the full February-July schedule:

```text
1. Identify which processing/general-note dates actually created repeat units.
2. Create chain rows only for those units.
3. Do not create rows for holes.
4. Use theoretical gaps: +5, +10, +20, +40.
5. Preserve old labels for legacy units.
6. Generate monthly daily queues from chain rows.
7. Add processing backlog for unprocessed raw notes.
8. If old drawing conflicts with theory, treat it as possible reschedule, but do not mutate theoretical chain unless user confirms.
9. If uncertain, keep item with review/unknown marker rather than deleting it.
```
