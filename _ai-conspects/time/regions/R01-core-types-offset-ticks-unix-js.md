# R01 - Core time types / offset / ticks / Unix / JS local display

Generated: 2026-06-02 09:06:34 UTC

## 0.1 Area overview / key ideas / reading quality

This area is about choosing the right time representation before getting into advanced timezone rules.

The main road is:

```text
DateTime / DateTimeOffset / DateOnly / TimeOnly / TimeSpan
→ DateTime.Kind and DateTimeOffset offset semantics
→ comparing and expiration patterns
→ ticks vs Unix time
→ backend-to-JavaScript transport and user-local display formatting
```

Key ideas I extracted:

```text
1. For backend timestamps, prefer DateTimeOffset and store/compare instants in UTC.
2. Plain DateTime is dangerous at API boundaries because the same clock value can mean Utc, Local, or Unspecified.
3. DateOnly, TimeOnly, and TimeSpan are not instants; they model domain dates, times-of-day, and durations.
4. DateTimeOffset offset means: UTC = local represented time - offset.
5. .NET ticks are not Unix seconds. Ticks are .NET 100 ns units since 0001-01-01; Unix time starts at 1970-01-01 UTC.
6. For frontend interop, Unix milliseconds and ISO strings are useful for different reasons.
7. JS locale formatting is a display step, not a storage/transport format.
```

Reading quality:

```text
overall: high
included image uses: 58
pulled into R01 from initial R04 candidates: S-063, S-064, S-065, S-066, S-067
reserved out of initial P01 into P02/R03: S-201, S-202, S-203, S-204, S-205, S-206
```

The visible screenshots were clear enough for the core ideas and key snippets. A few screenshots are scroll fragments, so this transcript preserves the semantic road rather than pretending every cropped screenshot is a complete standalone section.

## 0.2 Coverage / boundary review

Included in R01:

```text
S-005, S-006, S-021, S-022, S-023, S-024, S-025, S-026, S-027, S-028, S-029, S-030, S-031, S-032, S-033, S-034, S-035, S-036, S-037, S-038, S-039, S-040, S-041, S-042, S-043, S-044, S-059, S-060, S-061, S-062, S-063, S-064, S-065, S-066, S-067, S-073, S-074, S-075, S-076, S-077, S-078, S-079, S-080, S-081, S-082, S-083, S-084, S-085, S-086, S-087, S-096, S-097, S-098, S-099, S-100, S-101, S-102, S-103
```

Pulled into R01 after boundary recheck:

```text
S-063, S-064, S-065, S-066, S-067
```

Reason: these screenshots explain `DateTime.Kind`, `ToUniversalTime()`, `ToLocalTime()`, and machine-local interpretation. That is core `DateTime` behavior, not advanced timezone policy.

Checked but not included:

```text
S-201, S-202, S-203, S-204, S-205, S-206
```

Reason: these are ISO 8601 / RFC 1123 / Unix format cheat-sheet screenshots. They belong to the next parsing/formatting pass.

Also checked but not included:

```text
S-068, S-069, S-070, S-071, S-072
```

Reason: these start DST/date-math/timezone policy material and should be handled in the timezone/DST pass.

## 1. Common rule and API model choices

The opening rule is: for backend apps, APIs, and databases, treat timestamps as instants and keep them unambiguous.

Good default:

```csharp
var now = DateTimeOffset.UtcNow;
```

A good DTO uses `DateTimeOffset` for timestamps, nullable `DateTimeOffset?` for optional timestamp fields, and `TimeSpan` for durations:

```csharp
public class OrderDto
{
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? PaidAt { get; set; }
    public TimeSpan ProcessingTime { get; set; }
}
```

A plain `DateTime` timestamp is marked as "often not ideal" unless the project has a strict UTC policy:

```csharp
public class OrderDto
{
    public DateTime CreatedAt { get; set; } // ambiguous unless strict UTC policy
}
```

For date-only input, use `DateOnly`:

```csharp
public class ReportRequest
{
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
}
```

## 2. Core .NET time types

### `DateTime`

`DateTime` represents a date and time, but its meaning depends on `Kind`.

