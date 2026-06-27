# ef migrations, dotnet-counters — full corrected-SVG semantic reconciliation v002

Generated: 2026-06-27 UTC

## Source policy

Screenshots are the primary source. Candidate regions, nearest labels, and vector paths were used only as navigation hints. Every embedded screenshot was visually reviewed before region assignment.

## R01 — Applying migrations from code and production safety

Database.MigrateAsync creates the database when necessary and applies pending EF Core migrations. Automatic startup migration is convenient for local development and simple tools, but production risks include concurrent instances, long startup blocking, unavailable databases and unreviewed destructive changes. Production usually favors reviewed scripts, bundles or a dedicated deployment step.

**Reviewed image uses:** S-001, S-002, S-003, S-004, S-005, S-006

**Assigned SVG text nodes:** T-001, T-002, T-003, T-004, T-005

## R02 — EF migration CLI workflow: add, update, remove, and list

dotnet ef migrations add captures model changes into a new migration; dotnet ef database update applies pending migrations or targets a named migration. migrations list shows project migrations. migrations remove removes only the latest unapplied migration; an applied migration should first be rolled back with database update.

**Reviewed image uses:** S-007, S-008, S-009, S-010, S-011

**Assigned SVG text nodes:** T-006, T-007, T-008, T-009, T-010, T-011, T-012, T-013

## R03 — SQL migration scripts and idempotent deployment

dotnet ef migrations script generates SQL from an empty database or one migration to another; it does not create a migration. An idempotent script consults __EFMigrationsHistory and applies only missing migrations, which is useful when target environments may be at different versions.

**Reviewed image uses:** S-012, S-013, S-014, S-015, S-016, S-017

**Assigned SVG text nodes:** T-014, T-015, T-016, T-017, T-018, T-019

## R04 — Migration bundles and deployment flow

A migration bundle is a deployable executable migration runner. Create migrations in the source project, build the bundle, publish it as an artifact, then run it with the production connection string. The bundle reads migration history and applies pending migrations without requiring the full SDK or source tree on the server.

**Reviewed image uses:** S-018, S-019, S-020, S-021, S-022, S-023, S-024, S-025, S-026, S-027, S-028

**Assigned SVG text nodes:** T-020, T-021, T-022

## R05 — dotnet-counters installation, process selection, and monitoring

dotnet-counters installs as a .NET diagnostic tool and attaches to a running process by PID. Monitoring Microsoft.EntityFrameworkCore counters reveals live EF behavior; choose the actual application process rather than an IDE helper or unrelated runtime process.

**Reviewed image uses:** S-029, S-030, S-031, S-032

**Assigned SVG text nodes:** T-023, T-024

## R06 — EF Core runtime counters and diagnostic interpretation

Useful EF Core counters include active DbContexts, queries, query-cache hit rate, SaveChanges calls, execution-strategy failures and optimistic-concurrency failures. High query counts can indicate N+1 work; a low cache hit rate can reveal constantly changing query shapes; many SaveChanges calls can reveal missed batching opportunities.

**Reviewed image uses:** S-033, S-034, S-035, S-036, S-037

**Assigned SVG text nodes:** T-025, T-026, T-027


## Closure

```text
embedded assets: 37
total image uses: 37
processed image uses: 37
restored image uses: 37
duplicate placements: 0
SVG text nodes: 27
processed SVG text nodes: 27
unassigned images: 0
multiply assigned images: 0
unassigned text nodes: 0
missing: 0
unreviewed: 0
```
