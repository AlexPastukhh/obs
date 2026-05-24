# 2026-05 Break — Active Chain Shift

Status: recovery rule / active context.

## Why this exists

May was missed. The old reconstruction was based on an imagined current date of 2026-04-28, but the active working schedule should continue later.

## Active shift rule

```text
For every repeat chain:
1. Keep stages before 2026-04-28 as completed history.
2. Find the first pending stage on or after 2026-04-28.
3. Shift that stage by +1 calendar month.
4. Recalculate all following stages using exact day gaps.
```

Current ladder:

```text
processing -> +5 -> +10 -> +20 -> +40 -> +80 -> review / decide next
```

This is not a simple `05 -> 06` text replacement. Dates must stay real calendar dates.

Examples:

```text
1202 ADDED...
old +40 = 2026-04-28
active +40 = 2026-05-28
active +80 = 2026-08-16

0104 added asp react
old +20 = 2026-05-06
active +20 = 2026-06-06
active +40 = 2026-07-16
active +80 = 2026-10-04

1703 added asp react
old +40 = 2026-05-31
active +40 = 2026-06-30
active +80 = 2026-09-18
```

## Recovery processing backlog

```text
2026-04-26 raw -> active processing 2026-05-28
2026-04-27 raw -> active processing 2026-05-29
2026-04-28 raw -> active processing 2026-05-30
```

Their active chains:

```text
2026-05-28 processing of 2026-04-26 raw
-> 2026-06-02 (+5)
-> 2026-06-12 (+10)
-> 2026-07-02 (+20)
-> 2026-08-11 (+40)
-> 2026-10-30 (+80 / review)

2026-05-29 processing of 2026-04-27 raw
-> 2026-06-03 (+5)
-> 2026-06-13 (+10)
-> 2026-07-03 (+20)
-> 2026-08-12 (+40)
-> 2026-10-31 (+80 / review)

2026-05-30 processing of 2026-04-28 raw
-> 2026-06-04 (+5)
-> 2026-06-14 (+10)
-> 2026-07-04 (+20)
-> 2026-08-13 (+40)
-> 2026-11-01 (+80 / review)
```

## Important

Only repeat units that actually existed are in the chain file.

If a possible hole is later confirmed as real, add its chain and regenerate affected schedules.