A `DateTime` can be:

```text
Utc
Local
Unspecified
```

Example:

```csharp
var utc = DateTime.UtcNow;                 // Kind = Utc
var local = DateTime.Now;                  // Kind = Local
var unspec = new DateTime(2025, 1, 1);     // Kind = Unspecified
```

The important warning is that `Unspecified` is ambiguous in APIs.

Prefer:

```csharp
DateTime utc = DateTime.UtcNow;
```

Avoid ambiguous constructed values when the meaning is not attached:

```csharp
DateTime ambiguous = new DateTime(2025, 1, 1, 10, 0, 0);
```

### `DateTimeOffset`

`DateTimeOffset` is a date/time plus an offset from UTC.

Examples:

```csharp
DateTimeOffset dto = DateTimeOffset.UtcNow;
DateTimeOffset dto2 = DateTimeOffset.Now;
```

Offset examples:

```text
2025-01-10T14:00:00+00:00
2025-01-10T09:00:00-05:00
```

Use it for:

```text
API request/response timestamps
audit fields
created/updated dates
logs
scheduling timestamps
```

### `TimeSpan`

`TimeSpan` is duration, not a point in time.

```csharp
TimeSpan duration = TimeSpan.FromMinutes(90);
```

Use it for timeout values, elapsed time, expiration periods, and intervals.

### `DateOnly` and `TimeOnly`

`DateOnly` is for a date without a time:

```csharp
DateOnly birthday = new DateOnly(1990, 5, 10);
```

Use for birthdays, holidays, due dates, business dates.

`TimeOnly` is for time of day without date:

```csharp
TimeOnly opening = new TimeOnly(9, 30);
```

Use for store opening hours, daily schedule times, recurring time-of-day values.

## 3. What to use when

Use `DateTimeOffset` for values like:

```text
CreatedAt
UpdatedAt
token expiration instants
event timestamps
request timestamps
```

Example:

```csharp
public DateTimeOffset CreatedAtUtc { get; set; }
```

Use `DateTime` only when integrating with older APIs/libraries, when a library specifically requires it, or when `Kind` is controlled carefully.

Use `TimeSpan` for durations:

```csharp
TimeSpan ttl = TimeSpan.FromHours(1);
```

Use `DateOnly` / `TimeOnly` for business/domain values that are not timestamps.

## 4. Offset semantics and `LocalDateTime`

The offset in `DateTimeOffset` is the difference between that represented time and UTC.

Examples:

```text
+00:00 means same as UTC
+02:00 means 2 hours ahead of UTC
-05:00 means 5 hours behind UTC
```

Formula:

```text
UTC = local time - offset
```

Examples:

```text
14:00 +02:00 -> UTC is 12:00
14:00 -05:00 -> UTC is 19:00
```

So `DateTimeOffset` is "a date/time value, plus how far it is from UTC", which makes it less ambiguous than plain `DateTime`.

The format:

```text
2025-01-10T14:00:00+00:00
```

breaks down as year, month, day, `T` separator, time, and offset from UTC. It means January 10, 2025 at 14:00:00 with zero offset from UTC.

`dto.LocalDateTime` is local to the machine running the code:

```csharp
var local = dto.LocalDateTime;
```

In a server app, that usually means the server timezone, not the end user's timezone. If the ASP.NET app runs on a UTC server, `.LocalDateTime` often gives UTC-like server-local time. If it runs in New York, it gives New York local time.

## 5. `Kind`, `SpecifyKind`, and conversion

If you know a `DateTime` value is actually UTC, you can mark the `Kind` using `SpecifyKind`:

```csharp
var dt = new DateTime(2025, 1, 10, 14, 0, 0);
var utc = DateTime.SpecifyKind(dt, DateTimeKind.Utc);
```

This does not shift the clock. It says "interpret this value as UTC".

If you know it is local:

```csharp
var dt = new DateTime(2025, 1, 10, 14, 0, 0);
var local = DateTime.SpecifyKind(dt, DateTimeKind.Local);
var utc = local.ToUniversalTime();
```

