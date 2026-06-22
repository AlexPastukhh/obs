# R04 - Controller integration / edge cases / tests

Generated: 2026-06-13 09:03:25 UTC

## Core idea

The controller should use the negotiation helper as a small decision layer.

Typical flow:

```text
read Accept header
call TrySelect
if no acceptable representation: return 406 or fallback depending on policy
use selected result to choose response shape/media type
return response
```

The controller should not duplicate parsing, q-value handling or specificity logic.

## Controller integration

A clean controller integration can look conceptually like:

```text
var selected = acceptPreference.TrySelect(headers.Accept, supportedTypes);

if (!selected.Success)
    return StatusCode(406);

return selected.IncludeLinks
    ? linkedDto response
    : plainDto response;
```

The exact code may differ, but the controller should receive a clear result.

## 406 policy

If the client explicitly requests only unsupported media types, the API can return:

```text
406 Not Acceptable
```

This is especially important when there is no acceptable supported representation.

Example:

```text
Accept: application/xml
server supports only application/json
```

If strict negotiation is enabled, return 406.

## Fallback policy

Some APIs choose to fall back to JSON when Accept is absent or broad.

Example:

```text
Accept missing
Accept: */*
```

Fallback is reasonable when the client did not express a precise unsupported demand.

The helper should distinguish:

```text
missing/broad Accept -> default may be fine
specific unsupported Accept -> maybe 406
```

## Edge cases

Important cases to test:

```text
multiple Accept values
same q different specificity
wildcard with exact exclusion q=0
unsupported exact type
structured suffix +json
server preference tie-break
header order tie-break
missing Accept
invalid Accept fragment
```

## q=0 exclusion edge case

The most dangerous subtle case is:

```text
Accept: */*;q=0.8, application/json;q=0
```

If the helper simply matches wildcard to JSON, it may incorrectly return JSON.

Specific q=0 exclusions must be respected.

## Tests

Useful unit tests should assert:

```text
selected media type
success/failure
includeLinks flag
primary media type/family
no-match reason
tie-break behavior
```

The helper should be testable without ASP.NET controller infrastructure.

## Separation of concerns

Keep responsibilities separate:

```text
helper = parse/match/rank/select
controller = call helper and choose response action
serializer/output formatter = actual serialization
```

This prevents negotiation logic from becoming controller-specific.

## Boundary note

R04 closes the Accept helper conspect.

After R03/R04, the only remaining step is final coverage audit.
