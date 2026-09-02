# Knowledge Registry

Source workspace: `_ai-conspects/time/`

Authoritative processed sources: `regions/R01-core-types-offset-ticks-unix-js.md`, `regions/R03-parsing-formatting-cheat-sheets.md`, `regions/R04-timezones-conversion-json-model-binding-dst.md`, and `regions/R05-invalid-ambiguous-time-policies.md`; completion certified by `CURRENT_SOURCE_OF_TRUTH.md` and `05-stage5-final-coverage-audit.md`.

Original SVG: `source/time.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Common API/model rules; DateTime, DateTimeOffset, TimeSpan, DateOnly, and TimeOnly semantics and selection guide (R01 sections 1-3) | `dotnet.time-types-and-model-selection` | `dotnet` | `../_knowledge/dotnet/time-types-and-model-selection.md` | MAPPED |
| Offset and LocalDateTime semantics, Kind/SpecifyKind, conversion, comparison, expiration, addition, and subtraction (R01 sections 4-6) | `dotnet.datetime-offset-kind-conversion-and-arithmetic` | `dotnet` | `../_knowledge/dotnet/datetime-offset-kind-conversion-and-arithmetic.md` | MAPPED |
| .NET ticks versus Unix time, backend/frontend interop, and JavaScript locale display (R01 sections 7-9) | `dotnet.ticks-unix-time-and-javascript-display` | `dotnet` | `../_knowledge/dotnet/ticks-unix-time-and-javascript-display.md` | MAPPED |
| Flexible versus exact parsing, DateTime/DateTimeOffset parsing, and standard exact formats (R03 sections 1-4) | `dotnet.datetime-parsing-exactness-and-standard-formats` | `dotnet` | `../_knowledge/dotnet/datetime-parsing-exactness-and-standard-formats.md` | MAPPED |
| Custom date/time formats, standard output, round-trip/ISO/RFC1123, Unix representation, tokens, fractional seconds, literals, separators, and S158 escape correction (R03 sections 5-15) | `dotnet.format-strings-culture-and-round-trip` | `dotnet` | `../_knowledge/dotnet/format-strings-culture-and-round-trip.md` | MERGED |
| UTC/local conversion, offset-versus-zone boundary, user-zone conversion, ASP.NET Core JSON, and model binding (R04 sections 1-5) | `dotnet.timezone-conversion-json-and-model-binding` | `dotnet` | `../_knowledge/dotnet/timezone-conversion-json-and-model-binding.md` | MAPPED |
| Date-math pitfalls, wall-clock reconstruction, monthly schedules, calendar dates, Kind with explicit zones, and DST checks (R04 sections 6-11) | `dotnet.timezone-date-math-and-dst` | `dotnet` | `../_knowledge/dotnet/timezone-date-math-and-dst.md` | MAPPED |
| Invalid local-time gaps and move-forward/skip/move-backward/reject policies (R05 sections 1-5) | `dotnet.invalid-local-time-resolution-policies` | `dotnet` | `../_knowledge/dotnet/invalid-local-time-resolution-policies.md` | MAPPED |
| Ambiguous overlaps, earlier/later/once/twice policies, diagnostics, audit, scheduling delays, and resolver shape (R05 sections 6-14) | `dotnet.ambiguous-local-time-scheduling-and-audit` | `dotnet` | `../_knowledge/dotnet/ambiguous-local-time-scheduling-and-audit.md` | MAPPED |
| Boundary plans, image inventories, evidence tables, open follow-up hooks, archive manifests, and final coverage audit | — | — | — | NON_LEARNING |

## Boundary decisions

- The source is partitioned by representation, conversion, parsing/formatting, timezone arithmetic, and DST-policy boundaries rather than by screenshot batches.
- General date/time formatting extends the existing format-string unit; all other central models receive independent units.
- Evidence tables and processing hooks are excluded, while all verified learning sections and the S158 correction remain represented.

| Status | Count |
|---|---:|
| MAPPED | 8 |
| MERGED | 1 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
