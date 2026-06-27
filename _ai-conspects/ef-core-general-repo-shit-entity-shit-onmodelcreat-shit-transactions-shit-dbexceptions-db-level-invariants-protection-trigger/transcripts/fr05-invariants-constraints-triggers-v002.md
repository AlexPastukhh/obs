# FR05 — Database invariants, constraints, keys, indexed views, procedures, and triggers

Generated: 2026-06-27 UTC

## Coverage boundary

```text
complete source SVG: source/source-complete-v002.svg
source SHA-256: 3f1f8d3f0594043679772ad71c5b40c553fea90716fc781ccf9241542a196efd
image uses assigned: 85
original uses rechecked: 5
recovered uses reviewed: 80
coverage level: source-level verified semantic transcript
```

## Verified semantic transcript

### Defense hierarchy

Put invariants in the strongest database mechanism that can express them directly. Use primary keys, unique indexes/constraints, foreign keys, `NOT NULL`, and `CHECK` before procedural logic. Application checks improve UX but do not close races; the database remains authoritative.

A `CHECK` constraint evaluates a predicate over the row being inserted or updated. It is suitable for ranges, date ordering, enum/status sets, and correlated fields in one row. It cannot directly express cross-row rules such as "no overlapping active booking anywhere." Name constraints explicitly so provider errors can be mapped to stable domain results.

### Uniqueness and keys

`HasIndex(...).IsUnique()` usually creates a unique index and duplicate operations commonly surface as SQL Server `2601`. `HasKey` and alternate-key/unique-constraint semantics commonly surface as `2627`. Composite unique indexes enforce uniqueness over a tuple. Alternate keys also serve as principal keys for relationships; a plain unique index does not by itself create those relationship semantics.

Foreign-key and check violations share SQL Server number `547`. The violated constraint name distinguishes the rule. Parent deletion, missing-parent inserts, invalid foreign-key updates, and invalid check states are all covered by this broad relational-rule code.

### Computed uniqueness and indexed views

A deterministic, indexable computed column can support uniqueness over a normalized value. First check whether collation already supplies the desired comparison semantics. An indexed view is primarily a performance feature: a schema-bound view with a unique clustered index materializes results. In narrow designs it can also enforce aggregate-style uniqueness, but it is a specialized tool rather than the first choice.

### Stored procedures, batches, and custom errors

A stored procedure can centralize a complex write invariant and `THROW` a stable custom number. Custom errors are not limited to procedures; a batch, trigger, or SQL `TRY/CATCH` can also throw or translate an error. Functions are not the normal place for side-effecting error logic.

### Triggers

SQL Server triggers are statement-level and must handle all rows in `inserted` and `deleted`. For an update, `deleted` contains old versions and `inserted` contains new versions. A set-based overlap trigger should compare all changed rows against existing active bookings and throw a stable error when intervals overlap. Triggers run after the triggering statement has passed ordinary constraints, so they are a last line of defense, not a substitute for simpler declarative constraints.

## Complete use mapping

