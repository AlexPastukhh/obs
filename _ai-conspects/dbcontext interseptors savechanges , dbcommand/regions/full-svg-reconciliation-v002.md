# dbcontext interseptors savechanges , dbcommand — full corrected-SVG semantic reconciliation v002

Generated: 2026-06-27 UTC

The complete corrected SVG and recovered screenshots are the primary source. Candidate regions, vector paths, and nearest labels were used only as navigation hints. Every screenshot was visually reviewed before final region assignment. Existing label-only materials remain preserved but are superseded as the current source interpretation.

# R01 — SaveChanges lifecycle, event data, and successful-save auditing

SaveChanges interception has distinct before, after, failure, concurrency, and cancellation phases. `SavingChanges`/`SavingChangesAsync` receive `DbContextEventData` and an `InterceptionResult<int>` before SQL is sent, so they can inspect the current context and `ChangeTracker`, apply audit timestamps, or prepare validation. `SavedChanges`/`SavedChangesAsync` receive `SaveChangesCompletedEventData` and the affected-row result after the database work succeeds. Those post-save callbacks are suitable for logging, metrics, and publishing a successful outcome, but they cannot retroactively undo a write that already happened.

**Reviewed image uses:** S-003, S-004, S-008, S-009, S-013, S-015, S-018, S-019, S-021

**Assigned SVG text nodes:** T-001, T-009


# R02 — Save suppression, alternate results, and side-channel outcome reporting

Suppression belongs in the pre-save callback. Returning `InterceptionResult<int>.SuppressWithResult(value)` from `SavingChanges` or `SavingChangesAsync` skips the normal EF save pipeline and makes the caller receive that integer result. An after-save callback can replace the returned integer with another integer, but it cannot change the method's public return type or erase completed database work. If application code must know why a save was suppressed, use an explicit scoped outcome/marker service or another domain-level side channel rather than relying on a negative count convention. Suppressing the whole save is powerful and should be reserved for deliberate workflows with a clear alternate result.

**Reviewed image uses:** S-001, S-005, S-007, S-014, S-030, S-037, S-056, S-057

**Assigned SVG text nodes:** T-003, T-004, T-005, T-006, T-011, T-016


# R03 — Save failure, optimistic-concurrency, and cancellation callbacks

`SaveChangesFailed`/`SaveChangesFailedAsync` run when SaveChanges throws and expose the context and exception. `ThrowingConcurrencyException`/Async run before EF throws `DbUpdateConcurrencyException`; their event data can include the entries involved in the conflict. If the concurrency throw is suppressed, there is no thrown concurrency exception, so the ordinary failure callback for that exception does not run. Suppressing optimistic-concurrency errors is an advanced control-flow decision: the application needs an explicit resolution policy such as reloading state, detaching conflicts, marking the command handled, or returning a domain result. Cancellation callbacks are separate and are intended for cancellation logging or cleanup, normally returning `Task.CompletedTask`/void rather than an alternate SaveChanges result.

**Reviewed image uses:** S-017, S-022, S-025, S-026, S-027, S-028, S-034, S-040, S-044, S-049, S-050, S-051, S-052, S-053

**Assigned SVG text nodes:** T-010, T-012, T-013, T-017, T-018


# R04 — DbCommand categories, callbacks, and result shapes

`DbCommandInterceptor` is organized around reader, scalar, and non-query command shapes. Reader callbacks work with commands that return rowsets and expose a `DbDataReader`; scalar callbacks return one provider value through `object`; non-query callbacks return an affected-row `int` for INSERT/UPDATE/DELETE-style commands. Each shape has executing/executed and synchronous/asynchronous variants. This distinction matters when logging, changing a result, or suppressing execution because the replacement result must match the callback's expected shape.

**Reviewed image uses:** S-002, S-006, S-010, S-012, S-023, S-024, S-029, S-032, S-033, S-035, S-039, S-041, S-043, S-045, S-055

**Assigned SVG text nodes:** T-002, T-014


# R05 — DbCommand event data, logging, SQL mutation, suppression, and registration

Command interception exposes the actual `DbCommand`, SQL text, parameters, connection, transaction, command type, timeout, context, command/connection identifiers, and command source. That supports targeted logging and correlation, provider-specific hints, safe comments/tags, or carefully controlled SQL mutation. A command can also be suppressed by returning a shape-compatible result, although this is much less common than observation or logging and requires a deliberate cache/emulation/deny policy. Interceptors are registered through EF options with `AddInterceptors`; they should normally return the incoming result unchanged unless the interception is intentionally changing control flow.

**Reviewed image uses:** S-011, S-016, S-020, S-031, S-036, S-038, S-042, S-046, S-047, S-048, S-054, S-058, S-059

**Assigned SVG text nodes:** T-007, T-008, T-015


## Closure

```text
embedded assets: 59
total image uses: 59
processed image uses: 59
restored image uses: 59
duplicate placements: 0
SVG text nodes: 18
unassigned images: 0
multiply assigned images: 0
unassigned text nodes: 0
missing: 0
unreviewed: 0
```