When converting `DateTime` to UTC:

```text
Kind == Utc         -> ToUniversalTime() is effectively no real change.
Kind == Local       -> .NET converts using the machine's local timezone rules.
Kind == Unspecified -> .NET must assume; in practice ToUniversalTime() treats it like local time.
```

That makes `Unspecified` risky: if the server is UTC+2 and the value was meant to be 14:00 UTC, `.ToUniversalTime()` may incorrectly turn it into 12:00 UTC.

For UTC to local:

```csharp
var utc = DateTime.UtcNow;
var local = utc.ToLocalTime();
```

This converts to the machine's local timezone, not automatically the user's timezone.

The notes also make explicit that ASP.NET Core runs on an OS: Windows Server, Linux server, Docker on Linux, local dev machine, Azure/App Service/VM, AWS EC2, and so on. That matters because "local" is the machine/OS local zone of the process.

## 6. Adding, subtracting, comparing, and expiration

Adding and subtracting:

```csharp
var tomorrow = DateTimeOffset.UtcNow.AddDays(1);
var nextHour = DateTimeOffset.UtcNow.AddHours(1);
var nextMonth = DateTimeOffset.UtcNow.AddMonths(1);
```

Difference between two timestamps gives a `TimeSpan`:

```csharp
TimeSpan diff = end - start;
```

Example:

```csharp
var start = DateTimeOffset.UtcNow;
var end = start.AddMinutes(90);
TimeSpan duration = end - start;
```

Comparing times:

```csharp
if (a < b) { }
if (a > b) { }
if (a == b) { }
```

Expiration check:

```csharp
if (DateTimeOffset.UtcNow >= expiresAt)
{
    // expired
}
```

Duration check:

```csharp
if (elapsed > TimeSpan.FromSeconds(30))
{
    // too slow
}
```

Expiration pattern:

```csharp
var expiresAt = DateTimeOffset.UtcNow.AddMinutes(30);
bool expired = DateTimeOffset.UtcNow >= expiresAt;
```

Sliding window pattern:

```csharp
var lastSeen = DateTimeOffset.UtcNow;
var idleTimeout = TimeSpan.FromMinutes(20);

bool isExpired = DateTimeOffset.UtcNow - lastSeen > idleTimeout;
```

## 7. Ticks vs Unix time

A .NET tick is 100 nanoseconds:

```text
1 tick = 0.0000001 second
10,000 ticks = 1 millisecond
10,000,000 ticks = 1 second
```

Ticks are counted from:

```text
0001-01-01 00:00:00
```

Example:

```csharp
long ticks = DateTime.UtcNow.Ticks;
```

Convert ticks to `DateTime`:

```csharp
var dt = new DateTime(ticks, DateTimeKind.Utc);
```

Convert ticks to `DateTimeOffset`:

```csharp
var dto = new DateTimeOffset(ticks, TimeSpan.Zero);
```

Unix time is seconds or milliseconds since:

```text
1970-01-01T00:00:00Z
```

Current Unix time:

```csharp
long unixSeconds = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
long unixMs = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
```

From Unix time:

```csharp
var dto1 = DateTimeOffset.FromUnixTimeSeconds(unixSeconds);
var dto2 = DateTimeOffset.FromUnixTimeMilliseconds(unixMs);
```

Convert to UTC `DateTime`:

```csharp
DateTime utc = DateTimeOffset.FromUnixTimeSeconds(unixSeconds).UtcDateTime;
```

Important warning:

```csharp
long x = DateTime.UtcNow.Ticks;
// x is NOT unix seconds
```

Rule:

```text
use .Ticks only when you really want .NET tick values
use ToUnixTimeSeconds() / ToUnixTimeMilliseconds() for Unix time
```

## 8. Unix time and frontend interop

JavaScript works naturally with epoch-based timestamps. JS `Date` is heavily based on milliseconds since the Unix epoch.

Backend and frontend often exchange time as:

```text
Unix milliseconds
ISO string
sometimes Unix seconds
```

Example idea:

```text
backend sends 1736517600
frontend turns it into a displayed date
```

ASP.NET backend example:

