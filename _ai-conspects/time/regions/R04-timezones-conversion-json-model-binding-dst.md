# R04 - Timezones / conversion / JSON / model binding / date math / DST

Generated: 2026-06-02 11:27:57 UTC

## 0.1 Area overview / key ideas / reading quality

This area is about the boundary between an instant and a user's local calendar/clock meaning.

The road is:

```text
UTC/local conversion
→ DateTimeOffset.ToOffset
→ offset vs timezone
→ TimeZoneInfo
→ ASP.NET Core JSON/model binding
→ date-math pitfalls around DST
→ user-local wall-clock scheduling
→ TimeZoneInfo.ConvertTimeToUtc rules
→ IsDaylightSavingTime as inspection, not a full policy engine
```

Key ideas:

```text
1. Machine local time is not the same thing as user local time.
2. An offset is not a timezone. `+02:00` does not encode DST rules, country, region, or timezone identity.
3. Store instants in UTC and convert near UI/display or scheduling boundaries.
4. Use `TimeZoneInfo` for real timezone conversion.
5. Use `DateTimeOffset` for API timestamps and ISO 8601 JSON payloads.
6. Date math must distinguish elapsed duration from same wall-clock time.
7. For user-local scheduling, build local wall-clock values as `DateTimeKind.Unspecified` and convert using the user's `TimeZoneInfo`.
8. `DateTimeKind.Local` means the machine's local zone; pairing it with another timezone can fail or mislead.
9. DST creates gaps/folds; detailed invalid/ambiguous policies are reserved for R05.
```

Reading quality:

```text
overall: high
included image uses: 53
pulled from R03 checked-excluded: S-068, S-069
R03 correction found during R04: S-158
checked-not-R04, reserved for R05: S-019, S-020, S-095, S-166, S-167
```

## 0.2 Coverage / boundary review

Included in R04:

```text
S-001, S-002, S-003, S-004, S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-014, S-015, S-016, S-017, S-018, S-045, S-046, S-047, S-048, S-049, S-050, S-051, S-052, S-053, S-054, S-055, S-056, S-057, S-058, S-068, S-069, S-070, S-071, S-072, S-088, S-089, S-090, S-091, S-092, S-093, S-094, S-161, S-162, S-163, S-164, S-165, S-168, S-169, S-170, S-171, S-172, S-173
```

Pulled into R04 from R03 checked-excluded:

```text
S-068, S-069
```

Reason: these screenshots are user-local/DST conversion material, not parsing/formatting.

Corrected out of R04 into R03:

```text
S-158
```

Reason: `S-158` is about custom-format escaping with backslash, so it belongs to R03 formatting.

Checked but not included:

```text
S-019, S-020, S-095, S-166, S-167
```

Reason: these begin invalid/ambiguous local-time policy material and are reserved for R05.

## 1. UTC, local, and conversion

Basic `DateTime` conversion:

```csharp
var utc = localDateTime.ToUniversalTime();
var local = utcDateTime.ToLocalTime();
```

Important: for `DateTime`, these conversions depend on `DateTime.Kind`.

```text
Kind.Utc         -> already UTC
Kind.Local       -> machine/OS local timezone
Kind.Unspecified -> risky; conversion must assume an interpretation
```

`DateTimeOffset` can be converted to UTC:

```csharp
var utc = dto.ToUniversalTime();
```

and represented with another offset:

```csharp
var changed = dto.ToOffset(TimeSpan.FromHours(-5));
```

Important: `ToOffset` changes the displayed offset representation, not the instant in time.

Example:

```csharp
var utc = new DateTimeOffset(2025, 1, 10, 15, 0, 0, TimeSpan.Zero);
var est = utc.ToOffset(TimeSpan.FromHours(-5));
// same moment, different offset representation
```

## 2. Offset is not a full timezone

A value like:

```text
+02:00
```

is only an offset.

It does not tell:

```text
country
DST rules
timezone name
```

For real timezone conversion, use `TimeZoneInfo`.

Example:

```csharp
var tz = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
var local = TimeZoneInfo.ConvertTime(DateTimeOffset.UtcNow, tz);
```

Windows and Linux timezone IDs can differ:

