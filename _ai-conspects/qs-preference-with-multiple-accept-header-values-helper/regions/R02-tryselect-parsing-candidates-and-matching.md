# R02 - TrySelect parsing, candidates and matching

## Core idea

`TrySelect` is the helper flow that turns raw Accept header values into a selected supported representation.

Conceptual flow:

```text
read Accept header values
if missing/empty: use fallback
parse each media range
discard invalid or q=0 entries
match against supported types
rank matches
return selected result
```

## Missing Accept header

If there is no useful `Accept` header, common behavior is to use a default server representation.

Example:

```text
Accept absent
server default = application/json
selected = application/json
```

This is usually better than failing, because many clients do not send precise Accept values.

## Parsing

The helper should parse media ranges and parameters.

Examples:

```text
application/json
application/json;q=0.9
application/*;q=0.8
*/*;q=0.1
```

The parsed model should keep:

```text
type
subtype
parameters
q value
original order/index
```

Original order is useful as a final tie-breaker.

## Invalid syntax

Invalid Accept values should not crash controller code.

The helper can either ignore invalid values or return a structured invalid result depending on policy.

For a robust API helper, the usual approach is:

```text
skip invalid candidate
continue with valid candidates
fail only if no valid acceptable supported representation remains
```

## q=0 filtering

`q=0` means the client explicitly says the media range is not acceptable.

So candidates like:

```text
application/json;q=0
```

must not be selected.

This matters when a wildcard also appears.

Example:

```text
Accept: */*;q=0.8, application/json;q=0
```

The implementation must avoid choosing `application/json` through the wildcard if the specific type was explicitly excluded.

## Matching against supported types

Each parsed Accept candidate is matched against server-supported media types.

Possible matches:

```text
exact: application/json -> application/json
type wildcard: application/* -> application/json
global wildcard: */* -> application/json
structured suffix: application/*+json -> application/vnd.example+json
```

The helper should record match quality/specificity so ranking can be deterministic.

## Candidate list

A clean implementation builds a list of possible matches:

```text
accept candidate
supported media type
q value
specificity score
server preference index
header index
```

Then it sorts the list and picks the winner.

This is easier to test than mixing parsing, matching and selection in one block.

## Boundary note

R02 closes P01 by describing parsing and match candidate construction.

P02 should cover winner ordering, result building, HATEOAS flags, controller integration, edge cases and tests.
