# Stage0 - randomnumbergenerator source check and boundary review v001

Source SVG: `randomnumbergenerator.svg`  
Conspect folder: `_ai-conspects/randomnumbergenerator`

## Counts

```text
unique embedded images: 11
image uses on canvas: 11
text labels parsed: 5
duplicate image uses by content: 0
```

## Important rule

Inventory and candidate regions are checklists only, not source of truth. A transcript region becomes complete only after visual/semantic review.

## Text labels

- T-001: `how many bytes to use` at x=2194.8, y=176.7
- T-002: `get bytes,fill array` at x=1024.8, y=710.0
- T-003: `get int securely` at x=1028.1, y=1326.7
- T-004: `instance, old api to avoid` at x=1064.8, y=2220.0
- T-005: `examples` at x=111.5, y=10.0

## Candidate regions

### R01 - secure-random-overview-examples-and-entropy-sizing

upper road: cryptographically secure randomness, common token/code examples and byte/entropy sizing guidance

```text
image uses: 4
sources: S-007, S-002, S-011, S-010
```

### R02 - static-apis-unbiased-ranges-and-shuffling

middle road: GetBytes, Fill, GetInt32, modulo-bias avoidance, bounded ranges and secure shuffling

```text
image uses: 5
sources: S-006, S-009, S-005, S-008, S-001
```

### R03 - instance-and-obsolete-api-notes

lower road: Create instance option and obsolete RNGCryptoServiceProvider API to avoid

```text
image uses: 2
sources: S-004, S-003
```

## Next

Start transcript processing after this combined three-conspect stage0 archive is reviewed and committed.
