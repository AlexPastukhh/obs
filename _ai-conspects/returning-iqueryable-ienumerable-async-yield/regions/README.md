# Regions - returning-iqueryable-ienumerable-async-yield

Boundary-reviewed candidate regions:

```text
RIQ01 - IQueryable as public API / leaky abstraction / repository boundary
RIQ02 - Returning IEnumerable without ToList / materialization boundary
RIQ03 - Multiple enumeration hazards for IEnumerable
RIQ04 - Async enumerable repeated enumeration / caching / single-use streams
RIQ05 - Yield / iterator cleanup / finally restrictions
```

Recommended transcript order:

```text
NEXT01: full transcript for RIQ01 + RIQ02 + RIQ03 + RIQ04 + RIQ05
```

Each transcript must include:

```text
## 0.1 Area overview / key ideas / reading quality
## 0.2 Coverage / boundary review
```
