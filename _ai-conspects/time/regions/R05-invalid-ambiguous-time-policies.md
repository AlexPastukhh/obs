# R05 - Invalid / ambiguous local-time policies

Generated: 2026-06-02 11:59:00 UTC

## 0.1 Area overview / key ideas / reading quality

This area finishes the time conspect by handling the hard DST edge cases:

```text
invalid local time  -> local clock time does not exist
ambiguous local time -> local clock time happens twice
policy decision      -> what the business wants to do
```

The road is:

```text
DST transitions
→ IsInvalidTime
→ invalid-time policies
→ IsAmbiguousTime / GetAmbiguousTimeOffsets
→ ambiguous-time policies
→ scheduling delays and TimeSpan usage after choosing an instant
→ display, diagnostics, reporting, audit
```

Key ideas:

```text
1. A local wall-clock time can be invalid when the clock jumps forward.
2. A local wall-clock time can be ambiguous when the clock falls back.
3. `TimeZoneInfo` can detect both cases, but it cannot decide your business policy.
4. For invalid times, common choices are move forward, skip, move backward, or reject.
5. For ambiguous times, common choices are choose earlier, choose later, run once by a fixed rule, or run twice.
6. The chosen policy should be explicit in code, names, logs, and user-facing behavior.
7. After a concrete UTC instant is selected, use `TimeSpan` for actual delays, timeouts, and timers.
```

Reading quality:

```text
overall: high
included image uses: 32
pulled from R04 checked-excluded: S-019, S-020, S-095, S-166, S-167
```

## 0.2 Coverage / boundary review

Included in R05:

```text
S-019, S-020, S-095, S-166, S-167, S-174, S-175, S-176, S-177, S-178, S-179, S-180, S-181, S-182, S-183, S-184, S-185, S-186, S-187, S-188, S-189, S-190, S-191, S-192, S-193, S-194, S-195, S-196, S-197, S-198, S-199, S-200
```

Pulled into R05 from R04 checked-excluded:

```text
S-019, S-020, S-095, S-166, S-167
```

Reason: these screenshots are not general timezone conversion. They are policy examples for invalid/ambiguous local time behavior, diagnostics, audit, and scheduling delay.

No checked-excluded sources remain for R05 in this pass.

## 1. Invalid local time

An invalid local time is a wall-clock time that does not exist in a timezone.

This happens during spring-forward DST transitions.

Example idea:

```text
clock jumps from 02:00 to 03:00
02:30 never happens
```

In .NET, use `TimeZoneInfo.IsInvalidTime`:

```csharp
var tz = TimeZoneInfo.FindSystemTimeZoneById("Some/Timezone");
var localClockTime = new DateTime(2025, 3, 30, 2, 30, 0, DateTimeKind.Unspecified);

if (tz.IsInvalidTime(localClockTime))
{
    // local clock time does not exist in this timezone
}
```

Important: the local wall-clock `DateTime` should be `Unspecified`, because it is not machine-local and not UTC. It is a local clock value that you want to interpret in a specific `TimeZoneInfo`.

## 2. Invalid-time policy: move forward to next valid time

Policy:

```text
If requested local time does not exist, move forward to the next valid local time.
```

Example:

```text
wanted: 02:30
DST jump: 02:00 -> 03:00
actual run: 03:00
```

Good when the rule means:

```text
run as soon as possible after the intended local time
```

Common for:

```text
reminders
notifications
many user-facing schedules
```

Pseudo-code shape:

```csharp
while (tz.IsInvalidTime(localClockTime))
{
    localClockTime = localClockTime.AddMinutes(1);
}

var utc = TimeZoneInfo.ConvertTimeToUtc(localClockTime, tz);
```

## 3. Invalid-time policy: skip occurrence

Policy:

```text
If requested local time does not exist, do not run on that day.
```

Example:

```text
wanted: 02:30
that time does not exist
no run that day
```

Good when the rule means:

```text
only run if the exact local time exists
```

Common for:

```text
strict calendar rules
compliance-sensitive jobs
systems where inventing another time would be misleading
```

Pseudo-code shape:

```csharp
if (tz.IsInvalidTime(localClockTime))
{
    return NoOccurrenceForThisDay;
}
```

## 4. Invalid-time policy: move backward to previous valid time

Policy:

```text
If requested local time does not exist, move backward to the previous valid local time.
```

Example:

```text
wanted: 02:30
actual run: 01:59:59 or 02:00-ish depending on chosen rule
```

This is less common, but can be useful when the business meaning is:

```text
do it before the transition if the exact time disappears
```

## 5. Invalid-time policy: reject schedule as invalid

Policy:

```text
If the user configures a schedule that becomes invalid on DST transition days, reject it or force a clearer choice.
```

Example:

```text
user chooses "02:30 every day"
system says this time may be invalid on DST transition days
choose a rule
```

Good for:

```text
scheduling platforms
admin tools
advanced job schedulers
```

This is often the cleanest design when the system cannot safely infer the user's intent.

## 6. Ambiguous local time

An ambiguous local time is a wall-clock time that happens twice in the same timezone.

This happens during fall-back DST transitions.

Example:

```text
clock goes backward
02:30 happens once with DST offset
then again with standard offset
```

In .NET:

```csharp
if (tz.IsAmbiguousTime(localClockTime))
{
    TimeSpan[] offsets = tz.GetAmbiguousTimeOffsets(localClockTime);
}
```

`GetAmbiguousTimeOffsets` returns the possible offsets for that local clock time.

Example conceptual output:

```text
+02:00
+01:00
```

The key point: the local clock value alone is not enough to know the UTC instant. You must choose one offset or a policy.

