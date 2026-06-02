# Stage 1 - Large Boundary Review

Generated: 2026-06-02 09:00:31 UTC


## v002 packaging note

```text
v002 keeps the same Stage1 boundary decisions as v001.
Only contact-sheet filenames were shortened to avoid Windows PowerShell Expand-Archive/path-length failures.
```

## Done

- Stage0 source materialization existed.
- Stage1 reviews the full source inventory in one large boundary pass.
- All **198 image uses** are assigned to candidate regions.
- No transcript is created here.

## Now

- Apply and review this archive.
- Commit if boundary split is acceptable.
- Treat candidate regions as provisional until each transcript pass visually rechecks its source images.

## Next

- First transcript batch: **CTXDB01 + CTXDB02**.
- Sources: **46 images**.
- Meaning: DatabaseFacade basics + automatic transactions/current transaction/savepoints.

```text
CTXDB01 -> S-001, S-003, S-005, S-010, S-014, S-016, S-019, S-024, S-034, S-038, S-044, S-046, S-048, S-049, S-051, S-058, S-059
CTXDB02 -> S-002, S-004, S-006, S-007, S-008, S-009, S-011, S-012, S-013, S-015, S-017, S-018, S-020, S-021, S-022, S-023, S-025, S-026, S-027, S-028, S-029, S-030, S-033, S-035, S-039, S-041, S-043, S-047, S-052
```

## Later

- CTXDB03 transcript: 57 images.
- CTXDB04 + CTXDB05 transcript: 52 images.
- CTXDB06 + CTXDB07 transcript: 43 images.
- Final closure/audit.

---

## Coverage checks

```text
Expected image uses: 198
Assigned to candidate regions: 198
Missing: 0
Duplicates: 0
Duplicated image definitions from Stage0: 0
```

## Candidate regions

