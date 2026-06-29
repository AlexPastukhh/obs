# Problem Details — transcript quality gate v001

Generated: 2026-06-30

## What is already proven

The existing Stage4 ledgers report:

```text
complete embedded assets: 77
complete image uses: 86
processed image uses: 86
physical non-empty SVG text nodes: 118
processed text nodes: 118
duplicate placement groups: 9
missing/unreviewed/unassigned/multiply assigned: 0
```

The existing coverage reconciliation is retained as valid source-accounting evidence.

## What is not yet proven

Coverage status alone does not prove that the active region prose is sufficiently close to each screenshot for:

- detailed repetition without opening the SVG;
- code reconstruction;
- source-specific recall questions;
- preservation of examples, edge cases, and exact API distinctions.

The region Markdown bodies and the authoritative 86-use SVG were not independently available through the current repository read path during this audit. Therefore the previous `Status: complete` statement is narrowed:

```text
SOURCE COVERAGE: COMPLETE
TRANSCRIPT FIDELITY: PENDING INDEPENDENT SOURCE-BY-SOURCE AUDIT
REPETITION READINESS: NOT YET CERTIFIED
```

## Uploaded-file boundary

The file supplied for this review is the legacy partial export:

```text
viewBox: 0 0 24118.984298337513 8860.442454800075
unique embedded images: 17
image uses: 25
SVG text labels: 118
duplicate extra placements: 8
Git blob SHA: 9e4efbdb556b0e081592c2e784aed9bfff5d5f0b
```

This matches the documented legacy baseline of 25 uses, not the recovered 86-use source. It must not overwrite the Stage4 canonical source.

The partial export is retained only under:

```text
audit-assets/legacy-source-v001/
```

## Quality gate required for final certification

1. Restore or expose the authoritative 86-use SVG at the path declared by the manifest.
2. Read all four actual region Markdown files.
3. For every `S-001..S-086`, verify one of:
   - a source-specific near-literal block; or
   - an explicit source-to-detailed-paragraph mapping that preserves code, concrete examples, and caveats.
4. Record cropped/ambiguous content.
5. Add source-specific recall questions.
6. Add a repetition guide covering cross-region comparisons.
7. Run a second audit that checks text quality, not only ID coverage.

## Required transcript shape

```md
## S-xxx — source title

### Near-literal normalized transcript
Visible prose and code.

### Study meaning
Explanation that does not replace the source text.

### Recall questions
Definition, comparison, cause/effect, and application questions.
```
