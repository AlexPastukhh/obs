# Stage4 — Complete SVG reconciliation and screenshot-backed transcript

Generated: 2026-06-27 UTC

## Why this correction exists

The remote conspect was closed against an incomplete text-only export:

```text
Legacy image uses: 0
Legacy text elements: 70
```

The complete uploaded source `hashing(2).svg` contains a much larger visual boundary:

```text
Embedded symbol assets: 105
Image uses on canvas: 106
Physical SVG text nodes: 80
```

The technical upload suffix `(2)` is removed from the canonical source and folder naming remains exactly `hashing`.

## Reconciliation result

```text
Restored and reviewed image uses: 106 / 106
Reviewed SVG text nodes: 80 / 80
Missing image uses: 0
Unreviewed image uses: 0
Unassigned image uses: 0
Multiply assigned image uses: 0
Missing text nodes: 0
Unreviewed text nodes: 0
Unassigned text nodes: 0
Multiply assigned text nodes: 0
```

There are 105 referenced symbol IDs and 104 unique image-content hashes. The audit preserves both legitimate duplicate situations:

1. one symbol is placed twice on the canvas;
2. one pair of distinct symbol definitions contains byte-identical image data.

Neither is discarded or collapsed from the image-use ledger.

## Verified semantic regions

```text
R02: manual PBKDF2 / versioned storage / fixed-time verification — 28 images / 56 text nodes
R03: Identity PasswordHasher / format / rehash / user argument — 25 images / 11 text nodes
R04: legacy-to-Identity migration / rehash-on-login — 12 images / 1 text node
R05: salt / pepper / key stretching / costs / storage and flow — 41 images / 12 text nodes
```

The old text-only transcript remains historical context but is superseded semantically by these screenshot-backed region transcripts.

## Independent checks

The final audit validates source counts, extracted files, one-to-one region assignment, transcript existence, duplicate preservation and complete image/text ledgers. All checks pass.