### CTXDB01 - DatabaseFacade methods / connectivity / ensure-created-deleted / migrations
Source count: **17**
Sources:
```textS-001, S-003, S-005, S-010, S-014, S-016, S-019, S-024, S-034, S-038, S-044, S-046, S-048, S-049, S-051, S-058, S-059```
Meaning:
```textDatabaseFacade-style methods: CanConnect, EnsureCreated/Deleted, migrations, Migrate, GetPending/GetApplied migrations, HasPendingModelChanges.```
Subregions:
```textCTXDB01A: S-001, S-003, S-005, S-010, S-014, S-019, S-024CTXDB01B: S-016, S-034, S-038, S-044, S-046, S-048, S-049, S-051, S-058, S-059```
### CTXDB02 - Automatic transactions / CurrentTransaction / AutoSavepointsEnabled
Source count: **29**
Sources:
```textS-002, S-004, S-006, S-007, S-008, S-009, S-011, S-012, S-013, S-015, S-017, S-018, S-020, S-021, S-022, S-023, S-025, S-026, S-027, S-028, S-029, S-030, S-033, S-035, S-039, S-041, S-043, S-047, S-052```
Meaning:
```textAutoTransactionBehavior WhenNeeded/Always/Never, CurrentTransaction, AutoSavepointsEnabled, savepoint creation overhead, transaction methods around SaveChanges.```
Subregions:
```textCTXDB02A: S-004, S-012, S-015, S-021, S-025, S-028, S-030, S-033, S-035, S-041CTXDB02B: S-002, S-006, S-007, S-008, S-009, S-011, S-013, S-017, S-018, S-020, S-022, S-023, S-026, S-027, S-029, S-039, S-043, S-047, S-052```
### CTXDB03 - SaveChanges value generation / batching / performance / ChangeTracker.Clear / short-lived DbContext
Source count: **57**
Sources:
```textS-031, S-032, S-036, S-037, S-040, S-042, S-045, S-050, S-053, S-054, S-055, S-057, S-061, S-062, S-064, S-066, S-067, S-068, S-071, S-072, S-073, S-076, S-077, S-078, S-079, S-081, S-084, S-085, S-086, S-087, S-088, S-089, S-094, S-095, S-096, S-098, S-103, S-107, S-109, S-111, S-117, S-119, S-125, S-127, S-128, S-129, S-130, S-131, S-138, S-139, S-141, S-145, S-146, S-147, S-150, S-153, S-156```
Meaning:
```textGenerated values after SaveChanges, DB/provider generated IDs, computed columns, triggers, multiple SaveChanges, batching, long transaction performance, ChangeTracker.Clear and short-lived DbContext patterns.```
Subregions:
```textCTXDB03A: S-031, S-032, S-036, S-037, S-040, S-042, S-045, S-050, S-053, S-055, S-062, S-066, S-071, S-076, S-077, S-079, S-081CTXDB03B: S-054, S-057, S-061, S-064, S-067, S-068, S-072, S-073, S-078, S-084, S-085, S-086, S-087, S-088, S-089, S-094, S-095, S-096, S-098, S-103, S-107, S-109, S-111, S-117, S-119, S-125, S-127, S-128, S-129, S-130, S-131, S-138, S-139, S-141, S-145, S-146, S-147, S-150, S-153, S-156```
### CTXDB04 - SaveChanges transaction lifecycle / flush / rollback scope
Source count: **10**
Sources:
```textS-118, S-120, S-121, S-122, S-132, S-134, S-136, S-137, S-143, S-149```
Meaning:
```textWhere transaction lives around SaveChanges, rollback after DB write, flush/send query before next phase, query visibility inside transaction.```
Subregions:
```textCTXDB04A: S-118, S-120, S-122, S-132, S-134, S-136CTXDB04B: S-121, S-137, S-143, S-149```
### CTXDB05 - IDbContextTransaction / GetDbTransaction / UseTransaction / ADO.NET / shared local transaction
Source count: **42**
Sources:
```textS-056, S-060, S-063, S-065, S-069, S-070, S-075, S-080, S-083, S-090, S-097, S-099, S-102, S-105, S-108, S-112, S-115, S-123, S-124, S-133, S-135, S-142, S-158, S-161, S-162, S-164, S-165, S-166, S-167, S-168, S-170, S-171, S-172, S-173, S-174, S-175, S-177, S-179, S-180, S-181, S-183, S-184```
Meaning:
```textTransaction object, IDbContextTransaction, GetDbTransaction, provider-specific transaction access, raw ADO.NET commands, UseTransaction, sharing one local transaction between contexts or context + ADO.NET.```
Subregions:
```textCTXDB05A: S-056, S-060, S-063, S-065, S-069, S-070, S-075, S-080, S-083, S-090, S-097, S-099, S-102, S-105, S-108, S-112, S-115, S-123, S-124, S-133, S-135, S-142CTXDB05B: S-158, S-161, S-162, S-164, S-165, S-166, S-167, S-168, S-170, S-171, S-172, S-173, S-174, S-175, S-177, S-179, S-180, S-181, S-183, S-184```
### CTXDB06 - DbConnection / open connection / SetDbConnection / command timeout / provider helpers
Source count: **32**
Sources:
```textS-074, S-082, S-091, S-092, S-093, S-100, S-101, S-104, S-106, S-110, S-113, S-114, S-116, S-126, S-140, S-144, S-148, S-151, S-152, S-154, S-155, S-157, S-159, S-160, S-163, S-169, S-176, S-178, S-182, S-185, S-189, S-191```
Meaning:
```textGetDbConnection, OpenConnection, EF-managed connection, Get/SetConnectionString, SetDbConnection, context ownership of connection disposal, command timeout, EnlistTransaction, provider checks, GenerateCreateScript.```
Subregions:
```textCTXDB06A: S-074, S-082, S-091, S-092, S-093, S-100, S-101, S-104, S-106, S-110, S-113, S-114, S-116, S-126, S-140, S-144, S-148, S-151, S-152, S-154, S-155, S-157, S-159, S-160CTXDB06B: S-163, S-169, S-176, S-178, S-182, S-185, S-189, S-191```
### CTXDB07 - Manual DbContext creation / options / DI / multiple contexts
Source count: **11**
Sources:
```textS-186, S-187, S-188, S-190, S-192, S-193, S-194, S-195, S-196, S-197, S-198```
Meaning:
```textCreating contexts manually, contexts getting DbContextOptions, two different contexts, DI, context should accept options.```
Subregions:
```textCTXDB07A: S-186, S-188, S-192, S-195, S-197CTXDB07B: S-187, S-190, S-193, S-194, S-196, S-198```


---

## Recommended transcript batches

```text
NEXT01: CTXDB01 + CTXDB02 -> 46 images
NEXT02: CTXDB03 -> 57 images
NEXT03: CTXDB04 + CTXDB05 -> 52 images
NEXT04: CTXDB06 + CTXDB07 -> 43 images
```

## Important workflow note

```text
This boundary review is intentionally large.
Transcript archives can also be large, but each must preserve internal subregion boundaries.
Do not treat nearest labels as source of truth.
Each transcript subregion must reopen source images and recheck meaning visually.
```
