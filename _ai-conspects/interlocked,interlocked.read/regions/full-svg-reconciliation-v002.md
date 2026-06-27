# interlocked,interlocked.read — full corrected-SVG semantic reconciliation v002

Generated: 2026-06-27 UTC

## Source policy

Screenshots are the primary source. Candidate regions, nearest labels, and vector paths were used only as navigation hints. Every embedded screenshot was visually reviewed before region assignment.

## R01 — Interlocked versus lock, process bitness, and atomic reads

Interlocked is appropriate for one atomic transition on one shared location; lock is preferable when several values or steps must preserve one invariant. Interlocked.Read is mainly relevant to atomic 64-bit reads on 32-bit processes. On ordinary 64-bit .NET processes, aligned long reads are already atomic, so Read is rarely needed solely for atomicity.

**Reviewed image uses:** S-001, S-002, S-003, S-005, S-010, S-014, S-018, S-021, S-024

**Assigned SVG text nodes:** T-001, T-002, T-003, T-007

## R02 — Increment, Decrement, and Add counters

Increment and Decrement atomically change a numeric location and return the new value. Add performs an arbitrary atomic numeric delta. These operations fit request counters, active-worker counts, byte totals and similar single-value measurements; a normal ++ or += is a read-modify-write sequence and is not atomic.

**Reviewed image uses:** S-004, S-011, S-017, S-019, S-022, S-025

**Assigned SVG text nodes:** T-004, T-006, T-009

## R03 — Exchange, CompareExchange, and compare-and-swap loops

Exchange atomically replaces a value and returns the previous value, which is useful for flags and shared-reference swaps. CompareExchange replaces only when the current value equals the comparand and always returns the observed original value. Repeating CompareExchange in a loop is the standard compare-and-swap pattern for lock-free single-field updates and initialize-once logic.

**Reviewed image uses:** S-006, S-012, S-016, S-020, S-023, S-026, S-028

**Assigned SVG text nodes:** T-005, T-008

## R04 — Atomic Or/And flag manipulation and XOR mental model

Interlocked.Or atomically sets bits; Interlocked.And with a complemented mask atomically clears bits. XOR is a useful conceptual toggle truth table, but the screenshots correctly focus implementation on Or and And. Flag operations remain single-location atomic updates and do not make multi-field state transitions atomic.

**Reviewed image uses:** S-027, S-029, S-030, S-031, S-032, S-033, S-034, S-035, S-036, S-037, S-038, S-039

**Assigned SVG text nodes:** T-010, T-011, T-012, T-013, T-014, T-015, T-016, T-017, T-018, T-019, T-020, T-021

## R05 — MemoryBarrier, process-wide barriers, and speculation barriers

MemoryBarrier, MemoryBarrierProcessWide and SpeculationBarrier are advanced ordering primitives. They constrain reordering or speculation rather than changing a value. Normal ASP.NET Core business code should prefer higher-level synchronization unless a proven low-level memory-ordering requirement exists.

**Reviewed image uses:** S-007, S-008, S-009, S-013, S-015

**Assigned SVG text nodes:** none; region established by screenshots


## Closure

```text
embedded assets: 39
total image uses: 39
processed image uses: 39
restored image uses: 38
duplicate placements: 0
SVG text nodes: 21
processed SVG text nodes: 21
unassigned images: 0
multiply assigned images: 0
unassigned text nodes: 0
missing: 0
unreviewed: 0
```
