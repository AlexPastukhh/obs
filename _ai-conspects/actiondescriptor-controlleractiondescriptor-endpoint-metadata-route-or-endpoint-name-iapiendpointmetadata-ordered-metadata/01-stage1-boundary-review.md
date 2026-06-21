# Stage 1 - Boundary Review

Generated: 2026-06-13 08:53:27 UTC

## Done

- Stage0 source materialization existed.
- Stage1 reviews all **36 image uses**.
- All images are assigned to candidate regions.
- All **9 text labels** are assigned to candidate regions.
- Duplicate embedded-image uses by fileId_short: **0**.
- No transcript is created here.
- This archive intentionally does **not** duplicate Stage0 source PNGs.

## Now

- Apply and review this archive.
- Commit if boundary split is acceptable.
- Treat candidate regions as provisional until transcript visually rechecks each source image.

## Next

Recommended transcript batches:

```text
NEXT01: AEM01 = 16 image uses
NEXT02: AEM02 + AEM03 = 20 image uses
```

## Coverage checks

```text
Expected image uses: 36
Assigned to candidate regions: 36
Missing: 0
Duplicates: 0
Extra: 0
Text labels: 9
Text labels assigned: 9
Text labels missing: 0
Text label duplicates: 0
Duplicate image uses by fileId_short: 0
```

## Candidate regions

### AEM01 - ActionDescriptor and ControllerActionDescriptor in MVC/filter context
Source count: **16**
Sources:
```text
S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-017, S-018, S-019, S-020, S-021, S-022, S-023, S-024, S-025
```
Text labels:
```text
T-001: Action descriptor
T-002: using methodinfo/method info from
T-003: ctoractiondescriptor
T-004: actionsesscriptor vs ctoraction descr
T-007: iendpointnamemetadata
T-008: iroutenamemetadata
```
Meaning:
```text
MVC ActionDescriptor/ControllerActionDescriptor: what it contains, how action filters see it, MethodInfo usage, route values, ControllerActionDescriptor-specific properties, and endpoint-name/route-name metadata questions around MVC actions.
```
Subregions:
```text
AEM01A: S-021, S-022, S-023, S-024, S-025
AEM01B: S-001, S-002, S-003, S-004, S-005, S-006, S-007
AEM01C: S-017, S-018, S-019, S-020
```
### AEM02 - Endpoint metadata, MVC endpoint metadata, RouteEndpoint and IApiEndpointMetadata
Source count: **15**
Sources:
```text
S-008, S-009, S-010, S-011, S-012, S-013, S-014, S-015, S-016, S-026, S-027, S-028, S-029, S-030, S-031
```
Text labels:
```text
T-005: endpoint metadata
T-009: IApiEndpointMetadata
```
Meaning:
```text
Endpoint metadata as the unified endpoint-routing metadata bag: what metadata can be read, MVC endpoint examples, metadata from MapGet/WithMetadata/WithTags, minimal APIs vs MVC endpoint metadata, and IApiEndpointMetadata used by API Explorer/OpenAPI-oriented metadata.
```
Subregions:
```text
AEM02A: S-008, S-009, S-010
AEM02B: S-011, S-012, S-013, S-014, S-015, S-016
AEM02C: S-026, S-027, S-028, S-029, S-030, S-031
```
### AEM03 - Ordered metadata and ordered endpoint metadata lookup
Source count: **5**
Sources:
```text
S-032, S-033, S-034, S-035, S-036
```
Text labels:
```text
T-006: ordered metadata
```
Meaning:
```text
Ordered endpoint metadata behavior: metadata collection order, GetMetadata<T>(), reading ordered metadata from the endpoint, how authentication/authorization/CORS examples depend on ordered metadata, and why order matters practically.
```
Subregions:
```text
AEM03A: S-032, S-033, S-034
AEM03B: S-035, S-036
```


## Important workflow note

```text
This is a boundary review, not a transcript.
Inventory/contact sheets are checklists, not source of truth.
The transcript pass must reopen source images and recheck meaning visually.
Nearest labels are coordinate hints only.
This Stage1 archive intentionally does not duplicate source PNGs from Stage0.
```