```csharp
app.MapGet("/session", () =>
{
    var expiresAt = DateTimeOffset.UtcNow.AddMinutes(30);

    return Results.Ok(new
    {
        expiresAtUnixMs = expiresAt.ToUnixTimeMilliseconds(),
        expiresAtIso = expiresAt.ToString("O")
    });
});
```

Possible JSON:

```json
{
  "expiresAtUnixMs": 1736519400000,
  "expiresAtIso": "2025-01-10T14:30:00.0000000+00:00"
}
```

JavaScript frontend:

```javascript
const res = await fetch("/session");
const data = await res.json();

const expiresAt = new Date(data.expiresAtUnixMs);

console.log(expiresAt);
console.log(expiresAt.toLocaleString());

const msLeft = data.expiresAtUnixMs - Date.now();
console.log("Milliseconds left:", msLeft);
```

Unix time is especially convenient when the frontend needs to compare times, sort by time, compute remaining duration, run countdowns, plot charts, handle JWT expiry, or avoid parsing custom date formats.

Practical rule for backend ↔ frontend:

```text
use ISO 8601 strings when human readability is helpful
use Unix milliseconds when frontend will do arithmetic or timers
```

## 9. JavaScript locale display

The important distinction is:

```text
storage/transport -> Unix time or ISO string
display           -> locale formatting methods
```

Display methods:

```text
toLocaleTimeString()
toLocaleString()
toLocaleDateString()
```

because display should match the user's locale/timezone.

In a chart example:

```javascript
console.log(new Date(p.x).toLocaleTimeString(), p.y);
```

Meaning:

```text
p.x is a Unix timestamp in milliseconds
new Date(p.x) creates a JS Date
toLocaleTimeString() converts it to a user-friendly local time string
p.y is the value associated with that time
```

`toLocaleString()` returns date + time in the user's locale:

```javascript
const d = new Date("2025-01-10T14:30:00Z");
console.log(d.toLocaleString());
```

Possible outputs:

```text
1/10/2025, 2:30:00 PM
10.1.2025, 15:30:00
```

`toLocaleTimeString()` returns only the time part:

```javascript
const d = new Date("2025-01-10T14:30:00Z");
console.log(d.toLocaleTimeString());
```

Possible outputs:

```text
2:30:00 PM
15:30:00
```

`toLocaleDateString()` returns only the date part:

```javascript
const d = new Date("2025-01-10T14:30:00Z");
console.log(d.toLocaleDateString());
```

Possible outputs:

```text
1/10/2025
10.1.2025
```

Use these only when producing user-facing display, not as storage formats.

## 10. Evidence table

| Source group | What it supports |
|---|---|
| S-005/S-006 | DTO choices: DateTimeOffset good for timestamps; plain DateTime ambiguous; DateOnly for date-only input. |
| S-039/S-040 | Main cheat-sheet rule and DateTime/Kind problem. |
| S-035/S-036/S-037/S-038 | TimeOnly, DateOnly, TimeSpan, DateTimeOffset. |
| S-032/S-033/S-034 | Type selection rules and avoiding ambiguous DateTime. |
| S-041/S-042/S-043/S-044 | Offset semantics, ISO offset string, LocalDateTime is server-local. |
| S-059/S-063/S-064/S-065/S-066/S-067 | SpecifyKind, ToUniversalTime, ToLocalTime, machine/server-local behavior. |
| S-021/S-022/S-023/S-103 | Add/subtract, compare, expiration, sliding-window examples. |
| S-024-S031/S-060-S062/S-073-S079 | DateOnly/TimeOnly examples plus ticks vs Unix time and Unix interop. |
| S-080-S087 | ASP.NET backend to JS frontend transport with Unix milliseconds and ISO string. |
| S-096-S102 | JavaScript locale formatting methods for display. |

## 11. Open questions / follow-up hooks

- The user-local timezone road continues later in the timezone/DST pass.
- ISO/RFC/Unix format selection continues in the parsing/formatting pass.
- `DateTimeKind.Unspecified` and machine-local conversion should be remembered as a central source of bugs when reading the later timezone section.