| Use | Source set | Image | Coverage | Semantic role |
|---|---|---|---|---|
| `S-003` | `original-incomplete-svg-set` | `OLD-62853cad31` | `verified-semantic-transcript-final-v002` | Check-then-insert race for a unique email; application pre-checks do not replace a database uniqueness invariant. |
| `S-007` | `original-incomplete-svg-set` | `OLD-55ea344509` | `verified-semantic-transcript-final-v002` | Cross-column presence invariant: first and last name must be both null or both present. |
| `S-008` | `original-incomplete-svg-set` | `OLD-0f7c82eb0b` | `verified-semantic-transcript-final-v002` | Unique constraint/index as the authoritative defense against concurrent duplicate inserts. |
| `S-010` | `original-incomplete-svg-set` | `OLD-1e229933ef` | `verified-semantic-transcript-final-v002` | Model configuration combining owned-name columns with a database check constraint for correlated nullability. |
| `S-015` | `original-incomplete-svg-set` | `OLD-3dc7a29628` | `verified-semantic-transcript-final-v002` | Owned Email mapping plus a unique index on the owned column. |
| `NU-175` | `recovered-complete-svg-set` | `NIMG-058` | `verified-semantic-transcript-final-v002` | Computed-column indexability requirements: deterministic and indexable expressions only. |
| `NU-174` | `recovered-complete-svg-set` | `NIMG-172` | `verified-semantic-transcript-final-v002` | When transformed-value uniqueness is the right fit and example transformations. |
| `NU-171` | `recovered-complete-svg-set` | `NIMG-046` | `verified-semantic-transcript-final-v002` | Case-insensitive uniqueness problem for normalized email values. |
| `NU-054` | `recovered-complete-svg-set` | `NIMG-021` | `verified-semantic-transcript-final-v002` | Serializable isolation only protects an invariant when all relevant transactions express the invariant through DB reads/writes. |
| `NU-053` | `recovered-complete-svg-set` | `NIMG-168` | `verified-semantic-transcript-final-v002` | Recommended hierarchy: constraints, optimistic concurrency, integrity-error mapping, and transaction rollback. |
| `NU-172` | `recovered-complete-svg-set` | `NIMG-111` | `verified-semantic-transcript-final-v002` | SQL Server computed normalized column plus unique index solution. |
| `NU-176` | `recovered-complete-svg-set` | `NIMG-141` | `verified-semantic-transcript-final-v002` | Collation may already provide case-insensitive equality, making normalization unnecessary. |
| `NU-055` | `recovered-complete-svg-set` | `NIMG-022` | `verified-semantic-transcript-final-v002` | How serializable helps set/range invariants by preventing phantoms when the predicate can be locked. |
| `NU-074` | `recovered-complete-svg-set` | `NIMG-026` | `verified-semantic-transcript-final-v002` | Introduces database-level last-line-of-defense options. |
| `NU-059` | `recovered-complete-svg-set` | `NIMG-139` | `verified-semantic-transcript-final-v002` | Overview of primary key, unique, foreign key, NOT NULL and CHECK protections. |
| `NU-075` | `recovered-complete-svg-set` | `NIMG-151` | `verified-semantic-transcript-final-v002` | Native declarative constraints should be preferred where they can express the rule directly. |
| `NU-173` | `recovered-complete-svg-set` | `NIMG-030` | `verified-semantic-transcript-final-v002` | EF Core configuration for computed column and unique index. |
| `NU-177` | `recovered-complete-svg-set` | `NIMG-010` | `verified-semantic-transcript-final-v002` | Normalization must follow business semantics; trimming/casing choices affect what counts as equal. |
| `NU-060` | `recovered-complete-svg-set` | `NIMG-177` | `verified-semantic-transcript-final-v002` | Primary-key mapping for row identity and uniqueness. |
| `NU-076` | `recovered-complete-svg-set` | `NIMG-188` | `verified-semantic-transcript-final-v002` | Unique index on a deterministic computed column for transformed-value uniqueness. |
| `NU-056` | `recovered-complete-svg-set` | `NIMG-029` | `verified-semantic-transcript-final-v002` | Unsafe phantom example: check for no active booking and then insert. |
| `NU-061` | `recovered-complete-svg-set` | `NIMG-180` | `verified-semantic-transcript-final-v002` | Unique index for duplicate prevention without alternate-key semantics. |
| `NU-077` | `recovered-complete-svg-set` | `NIMG-117` | `verified-semantic-transcript-final-v002` | Filtered unique index for conditional uniqueness, such as one active row for a key. |
| `NU-057` | `recovered-complete-svg-set` | `NIMG-103` | `verified-semantic-transcript-final-v002` | Concurrent transaction performs the same check and insert, violating a cross-row invariant. |
| `NU-078` | `recovered-complete-svg-set` | `NIMG-116` | `verified-semantic-transcript-final-v002` | Trigger as a database-level option for complex cross-row logic. |
| `NU-062` | `recovered-complete-svg-set` | `NIMG-072` | `verified-semantic-transcript-final-v002` | Alternate key when the unique value must be a foreign-key target. |
| `NU-058` | `recovered-complete-svg-set` | `NIMG-158` | `verified-semantic-transcript-final-v002` | Safer serializable behavior: one transaction waits or fails instead of both committing overlapping rows. |
| `NU-079` | `recovered-complete-svg-set` | `NIMG-055` | `verified-semantic-transcript-final-v002` | Set-based trigger shape for INSERT/UPDATE/DELETE and overlap detection. |
| `NU-182` | `recovered-complete-svg-set` | `NIMG-053` | `verified-semantic-transcript-final-v002` | Introduces inserted and deleted pseudo-tables available inside triggers. |
| `NU-181` | `recovered-complete-svg-set` | `NIMG-138` | `verified-semantic-transcript-final-v002` | SQL Server triggers are statement-level, so implementations must handle multiple rows. |
| `NU-186` | `recovered-complete-svg-set` | `NIMG-052` | `verified-semantic-transcript-final-v002` | Overlapping-booking invariant that cannot be expressed by a normal unique index. |
| `NU-178` | `recovered-complete-svg-set` | `NIMG-185` | `verified-semantic-transcript-final-v002` | Trigger selected for custom cross-row invariant enforcement. |
| `NU-183` | `recovered-complete-svg-set` | `NIMG-148` | `verified-semantic-transcript-final-v002` | inserted contains new row versions for INSERT/UPDATE. |
| `NU-063` | `recovered-complete-svg-set` | `NIMG-149` | `verified-semantic-transcript-final-v002` | Foreign-key mapping for parent-existence and referential integrity. |
| `NU-187` | `recovered-complete-svg-set` | `NIMG-063` | `verified-semantic-transcript-final-v002` | RoomBookings table shape used by the overlap example. |
| `NU-179` | `recovered-complete-svg-set` | `NIMG-190` | `verified-semantic-transcript-final-v002` | Trigger execution events: INSERT, UPDATE and DELETE. |
| `NU-082` | `recovered-complete-svg-set` | `NIMG-187` | `verified-semantic-transcript-final-v002` | Stored procedure as a write boundary that validates and throws a custom SQL error. |
| `NU-080` | `recovered-complete-svg-set` | `NIMG-088` | `verified-semantic-transcript-final-v002` | Advanced options around indexed views and custom database errors. |
| `NU-184` | `recovered-complete-svg-set` | `NIMG-043` | `verified-semantic-transcript-final-v002` | deleted contains old/removed row versions for DELETE/UPDATE. |
| `NU-083` | `recovered-complete-svg-set` | `NIMG-081` | `verified-semantic-transcript-final-v002` | End-to-end stored-procedure error flow from SQL condition to application error mapping. |
| `NU-180` | `recovered-complete-svg-set` | `NIMG-083` | `verified-semantic-transcript-final-v002` | Trigger attaches to a table and executes after a qualifying statement. |
| `NU-064` | `recovered-complete-svg-set` | `NIMG-084` | `verified-semantic-transcript-final-v002` | NOT NULL and CHECK constraints for required values and row-level predicates. |
| `NU-188` | `recovered-complete-svg-set` | `NIMG-056` | `verified-semantic-transcript-final-v002` | CHECK(StartTime < EndTime) validates one row but does not prevent overlap across rows. |
| `NU-081` | `recovered-complete-svg-set` | `NIMG-066` | `verified-semantic-transcript-final-v002` | Indexed views are primarily performance objects but can enforce special aggregate-style uniqueness when schema-bound and uniquely indexed. |
| `NU-185` | `recovered-complete-svg-set` | `NIMG-124` | `verified-semantic-transcript-final-v002` | For UPDATE triggers, deleted contains the old row version and inserted contains the new row version. |
| `NU-084` | `recovered-complete-svg-set` | `NIMG-086` | `verified-semantic-transcript-final-v002` | Stored procedure write boundary that throws a stable custom SQL error for an overlap invariant. |
| `NU-189` | `recovered-complete-svg-set` | `NIMG-006` | `verified-semantic-transcript-final-v002` | SQL Server trigger definition for preventing overlapping room bookings. |
| `NU-065` | `recovered-complete-svg-set` | `NIMG-093` | `verified-semantic-transcript-final-v002` | Check constraints express row-local SQL predicates. |
| `NU-192` | `recovered-complete-svg-set` | `NIMG-120` | `verified-semantic-transcript-final-v002` | In a trigger definition AS starts the trigger body; it is not an alias. |
| `NU-066` | `recovered-complete-svg-set` | `NIMG-012` | `verified-semantic-transcript-final-v002` | EF Core HasCheckConstraint examples for totals, enum/status values, and date ordering. |
| `NU-190` | `recovered-complete-svg-set` | `NIMG-135` | `verified-semantic-transcript-final-v002` | Set-based trigger overlap test joining inserted rows to existing bookings. |
| `NU-085` | `recovered-complete-svg-set` | `NIMG-108` | `verified-semantic-transcript-final-v002` | Application catches a custom SqlException number from ExecuteSqlRaw and maps it to a domain result. |
| `NU-191` | `recovered-complete-svg-set` | `NIMG-132` | `verified-semantic-transcript-final-v002` | Trigger throws a stable custom error when active bookings overlap. |
| `NU-067` | `recovered-complete-svg-set` | `NIMG-047` | `verified-semantic-transcript-final-v002` | Capabilities and limits of check constraints: row-local rules yes, cross-row/table rules no. |
| `NU-086` | `recovered-complete-svg-set` | `NIMG-027` | `verified-semantic-transcript-final-v002` | Custom SQL errors can be raised from batches, procedures, triggers, or TRY/CATCH; they are not procedure-only. |
| `NU-068` | `recovered-complete-svg-set` | `NIMG-095` | `verified-semantic-transcript-final-v002` | When check constraints are insufficient and a unique index, schema redesign, or transaction logic is required. |
| `NU-087` | `recovered-complete-svg-set` | `NIMG-071` | `verified-semantic-transcript-final-v002` | Simplest custom SQL error in a plain batch using THROW. |
| `NU-193` | `recovered-complete-svg-set` | `NIMG-122` | `verified-semantic-transcript-final-v002` | Normal view stores only a query definition and is expanded when queried. |
| `NU-088` | `recovered-complete-svg-set` | `NIMG-105` | `verified-semantic-transcript-final-v002` | Stored procedure example that validates and throws a custom business-rule error. |
| `NU-194` | `recovered-complete-svg-set` | `NIMG-146` | `verified-semantic-transcript-final-v002` | Indexed view materializes results through a unique clustered index and can support special uniqueness patterns. |
| `NU-089` | `recovered-complete-svg-set` | `NIMG-061` | `verified-semantic-transcript-final-v002` | Trigger example that raises a custom error as a database last line of defense. |
| `NU-090` | `recovered-complete-svg-set` | `NIMG-040` | `verified-semantic-transcript-final-v002` | SQL TRY/CATCH can rethrow or translate an execution error to a custom number. |
| `NU-091` | `recovered-complete-svg-set` | `NIMG-091` | `verified-semantic-transcript-final-v002` | User-defined functions are not the normal place for side-effecting custom error logic. |
| `NU-092` | `recovered-complete-svg-set` | `NIMG-059` | `verified-semantic-transcript-final-v002` | Practical placement rule for custom database errors: stored procedure, trigger, batch, or TRY/CATCH. |
| `NU-143` | `recovered-complete-svg-set` | `NIMG-032` | `verified-semantic-transcript-final-v002` | SQL Server 2627 covers primary-key or unique-constraint violations. |
| `NU-137` | `recovered-complete-svg-set` | `NIMG-171` | `verified-semantic-transcript-final-v002` | SQL Server 2601 means a duplicate value in a unique index. |
| `NU-138` | `recovered-complete-svg-set` | `NIMG-036` | `verified-semantic-transcript-final-v002` | HasIndex(...).IsUnique() is the EF mapping that commonly produces 2601. |
| `NU-144` | `recovered-complete-svg-set` | `NIMG-179` | `verified-semantic-transcript-final-v002` | HasKey configuration that maps to a relational primary key. |
| `NU-139` | `recovered-complete-svg-set` | `NIMG-020` | `verified-semantic-transcript-final-v002` | Insert/update duplicate examples for a unique index. |
| `NU-145` | `recovered-complete-svg-set` | `NIMG-184` | `verified-semantic-transcript-final-v002` | Duplicate primary-key insert example producing 2627. |
| `NU-140` | `recovered-complete-svg-set` | `NIMG-100` | `verified-semantic-transcript-final-v002` | Updating a row to a duplicate unique-index value can produce 2601. |
| `NU-146` | `recovered-complete-svg-set` | `NIMG-147` | `verified-semantic-transcript-final-v002` | HasAlternateKey introduces alternate-key/unique-constraint semantics and can produce 2627. |
| `NU-141` | `recovered-complete-svg-set` | `NIMG-152` | `verified-semantic-transcript-final-v002` | Race condition where both requests pass an application pre-check but one loses at the unique index. |
| `NU-147` | `recovered-complete-svg-set` | `NIMG-079` | `verified-semantic-transcript-final-v002` | Duplicate alternate-key value example. |
| `NU-142` | `recovered-complete-svg-set` | `NIMG-035` | `verified-semantic-transcript-final-v002` | Composite unique index and duplicate composite-key example. |
| `NU-151` | `recovered-complete-svg-set` | `NIMG-114` | `verified-semantic-transcript-final-v002` | SQL Server 547 is shared by foreign-key and check-constraint violations. |
| `NU-148` | `recovered-complete-svg-set` | `NIMG-018` | `verified-semantic-transcript-final-v002` | Update to a duplicate alternate-key value can produce 2627. |
| `NU-152` | `recovered-complete-svg-set` | `NIMG-127` | `verified-semantic-transcript-final-v002` | EF HasForeignKey mapping associated with a 547 foreign-key violation. |
| `NU-149` | `recovered-complete-svg-set` | `NIMG-102` | `verified-semantic-transcript-final-v002` | Using a non-primary principal key in a relationship introduces alternate-key semantics. |
| `NU-150` | `recovered-complete-svg-set` | `NIMG-166` | `verified-semantic-transcript-final-v002` | HasPrincipalKey/HasForeignKey example and duplicate alternate-key value. |
| `NU-153` | `recovered-complete-svg-set` | `NIMG-077` | `verified-semantic-transcript-final-v002` | Insert child with a missing parent produces 547. |
| `NU-154` | `recovered-complete-svg-set` | `NIMG-175` | `verified-semantic-transcript-final-v002` | Update a foreign key to a missing parent produces 547. |
| `NU-155` | `recovered-complete-svg-set` | `NIMG-024` | `verified-semantic-transcript-final-v002` | Delete or alter a parent while dependents still reference it can produce 547. |
| `NU-156` | `recovered-complete-svg-set` | `NIMG-150` | `verified-semantic-transcript-final-v002` | EF HasCheckConstraint mapping associated with a 547 check violation. |
| `NU-157` | `recovered-complete-svg-set` | `NIMG-119` | `verified-semantic-transcript-final-v002` | Insert or update a row into an invalid check-constraint state produces 547. |

## Candidate and boundary checks

- Every listed use is present in `data/full-use-coverage-v002.csv` and has exactly one primary final region.
- Duplicate placements are linked to a reviewed primary use by identical Excalidraw `fileId`.
- Exact code punctuation remains recoverable from the preserved PNG and complete SVG.
- No label-only assumption closes an image: the image itself was reviewed or explicitly excluded.

## Region status

```text
assigned uses: 85
unresolved uses: 0
unmapped uses: 0
```
