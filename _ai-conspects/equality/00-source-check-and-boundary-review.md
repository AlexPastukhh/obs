# Stage0 - equality source check and boundary review v001

Source SVG: `equality.svg`  
Conspect folder: `_ai-conspects/equality`

## Counts

```text
unique embedded images: 18
image uses on canvas: 18
text labels parsed: 6
duplicate image uses by content: 0
```

## Important rule

Inventory and candidate regions are checklists only, not source of truth. A transcript region becomes complete only after visual/semantic review.

## Text labels

- T-001: `equality` at x=1477.9, y=245.4
- T-002: `tostring and operators` at x=10.0, y=10.0
- T-003: `IEquatable.equals` at x=1248.0, y=2287.9
- T-004: `Equals(object?)` at x=1234.5, y=1274.2
- T-005: `gethashcode()` at x=2483.4, y=152.1
- T-006: `getequalitycomponents` at x=3535.8, y=17.3

## Candidate regions

### R01 - tostring-and-operators

left road: ToString, operator overloads and equality entry examples

```text
image uses: 3
sources: S-010, S-011, S-012
```

### R02 - equals-object-iequatable-core

core road: equality, Equals(object?), IEquatable<T>.Equals and related implementation flow

```text
image uses: 7
sources: S-001, S-002, S-003, S-004, S-005, S-008, S-009
```

### R03 - gethashcode-contract

middle-right road: GetHashCode contract and hash-based collection implications

```text
image uses: 2
sources: S-006, S-007
```

### R04 - getequalitycomponents-pattern

right road: GetEqualityComponents pattern and composed value equality

```text
image uses: 6
sources: S-013, S-014, S-015, S-016, S-017, S-018
```

## Next

Start transcript processing after this combined three-conspect stage0 archive is reviewed and committed.
