# Schedule Rules

Status: planning draft

## 1. Processing date anchor

Normal repetition schedule is anchored to the processing date.

Example:

```text
2026-04-23 = raw study day
2026-04-25 = processing session
2026-04-30 = first scheduled repeat (+5)
```

The processing session already covers the early ~2-day repeat gap. Normal schedule starts after processing.

## 2. Normal stage ladder

```text
processing
-> +5
-> +10
-> +20
-> +40
-> done / maintenance / future review
```

## 3. Explicit stage and next-gap markers

Do not infer the next repeat only from the repeat unit name.

Every scheduled repeat item should include the current stage and next gap.

Preferred compact format:

```md
- [ ] [[2026-04-23.server]] (+5 -> +10)
- [ ] [[2026-04-23.client]] (+5 -> +10)
- [ ] [[2026-03-20.server]] (+20 -> +40)
```

When completed:

```md
- [x] [[2026-03-20.server]] (+20 -> +40)
  planned: 2026-04-09
  done: 2026-04-16
  next: 2026-05-26
```

## 4. Late repeats

If a repeat is slightly late, record both planned and actual completion date.

```md
- [x] [[2026-03-20.server]] (+20 -> +40)
  planned: 2026-04-09
  done: 2026-04-11
  status: late done
  next: 2026-05-21
```

## 5. Very late repeats

If a repeat is very late, AI should not blindly advance the stage.

AI should mark it as a schedule conflict and either ask or apply a later agreed rule.

Possible actions:

```text
- keep next stage;
- repeat the same stage;
- reduce one stage;
- create focused repeat session;
- reschedule from actual completion date.
```

The exact threshold for "very late" is not final yet.

## 6. Month repeat plans

Month repeat plans are markdown calendar/queue files.

Example:

```md
# Repetition Plan — 2026-05

## 2026-05-10

- [ ] [[2026-04-23.server]] (+10 -> +20)
- [ ] [[2026-04-23.client]] (+10 -> +20)

## 2026-05-30

- [ ] [[2026-04-23.server]] (+20 -> +40)
```

Current month is active.
Next month can be a pre-version.
Future month files can be almost empty seed sheets containing long-gap future repeats.

## 7. Source of truth note

For the first version, month repeat plans plus area-day notes may be enough.

Later, if month plans become fragile, add a `Repeat Register.md` as durable source of truth.