```text
Windows: "Eastern Standard Time"
Linux/IANA: "America/New_York"
```

That means serious cross-platform timezone logic may need a mapping strategy. The practical rule in the notes is to keep UTC in storage and convert near UI/display boundaries.

## 3. Converting UTC to a user's local timezone

If the user has a timezone ID:

```csharp
var userTz = TimeZoneInfo.FindSystemTimeZoneById(user.TimeZoneId);
var local = TimeZoneInfo.ConvertTime(DateTimeOffset.UtcNow, userTz);
```

This is different from `.LocalDateTime` / `.ToLocalTime()` because those use the server's local timezone. In ASP.NET Core, the server could be Windows, Linux, Docker, Azure, AWS, or a dev machine. "Local" means the machine running the process, not the browser user's timezone.

For displaying a user's local time, use the user's timezone ID and `TimeZoneInfo.ConvertTime`.

## 4. JSON in ASP.NET Core

`System.Text.Json` handles common time types well:

```text
DateTime
DateTimeOffset
TimeSpan
DateOnly / TimeOnly in newer .NET versions
```

Example JSON timestamp:

```json
{
  "createdAt": "2025-01-10T14:30:00+00:00"
}
```

Best practice for API payloads:

```text
return ISO 8601 timestamps
prefer DateTimeOffset for timestamp values
```

`DateOnly` / `TimeOnly` can be used for domain values that are not instants.

## 5. Model binding in ASP.NET Core

ASP.NET Core can bind ISO 8601 values from query/body.

Example query binding with `DateTimeOffset`:

```csharp
[HttpGet]
public IActionResult Get([FromQuery] DateTimeOffset from)
{
    return Ok(from);
}
```

Request:

```text
/api/items?from=2025-01-10T14:30:00Z
```

For date-only values:

```csharp
[HttpGet]
public IActionResult Get([FromQuery] DateOnly date)
{
    return Ok(date);
}
```

This matches the R01/R03 rule: use type choice and format contracts intentionally. `DateTimeOffset` is good for instants; `DateOnly` is good for date-only input.

## 6. Date math pitfalls

The main warning is:

```text
"If I take a local time and do AddDays(1), I will always get the same clock time tomorrow in the user's timezone."
```

That is not always safe when real timezones and DST are involved.

A timezone can change offset during the year because of daylight saving time. A region may have one offset before the DST change and another offset after it.

So these are different requirements:

```text
exact elapsed duration: add 24 hours
same local wall-clock time next day: tomorrow at 09:00 in the user's timezone
```

Example elapsed duration:

```csharp
var later = dto.AddDays(1);
```

This moves forward by one day of elapsed time.

But a scheduling rule like:

```text
tomorrow at 9:00 AM in New York
```

is a wall-clock rule in a real timezone. Around DST transitions, the UTC instant behind that local time may not be exactly 24 hours later.

## 7. Recreate local wall-clock values instead of mutating instants

The notes emphasize a safer pattern: when you need a specific local time, recreate the local clock value instead of just adding to an instant.

For example, convert the current instant into the user's timezone, choose the target local calendar date, create a local wall-clock `DateTime` with `DateTimeKind.Unspecified`, then convert that local time to UTC using the user's timezone.

Example pattern:

```csharp
var tz = TimeZoneInfo.FindSystemTimeZoneById("Asia/Tokyo");
var utcNow = new DateTimeOffset(2025, 3, 31, 18, 30, 0, TimeSpan.Zero);

var localNow = TimeZoneInfo.ConvertTime(utcNow, tz); // 2025-04-01 03:30 +09:00

var targetDate = localNow.Date.AddDays(1);

var nextLocal = new DateTime(
    targetDate.Year,
    targetDate.Month,
    targetDate.Day,
    9, 0, 0,
    DateTimeKind.Unspecified);

var nextUtc = TimeZoneInfo.ConvertTimeToUtc(nextLocal, tz);
```

The core idea is:

```text
instant -> user's local calendar/clock -> intended local wall-clock value -> UTC instant
```

not:

```text
instant + guessed duration
```

## 8. Next month / next scheduled occurrence

For "same wall-clock time next month", use the user's timezone and local calendar first.

Example shape:

