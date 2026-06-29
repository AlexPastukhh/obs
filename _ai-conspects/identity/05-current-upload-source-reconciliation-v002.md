# Current-upload source reconciliation v002 — identity

Generated: 2026-06-29 06:30:30 UTC

## Repository finding before this correction

The repository metadata claimed that the canonical source existed at:

`source/identity.svg`

A direct fetch from branch `ai-processed-conspects-text` returned `404 Not Found` for that path.

Therefore the previous statement “full source preservation complete” was not literally true in the remote repository, even though the extracted images, ledgers and audit counts existed.

## Current uploaded source

```text
uploaded filename: identity(3).svg
bytes: 3351046
SHA-256: d34a00268ef3532318e20b9adffcc99d5073b9be102695307782aaefd51e403a
Git blob SHA: 920acc2dabcbcf2e570bca84a88d8e88794cc4a8
viewBox: 0 0 10297.018778630572 15623.629080118077
```

## Structural comparison with the previous Stage4 audit

```text
previous audit embedded assets: 64
current SVG embedded assets: 64

previous audit image uses: 64
current SVG image uses: 64

previous audit text nodes: 92
current SVG text nodes: 92
```

The counts match exactly. Every embedded image has a unique content hash in the current source.

## Decision

No new Stage0 split is required.

This package:

1. restores the complete current SVG to `source/identity.svg`;
2. preserves the existing Stage4 ledgers, extracted images and region files;
3. adds a new detailed near-literal transcript layer;
4. records a correction audit that distinguishes coverage from transcript depth.
