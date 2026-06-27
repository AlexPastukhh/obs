# ef migrations, dotnet-counters — final coverage transcript

Generated: 2026-06-27 UTC

## Source boundary

The source is a vector/text SVG with no embedded raster screenshots. The SVG text labels are the primary semantic source; vector paths are used only for grouping and flow.

## R01 — creating, applying, removing and listing EF migrations

A migration is created from model changes, then applied in order to bring the database schema to the target version. The standard workflow is to add a migration, review its generated operations, and apply it to the selected database. Listing migrations shows the known sequence; removing the last migration is safe only when it has not been applied or when the database has first been moved back appropriately.

Multiple unapplied migrations are normally applied in sequence. Problems arise when an intermediate migration is deleted, reordered, edited after deployment, or no longer matches the migration-history table. Treat deployed migrations as an append-only history unless a deliberate repair plan exists.

Running migrations automatically in application startup can be convenient in development but risky in production: several instances may race, the runtime identity may need excessive schema permissions, and a long migration can block startup or traffic. Production deployment usually benefits from an explicit migration step.

**Covered source labels:** `T-001, T-002, T-003, T-007, T-008, T-009, T-018, T-019, T-020, T-024, T-025, T-026, T-027`

## R02 — SQL scripts, idempotent scripts and migration bundles

Generating a migration script produces SQL from migrations; it does not create a new migration. A normal script targets a known source and target migration. An idempotent script includes checks against migration history so it can apply only migrations that are missing on a particular database.

A migration bundle packages migration execution into a deployable executable. A typical flow is: build the bundle from the migration project, deploy it with the required runtime/configuration, provide the target connection string or configuration, run it as a controlled deployment step, and record the result. Bundles are useful when the deployment environment should not install the full SDK or EF tooling.

Scripts and bundles should still be reviewed, backed up, tested on realistic data, and executed with an identity that has only the required schema permissions.

**Covered source labels:** `T-004, T-005, T-006, T-010, T-016, T-017, T-021, T-022, T-023`

## R03 — dotnet-counters and EF Core runtime signals

`dotnet-counters` attaches to a running .NET process, commonly selected by process ID, and displays runtime or provider counters. For EF Core, useful signals include query throughput, compiled-query cache hit rate, active context activity, SaveChanges activity, execution-strategy failures, and optimistic-concurrency failures, depending on the runtime and EF Core version.

Use the process-list command to identify the target, then monitor the relevant provider/counters for that PID. Counter names and availability can vary by version, so inspect the available counter set rather than hard-coding assumptions. A falling query-cache hit rate can indicate repeatedly changing query shapes; increasing concurrency failures can indicate genuine write contention or an incorrect version predicate.

**Covered source labels:** `T-011, T-012, T-013, T-014, T-015`

## Final takeaway

Every parsed SVG text label is mapped to a final semantic section. No label is closed by inventory alone; the transcript above resolves the questions and shorthand represented by the source labels.