```csharp
var tz = TimeZoneInfo.FindSystemTimeZoneById("Europe/Berlin");
var localNow = TimeZoneInfo.ConvertTime(DateTimeOffset.UtcNow, tz);

var localNextMonthDate = localNow.Date.AddMonths(1);

var scheduledLocal = new DateTime(
    localNextMonthDate.Year,
    localNextMonthDate.Month,
    localNextMonthDate.Day,
    9, 0, 0,
    DateTimeKind.Unspecified);

var scheduledUtc = TimeZoneInfo.ConvertTimeToUtc(scheduledLocal, tz);
```

For "next 09:00 in user's timezone":

```csharp
var day = localNow.TimeOfDay >= TimeSpan.FromHours(9)
    ? localNow.Date.AddDays(1)
    : localNow.Date;

var nextLocal = new DateTime(
    day.Year, day.Month, day.Day,
    9, 0, 0,
    DateTimeKind.Unspecified);

var nextUtc = TimeZoneInfo.ConvertTimeToUtc(nextLocal, tz);
```

## 9. Same instant, different calendar date

A single UTC instant can be a different calendar date in another timezone.

Example from the source:

```text
Instant on the timeline:
2025-03-31 22:30:00 UTC

Tokyo:
2025-04-01 07:30 (+09:00)
```

Same moment, different calendar date.

This is why date-only assumptions can be wrong at timezone boundaries. If the user is in Tokyo, their "today" may already be tomorrow compared with UTC.

## 10. `DateTimeKind.Local` and explicit timezones

When using `TimeZoneInfo.ConvertTimeToUtc(localDateTime, timeZone)`, the `DateTime.Kind` matters.

Typical behavior:

```text
DateTimeKind.Unspecified -> interpret this wall-clock value in the provided timezone.
DateTimeKind.Local       -> this value is already local to the machine.
DateTimeKind.Utc         -> this value is already UTC.
```

If `Kind.Local` is used with a `timeZone` that is not the machine's local timezone, .NET can throw an `ArgumentException`.

The notes paraphrase the reason:

```text
"You told me this DateTime is already Local, so why are you also asking me to interpret it as Berlin?"
```

Practical rule:

```text
When constructing a user's local wall-clock time for a specific timezone, use DateTimeKind.Unspecified.
```

## 11. `IsDaylightSavingTime`

`IsDaylightSavingTime` is useful when you want to inspect or react to whether a specific local time is in DST.

It answers:

```text
for this date/time in this zone, is daylight saving currently in effect?
```

Useful cases:

```text
display/debugging
analytics
showing labels
conditional policy decisions
```

But it should not be treated as the whole timezone conversion engine. For conversion, scheduling, invalid/ambiguous detection, and edge-case policies, use the appropriate `TimeZoneInfo` APIs and explicit policy.

## 12. Evidence table

| Source group | What it supports |
|---|---|
| S-001/S-002 | DateTime/DateTimeOffset conversion, ToUniversalTime, ToLocalTime, ToOffset. |
| S-003/S-004 | Offset is not full timezone; TimeZoneInfo and Windows/Linux IDs. |
| S-045-S058 | User timezone conversion, DST awareness, JSON/model binding boundaries. |
| S-007-S009 | System.Text.Json and ASP.NET Core model binding with DateTimeOffset/DateOnly. |
| S-010-S018/S070-S072/S088-S094 | Date math pitfalls, elapsed duration vs same wall-clock time, DST drift. |
| S-161-S164/S168-S173 | Explicit user-local scheduling with TimeZoneInfo, Unspecified local DateTime, ConvertTimeToUtc. |
| S-165 | IsDaylightSavingTime as inspection. |
| S-068/S-069 | Checked during R03; belongs here as user-local/DST conversion material. |
| S-158 | Checked during R04 but corrected into R03 formatting. |

## 13. Open questions / follow-up hooks

- R05 should handle invalid and ambiguous local times explicitly: gaps, folds, `IsInvalidTime`, `GetAmbiguousTimeOffsets`, and policy decisions.
- The main unresolved design choice for later: whether a domain value is an instant or a wall-clock promise.
- The R04 transcript intentionally stops before detailed invalid/ambiguous policies.
