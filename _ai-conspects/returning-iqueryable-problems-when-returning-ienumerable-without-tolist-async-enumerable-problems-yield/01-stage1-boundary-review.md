# Stage 1 - Boundary Review

Generated: 2026-06-02 15:50:10 UTC

## Done

- Stage0 source materialization existed.
- Stage1 reviews all **44 image uses**.
- All images are assigned to candidate regions.
- All **17 text labels** are assigned to candidate regions.
- No duplicate image-use hashes were found.
- No transcript is created here.
- This archive intentionally does **not** duplicate Stage0 source PNGs.

## Now

- Apply and review this archive.
- Commit if boundary split is acceptable.
- Treat candidate regions as provisional until transcript visually rechecks each source image.

## Next

- **NEXT01 full transcript**.
- Sources: **44 image uses**.
- Meaning: process the whole returning-IQueryable/IEnumerable/async-yield conspect in one archive, but keep internal boundaries:
  - RIQ01 IQueryable public API / leaky abstraction
  - RIQ02 returning IEnumerable without ToList / materialization boundary
  - RIQ03 multiple enumeration hazards
  - RIQ04 async enumerable repeated enumeration / caching / single-use streams
  - RIQ05 yield / iterator cleanup / finally restrictions

## Coverage checks

```text
Expected image uses: 44
Assigned to candidate regions: 44
Missing: 0
Duplicates: 0
Extra: 0
Text labels: 17
Text labels assigned: 17
Text labels missing: 0
Text label duplicates: 0
Duplicate image uses by fileId_short: 0
```

## Candidate regions

### RIQ01 - IQueryable as public API / leaky abstraction / repository boundary
Source count: **11**
Sources:
```text
S-021, S-022, S-023, S-024, S-025, S-026, S-027, S-028, S-029, S-030, S-031
```
Text labels:
```text
T-002: Had to call tolist above to do select
T-003: client should keep in mind
T-004: So there is no limitation on linq expressions
```
Meaning:
```text
IQueryable and LINQ in repository/public API: leaky abstraction, arbitrary expressions, EF Core implementation details leaking, alternative IEnumerable interface, filtering arguments, and design-by-contract discussion.
```
Subregions:
```text
RIQ01A: S-021, S-022, S-023, S-024, S-025, S-026, S-027
RIQ01B: S-028, S-029, S-030, S-031
```
### RIQ02 - Returning IEnumerable without ToList / materialization boundary
Source count: **12**
Sources:
```text
S-012, S-013, S-014, S-015, S-016, S-017, S-018, S-019, S-020, S-032, S-033, S-034
```
Text labels:
```text
T-001: so when we return ienumerable without tolist
T-005: When you return IEnumerable it is not
T-006: When you call toList(), expression start to
T-012: so we have 2 types of scenarios
T-013: what if we have called to list
```
Meaning:
```text
Returning IEnumerable<T> while query is still deferred: when it is okay, when ToList materializes inside the method, LINQ after return no longer composes to SQL, IEnumerator model, lazy evaluation, and disposed DbContext risk.
```
Subregions:
```text
RIQ02A: S-012, S-013, S-014, S-015, S-016, S-017, S-018, S-019, S-020
RIQ02B: S-032, S-033, S-034
```
### RIQ03 - Multiple enumeration hazards for IEnumerable
Source count: **11**
Sources:
```text
S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010, S-011
```
Text labels:
```text
T-007: disposing db context inside method
T-008: hidden db query outside rep boundary
T-009: sometimes partial enumeration can
T-010: repeated side effects
T-011: dif results on each enumeration
```
Meaning:
```text
Problems caused by enumerating deferred IEnumerable sequences multiple times: repeated side effects, partial enumeration changing behavior, hidden database queries outside repository boundary, disposed resources, different results on each enumeration, and expensive work repeated.
```
Subregions:
```text
RIQ03A: S-006, S-007, S-008, S-009, S-010, S-011
RIQ03B: S-001, S-002, S-003, S-004, S-005
```
### RIQ04 - Async enumerable repeated enumeration / caching / single-use streams
Source count: **6**
Sources:
```text
S-035, S-036, S-037, S-038, S-039, S-040
```
Text labels:
```text
T-014: what about async enumerable
```
Meaning:
```text
IEnumerable and IAsyncEnumerable deferred sequence behavior: foreach/await foreach reruns logic, ToList/ToListAsync caches once, repeated async enumeration can repeat database calls/HTTP/delays/streams, and some async enumerables should be treated as single-use.
```
Subregions:
```text
RIQ04A: S-035, S-036
RIQ04B: S-037, S-038, S-039, S-040
```
### RIQ05 - Yield / iterator cleanup / finally restrictions
Source count: **4**
Sources:
```text
S-041, S-042, S-043, S-044
```
Text labels:
```text
T-015: just not an immediate cleanup, nothing immportant
T-016: getrnumerator
T-017: !!!
```
Meaning:
```text
C# iterator and async iterator cleanup semantics: yield return restrictions in catch/finally, early stop disposal, finally cleanup, GetEnumerator/Dispose behavior, and async iterator finally behavior.
```
Subregions:
```text
RIQ05A: S-041, S-042
RIQ05B: S-043, S-044
```


## Important workflow note

```text
This is a boundary review, not a transcript.
Inventory/contact sheets are checklists, not source of truth.
The transcript pass must reopen source images and recheck meaning visually.
Nearest labels are coordinate hints only.
This Stage1 archive intentionally does not duplicate source PNGs from Stage0.
```
