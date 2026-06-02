# R03 - Parsing / formatting / standard and custom time formats

Generated: 2026-06-02 09:24:19 UTC

## 0.1 Area overview / key ideas / reading quality

This area is about turning external text into .NET time values and turning .NET time values back into stable strings.

The road is:

```text
Parse / TryParse
→ ParseExact / TryParseExact
→ DateTime vs DateTimeOffset parsing
→ standard format strings
→ custom format tokens
→ ISO 8601 / RFC 1123 / Unix time format choice
```

Key ideas:

```text
1. Parse/TryParse are flexible and culture-sensitive.
2. ParseExact/TryParseExact are for known formats and stricter boundaries.
3. Prefer DateTimeOffset when the input includes an offset and that offset matters.
4. Plain ToString() without a format is culture-dependent and should not be used for APIs, persistence, sorting, logs, or headers.
5. Standard formats such as O/o, s, u, and R solve common transport/log/header cases.
6. Custom format tokens are case-sensitive; M/m, H/h, f/F are common bug sources.
7. ISO 8601 is the default textual API/JSON format; RFC 1123 is mainly for HTTP headers; Unix time is a compact numeric instant.
```

Reading quality:

```text
overall: high
included image uses: 62
pulled from R01 reserved bucket: S-201, S-202, S-203, S-204, S-205, S-206
checked-not-R03, reserved for R04: S-068, S-069
```

## 0.2 Coverage / boundary review

Included in R03:

```text
S-104, S-105, S-106, S-107, S-108, S-109, S-110, S-111, S-112, S-113, S-114, S-115, S-116, S-117, S-118, S-119, S-120, S-121, S-122, S-123, S-124, S-125, S-126, S-127, S-128, S-129, S-130, S-131, S-132, S-133, S-134, S-135, S-136, S-137, S-138, S-139, S-140, S-141, S-142, S-143, S-144, S-145, S-146, S-147, S-148, S-149, S-150, S-151, S-152, S-153, S-154, S-155, S-156, S-157, S-159, S-160, S-201, S-202, S-203, S-204, S-205, S-206
```

Pulled into R03 from R01 checked-excluded:

```text
S-201, S-202, S-203, S-204, S-205, S-206
```

Reason: these screenshots are ISO 8601 / RFC 1123 / Unix format choice material, not core type-selection material.

Checked but not included:

```text
S-068, S-069
```

Reason: these begin user-local-time / DST / date-math conversion material and stay reserved for R04.

## 1. Big rule: flexible parse vs exact parse

Use `Parse` / `TryParse` when you can accept multiple common input shapes.

These are flexible, but they rely on the current culture or the culture you provide. They can recognize many valid date/time strings, but the accepted result can be surprising if the input is ambiguous.

Example flexible parse:

```csharp
string s = "Tue, 02 Apr 2026 12:45:06 GMT";

DateTimeOffset dto = DateTimeOffset.Parse(s);

Console.WriteLine(dto);
Console.WriteLine(dto.ToUniversalTime());
```

Safer version:

```csharp
string s = "Tue, 02 Apr 2026 12:45:06 GMT";

if (DateTimeOffset.TryParse(s, out var dto))
{
    Console.WriteLine(dto);
}
```

Use `ParseExact` / `TryParseExact` when the string must match one specific format:

```csharp
using System.Globalization;

string s = "2026-02-14";

DateTime dt = DateTime.ParseExact(
    s,
    "yyyy-MM-dd",
    CultureInfo.InvariantCulture);
```

TryParseExact version:

```csharp
if (DateTimeOffset.TryParseExact(
    text,
    "O",
    CultureInfo.InvariantCulture,
    DateTimeStyles.None,
    out var dto))
{
    Console.WriteLine(dto);
}
```

Practical rule:

```text
Parse/TryParse       -> input may be flexible / human-ish / culture-driven
ParseExact/TryParseExact -> input has a fixed contract
TryParse/TryParseExact -> prefer when invalid input is normal
```

## 2. What `DateTime.Parse` can parse

`DateTime.Parse` can parse common shapes:

```text
date + time
date only
month + day + year
month + day only
time only
hour + AM/PM
ISO 8601 strings with Z or offset
RFC 1123 / GMT strings
date/time strings with explicit time-zone offset
```

Examples include:

```text
04/20/2026 07:22:15
2026-04-20
4/20
07:22:15
7 PM
2026-04-20T07:22:15.0000000Z
Mon, 20 Apr 2026 07:22:15 GMT
2026-04-20 07:22:15 +02:00
```

But if an offset is part of the input and you need to preserve it, `DateTimeOffset.Parse` is usually the better model.

## 3. What `DateTimeOffset.Parse` can parse

`DateTimeOffset.Parse` can parse many of the same shapes, but it is especially appropriate when the input may contain an offset or when preserving the idea of an absolute instant plus offset is important.

Examples:

```csharp
var dto1 = DateTimeOffset.Parse("2026-04-10T07:22:15.0000000Z");
var dto2 = DateTimeOffset.Parse("2026-04-10T07:22:15.0000000+03:00");
var dto3 = DateTimeOffset.Parse("Fri, 10 Aug 2026 07:22:15 GMT");
```