## 7. Ambiguous-time policy: choose earlier occurrence

Policy:

```text
Pick the earlier occurrence.
```

Meaning:

```text
choose the first time the wall clock shows that value
```

Example:

```text
02:30 DST
02:30 standard
earlier occurrence -> first one
```

Good when the rule means:

```text
run at the earliest instant when the wall clock first shows that time
```

Common for:

```text
alarms
reminders
"do it when the clock first reaches that value"
```

Pseudo-code shape:

```csharp
var offsets = tz.GetAmbiguousTimeOffsets(localClockTime);
var earlierUtc = offsets
    .Select(offset => new DateTimeOffset(localClockTime, offset).UtcDateTime)
    .Min();
```

## 8. Ambiguous-time policy: choose later occurrence

Policy:

```text
Pick the later occurrence.
```

Meaning:

```text
choose the second time the wall clock shows that value
```

Good when the rule means:

```text
run after the transition has fully settled
```

Pseudo-code shape:

```csharp
var offsets = tz.GetAmbiguousTimeOffsets(localClockTime);
var laterUtc = offsets
    .Select(offset => new DateTimeOffset(localClockTime, offset).UtcDateTime)
    .Max();
```

## 9. Ambiguous-time policy: run once by fixed rule

Policy:

```text
Run only once, always choosing earlier or always choosing later.
```

This is the most common practical choice because it prevents duplicate execution.

The important thing is consistency:

```text
always choose earlier
or always choose later
```

Use explicit names:

```text
ResolveAmbiguousTimeToEarlierUtc
ResolveAmbiguousTimeToLaterUtc
```

rather than hidden ad-hoc offset choices.

## 10. Ambiguous-time policy: run twice

Policy:

```text
Run once for each possible UTC instant.
```

This is uncommon but sometimes correct if the rule literally means:

```text
every time the wall clock displays 02:30
```

Usually not what users expect for reminders, but it can be valid for clock-driven automation or specialized systems.

Pseudo-code shape:

```csharp
var offsets = tz.GetAmbiguousTimeOffsets(localClockTime);

var utcInstants = offsets
    .Select(offset => new DateTimeOffset(localClockTime, offset).UtcDateTime)
    .OrderBy(x => x)
    .ToList();
```

## 11. Display and diagnostics

The notes include two practical uses of DST-related information:

```text
display / diagnostics
business rules
```

For display or logs, you may show:

```text
current offset is +02:00 because DST is active
current offset is +01:00 because standard time is active
```

For special business rules, a system might care because it has different tariffs, hour labels, or operational behavior depending on DST vs non-DST.

`IsDaylightSavingTime` can help explain or audit behavior:

```text
why did today's reminder fire at a different UTC time?
why did today have 23 hours?
```

## 12. Reporting and audit

It may be useful to label events as:

```text
occurred during daylight time
occurred during standard time
```

This is especially helpful for:

```text
billing
tariffs
support/debugging
financial/compliance reports
```

The policy decision should be visible in logs and data:

```text
requested local time
timezone id
invalid/ambiguous state
chosen policy
chosen offset
resolved UTC instant
```

## 13. Scheduling delays and `TimeSpan`

After resolving an invalid or ambiguous local time into one concrete UTC instant, scheduling/timers can use `TimeSpan`.

Delay example:

```csharp
await Task.Delay(timeSpan.FromSeconds(5), cancellationToken);
```

Timeout pattern:

```csharp
using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(30));
await service.DoWorkAsync(cts.Token);
```

Use `TimeSpan` for:

```text
delays
timeouts
durations
```

But do not use a naked `TimeSpan` as the policy for "same local wall-clock time in a timezone" until the concrete instant has been chosen.

## 14. Practical resolver shape

A realistic resolver needs separate handling:

```csharp
DateTime ResolveLocalTime(
    DateTime localClockTime,
    TimeZoneInfo tz,
    InvalidTimePolicy invalidPolicy,
    AmbiguousTimePolicy ambiguousPolicy)
{
    if (tz.IsInvalidTime(localClockTime))
    {
        return ResolveInvalid(localClockTime, tz, invalidPolicy);
    }

    if (tz.IsAmbiguousTime(localClockTime))
    {
        return ResolveAmbiguous(localClockTime, tz, ambiguousPolicy);
    }

    return TimeZoneInfo.ConvertTimeToUtc(localClockTime, tz);
}
```

The exact policies depend on product behavior, but the important architecture is:

```text
detect invalid
detect ambiguous
resolve by explicit policy
only then convert / schedule
```

## 15. Evidence table

| Source group | What it supports |
|---|---|
| S-019/S-020 | Format/examples around invalid/ambiguous display and scheduling snippets reserved from R04. |
| S-095 | Month arithmetic pitfall and DST/invalid-time setup. |
| S-166/S-167 | Display/diagnostics, business rules, reporting/audit uses for DST state. |
| S-174-S176 | Invalid time detection and `IsInvalidTime`. |
| S-185-S190 | Invalid-time policies: move forward, skip, move backward, reject. |
| S-177-S184/S191-S197 | Ambiguous-time detection and policies: earlier, later, run once, run twice. |
| S-198-S200 | `GetAmbiguousTimeOffsets`, possible offsets, choosing local offset / UTC instant. |

## 16. Open questions / follow-up hooks

- Final coverage audit should now check that all 206 image uses are either processed or explicitly corrected.
- In real application code, the domain must choose invalid/ambiguous policy explicitly.
- The safest API shape stores timezone ID + local wall-clock intent + chosen resolution policy, then persists the resolved UTC instant for execution.
