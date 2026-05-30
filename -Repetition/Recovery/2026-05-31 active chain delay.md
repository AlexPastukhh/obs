# 2026-05-31 Active Chain Delay

Status: explicit recovery decision / active context.

## Why this exists

After the previous `2026-05 break - active chain shift`, the active schedule was still too early.

The active start that was planned for `2026-05-28` is now moved to `2026-05-31`.

## This is an explicit one-time recovery decision

This is **not** the default scheduling rule.

It is a follow-up explicit recovery decision for the active chain after the missed May period.

Do not apply this `+3 days` delay to future breaks unless the user explicitly asks.

## Active delay rule

```text
For every active repeat chain:
1. Keep completed/history dates before 2026-05-28 unchanged.
2. Shift every active planned date on or after 2026-05-28 by +3 days.
3. Preserve exact gaps between later active stages.
4. Regenerate schedules from the updated chain file.
```

This means:

```text
2026-05-28 -> 2026-05-31
2026-05-29 -> 2026-06-01
2026-05-30 -> 2026-06-02
2026-06-01 -> 2026-06-04
...
```

## Examples

```text
1202 ADDED...
previous active +40 = 2026-05-28
current active +40 = 2026-05-31
current active +80 = 2026-08-19

2403 added asp react
previous active +20 = 2026-05-28
current active +20 = 2026-05-31
current active +40 = 2026-07-10
current active +80 = 2026-09-28
```

## Recovery processing backlog after delay

```text
2026-04-26 raw -> active processing 2026-05-31
2026-04-27 raw -> active processing 2026-06-01
2026-04-28 raw -> active processing 2026-06-02
```

Their current active chains:

```text
2026-05-31 processing of 2026-04-26 raw
-> 2026-06-05 (+5)
-> 2026-06-15 (+10)
-> 2026-07-05 (+20)
-> 2026-08-14 (+40)
-> 2026-11-02 (+80 / review)

2026-06-01 processing of 2026-04-27 raw
-> 2026-06-06 (+5)
-> 2026-06-16 (+10)
-> 2026-07-06 (+20)
-> 2026-08-15 (+40)
-> 2026-11-03 (+80 / review)

2026-06-02 processing of 2026-04-28 raw
-> 2026-06-07 (+5)
-> 2026-06-17 (+10)
-> 2026-07-07 (+20)
-> 2026-08-16 (+40)
-> 2026-11-04 (+80 / review)
```

## Important

The chain file is still the source of truth. Schedules must be regenerated from the chain file after this decision.