The note in the source says to default to `DateTimeOffset` for API timestamps, request/response payloads, and cross-machine/cross-timezone data.

## 4. Standard format strings for exact parsing and formatting

`ParseExact` can use standard format specifiers.

Important standard formats in this area:

```text
R / r -> RFC 1123
O / o -> round-trip / ISO 8601-style
s     -> sortable date/time
u     -> universal sortable
G/g, F/f, D/d, T/t -> culture-based standard patterns
```

Example with RFC 1123:

```csharp
using System.Globalization;

var dto = DateTimeOffset.ParseExact(
    "Tue, 02 Apr 2026 12:45:06 GMT",
    "R",
    CultureInfo.InvariantCulture);
```

`R` works both ways:

```text
dto.ToString("R")                    -> formats to RFC 1123 text
ParseExact(text, "R", ...)           -> parses that same format back
```

## 5. Custom parse/format strings

You can use custom formats with `ParseExact`:

```csharp
var dt = DateTime.ParseExact(
    "2026-04-20",
    "yyyy-MM-dd",
    CultureInfo.InvariantCulture);
```

Common custom patterns:

```text
yyyy-MM-dd
yyyy-MM-dd HH:mm:ss
yyyy-MM-ddTHH:mm:ss
yyyy-MM-ddTHH:mm:sszzz
```

Example with offset:

```csharp
var dto = DateTimeOffset.ParseExact(
    "2026-04-20T14:36:00+02:00",
    "yyyy-MM-ddTHH:mm:sszzz",
    CultureInfo.InvariantCulture);
```

Custom format strings must match the text exactly. If the input contains `T`, `-`, `:`, offset, fractional seconds, or AM/PM, the pattern must account for them.

## 6. Formatting with standard formats

You can format `DateTime` and `DateTimeOffset` with standard format strings:

```csharp
DateTimeOffset dto = DateTimeOffset.UtcNow;

Console.WriteLine(dto.ToString("O"));
Console.WriteLine(dto.ToString("R"));
Console.WriteLine(dto.ToString("s"));
Console.WriteLine(dto.ToString("u"));
```

Useful rules:

```text
DateTimeOffset is usually better when you care about a real instant plus offset.
DateTime is fine, but it depends on Kind and whether it represents local/UTC/unspecified time.
```

Format cheat sheet:

```text
O / o -> round-trip ISO 8601 style, includes enough precision/offset info
R / r -> RFC 1123 / GMT style
s     -> sortable, like yyyy-MM-ddTHH:mm:ss
u     -> universal sortable, UTC-style output
```

## 7. Why plain `ToString()` is not enough

Calling `ToString()` on `DateTimeOffset` without a format uses the current culture's default pattern.

That means the same value may look different on different machines/cultures:

```text
4/20/2026 7:46:05 AM +02:00
02.04.2026 14:05:00 +02:00
```

This is usually not what you want for:

```text
APIs
persistence
headers
logs
machine-to-machine strings
sorting strings
```

For stable machine output, use explicit formats: `O`, `R`, `s`, `u`, or a custom invariant format.

## 8. Sortable and universal sortable formats

`"s"` is the sortable date/time pattern. It produces a fixed, culture-invariant shape like:

```text
yyyy-MM-ddTHH:mm:ss
```

Example output:

```text
2026-04-02T14:25:36
```

It sorts lexicographically because the components are ordered from most significant to least significant:

```text
year -> month -> day -> hour -> minute -> second
```

But `"s"` does not include an offset, so it is not enough when timezone/offset information must travel with the value.

`"u"` is the universal sortable pattern:

```text
yyyy-MM-dd HH:mm:ssZ
```

It produces a UTC-style stable output and is useful when you need sortable UTC text. The source notes that `u` is not usually the default for ASP.NET public APIs because JSON serializers already handle ISO 8601 well.

## 9. Round-trip / ISO format

`"O"` / `"o"` is the round-trip format.

For `DateTimeOffset`, it preserves enough information to round-trip the instant and offset:

```csharp
var dto = DateTimeOffset.UtcNow;
string text = dto.ToString("O");

var parsed = DateTimeOffset.ParseExact(
    text,
    "O",
    CultureInfo.InvariantCulture);
```

Typical shape:

```text
2026-04-20T14:35:06.0000000+00:00
```

Use `"O"` when you need a stable exact machine string that can be parsed back.

## 10. RFC 1123

Use RFC 1123 / `"R"` for HTTP-date style strings.

Typical consumers:

```text
HTTP headers
Last-Modified
Expires
```

Example:

```text
Tue, 17 Apr 2026 12:34:56 GMT
```

In .NET:

```csharp
var text = DateTimeOffset.UtcNow.ToString("R");
```

Do not use RFC 1123 for normal JSON bodies unless you have a specific reason. It is mainly an HTTP header format.

## 11. Unix time as a format choice

Unix time is a numeric timestamp, not a formatted local string.

Example:

```text
1736517600
```

It is seconds since the Unix epoch:

```text
1970-01-01T00:00:00Z
```

Use Unix time when:

```text
both sides are tightly controlled
you want compact numeric timestamps
you are doing frontend/client comparisons
you work with systems that already use epoch timestamps
```

Downsides:

```text
not human-readable
unit ambiguity: seconds vs milliseconds vs microseconds
no explicit timezone info in the value itself
easier for clients to misuse
```

If Unix time is used in an API, document the unit clearly:

```text
expiresAtUnixSeconds
expiresAtUnixMs
```

Do not leave it ambiguous.

## 12. Custom format tokens: date parts

Most useful date tokens:

```text
yyyy -> 4-digit year
yy   -> 2-digit year
M    -> month number
MM   -> zero-padded month
MMM  -> abbreviated month name
MMMM -> full month name
d    -> day number
dd   -> zero-padded day
ddd  -> abbreviated day name
dddd -> full day name
```

Examples:

```csharp
dt.ToString("yyyy");  // 2026
dt.ToString("yy");    // 26

dt.ToString("M");     // 4
dt.ToString("MM");    // 04
dt.ToString("MMM");   // Apr
dt.ToString("MMMM");  // April

dt.ToString("d");     // 2
dt.ToString("dd");    // 02
dt.ToString("ddd");   // Thu
dt.ToString("dddd");  // Thursday
```

## 13. Custom format tokens: time parts

24-hour clock:

```text
H  -> hour, 0-23
HH -> zero-padded hour, 00-23
```

12-hour clock:

```text
h  -> hour, 1-12
hh -> zero-padded hour, 01-12
```

Minutes and seconds:

```text
m  -> minute
mm -> zero-padded minute
s  -> second
ss -> zero-padded second
```

Examples:

```csharp
dt.ToString("HH:mm");    // 14:05
dt.ToString("hh:mm tt"); // 02:05 PM
```

Important: use `HH` for 24-hour time. Use `hh ... tt` for 12-hour time. Do not mix `HH` with `tt`.

## 14. Fractional seconds

`f` tokens require fractional-second digits:

```text
f       -> 1 digit
ff      -> 2 digits
fff     -> 3 digits / milliseconds
fffffff -> 7 digits
```

Example:

```csharp
dt.ToString("HH:mm:ss.fff"); // 14:05:06.123
```

`F` tokens are optional fractional-second digits. They print only significant digits and trim trailing zeros:

```text
F
FF
FFF
FFFFFFF
```

This is useful when you want fractions only when needed.

## 15. AM/PM, offset, era, separators, literals, escaping

AM/PM:

```text
tt -> AM/PM designator
```

Offset tokens:

```text
z   -> hour offset
zz  -> zero-padded hour offset
zzz -> hour and minute offset
```

Use offset tokens when formatting a `DateTimeOffset`, or a `DateTime` value with meaningful zone handling.

Era token:

```text
g -> era designator
```

Separators:

```text
: -> time separator
/ -> date separator
```

They use culture-specific separators in custom patterns.

Literal text can be put in quotes:

```csharp
dt.ToString("yyyy-MM-dd 'at' HH:mm:ss")
```

Escaping is needed when a character that is normally a format token should be treated as a literal.

Example:

```csharp
dt.ToString("yyyy-MM-dd'T'HH:mm:ss")
```

The quoted `T` is literal text, not a format token.

### Stage3 correction: escaping one character with backslash

During R04 boundary review, `S-158` was found to be a formatting screenshot, not timezone material.
It completes the custom-format escaping road.

Backslash escaping can make one normally meaningful format character literal:

```csharp
dt.ToString("HH\\h mm\\m ss\\s")
```

Output shape:

```text
14h 05m 06s
```

Without escaping, `h`, `m`, and `s` would be interpreted as formatting tokens.
Another example escapes literal colons:

```csharp
dt.ToString("yyyy-MM-ddTHH\\:mm\\:ss")
```

Meaning: `\\:` means literal colon.


## 16. Evidence table

| Source group | What it supports |
|---|---|
| S-104-S107 | Parse/TryParse vs ParseExact/TryParseExact and `TryParse` safety. |
| S-108-S117 | Standard formats, RFC 1123 `"R"`, custom ParseExact examples, DateTimeOffset parsing. |
| S-118-S128 | ToString formatting, ISO/O/s/u/R, sortable/universal sortable, why plain ToString is unsafe. |
| S-129-S133 | Useful tokens overview and quick examples. |
| S-134-S145 | Custom tokens: date parts, month/day, hour/minute/second, fractional seconds, AM/PM. |
| S-146-S160 | Offset, era, separators, literal text, escaping, backslash escaping, 12-hour AM/PM pitfalls. |
| S-201-S206 | ISO 8601, RFC 1123, Unix time format choice and when to use each. |

## 17. Open questions / follow-up hooks

- The next timezone/DST pass should reuse the `DateTimeKind.Unspecified` and offset-preservation warnings from R01/R03.
- R04 should decide when a value is an instant vs a user's local wall-clock time.
- When using Unix time in an API, always document whether the value is seconds or milliseconds.
