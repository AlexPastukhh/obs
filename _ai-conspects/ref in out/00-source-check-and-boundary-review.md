# Stage0 - ref in out source check and boundary review v001

Source SVG: `ref in out.svg`  
Conspect folder: `_ai-conspects/ref in out`

## Counts

```text
unique embedded images: 18
image uses on canvas: 18
text labels parsed: 2
duplicate image uses by content: 0
```

## Important rule

Inventory and candidate regions are checklists only, not source of truth. A transcript region becomes complete only after visual/semantic review.

## Text labels

- T-001: `when to us out` at x=4419.5, y=3499.2
- T-002: `passing as ref properties or any struct` at x=10.0, y=10.0

## Candidate regions

### R01 - passing-structs-and-properties-by-reference

left road: passing structs/properties by reference and restrictions around ref-like access

```text
image uses: 4
sources: S-015, S-018, S-017, S-016
```

### R02 - ref-in-core-semantics-and-usage

main road: ref/in parameter semantics, call-site syntax, mutation and performance-oriented usage

```text
image uses: 9
sources: S-001, S-009, S-008, S-007, S-006, S-005, S-004, S-003, S-002
```

### R03 - out-usage-and-try-patterns

right/lower road: when to use out, Try-patterns and related examples

```text
image uses: 5
sources: S-012, S-011, S-010, S-013, S-014
```

## Next

Start transcript processing after this combined three-conspect stage0 archive is reviewed and committed.
