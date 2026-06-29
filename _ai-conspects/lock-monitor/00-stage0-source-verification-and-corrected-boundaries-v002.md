# Stage0 verification and corrected semantic split v002

## Source identity

Uploaded source: `lock, monitor(2).svg`

Repository raw source:

```text
_ai-conspects/lock-monitor/source/lock-monitor.svg
```

Uploaded and repository Git blob SHA:

```text
7c0764a43c404d870455756ca7a78be4592f0d9b
```

The repository processed the exact uploaded SVG.

## Structural verification

```text
viewBox: 0 0 9928.76223274304 3299.4222954805564
unique embedded images: 25
image uses: 25
canvas text labels: 22
broken embedded images: 0
external/empty image hrefs: 0
dangling <use> references: 0
duplicate embedded-image contents: 0
```

The source is complete and the inventory counts are correct.

## Problem in the original Stage0

The original source ranges are semantically shifted:

- original R01 (`S-001..S-008`) is broadly correct;
- original R02 (`S-009..S-016`) was described as Wait/Pulse signaling, but it actually contains `Monitor.Exit`, `TryEnter`, timeout overloads, argument rules, and reentrancy;
- original R03 (`S-017..S-024`) was described as deadlocks/reentrancy/lock ordering, but it actually contains `Pulse`, `PulseAll`, producer-consumer signaling, and when to use each;
- original R04 (`S-025`) is correct.

## Corrected regions

### R01 — lock/Monitor foundation and critical sections

```text
S-001..S-008
```

### R02 — Exit, TryEnter, timeout overloads, argument rules, and reentrancy

```text
S-009..S-015
```

### R03 — Wait, Pulse, PulseAll, and condition signaling

```text
S-016..S-024
```

### R04 — async locking and blocking guidance

```text
S-025
```

## Stage0 verdict

```text
RAW SOURCE: exact match
INVENTORY: correct
SOURCE COMPLETENESS: complete
ORIGINAL SEMANTIC SPLIT: incorrect for R02/R03
REBUILD FROM ANOTHER SVG: not required
BOUNDARY PLAN UPDATE: required
```
