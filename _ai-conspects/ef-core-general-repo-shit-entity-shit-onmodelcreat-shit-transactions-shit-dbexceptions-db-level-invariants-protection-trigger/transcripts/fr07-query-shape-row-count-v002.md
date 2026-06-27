# FR07 — Query shape, Include/Load choices, cartesian expansion, and row-count reasoning

Generated: 2026-06-27 UTC

## Coverage boundary

```text
complete source SVG: source/source-complete-v002.svg
source SHA-256: 3f1f8d3f0594043679772ad71c5b40c553fea90716fc781ccf9241542a196efd
image uses assigned: 12
original uses rechecked: 7
recovered uses reviewed: 5
coverage level: source-level verified semantic transcript
```

## Verified semantic transcript

### Loading choices

`Include` is appropriate when the required related shape is known in advance. `Find` plus explicit `Load` is useful when the root may already be tracked or relationships are loaded conditionally. `AutoInclude` applies to entity queries, but it does not turn `Find` into an automatic collection loader.

One large joined query can reduce round trips but duplicate parent data and multiply rows. `AsSplitQuery` avoids cartesian explosion at the cost of additional round trips and consistency considerations. Projection often avoids both problems by selecting only the read model that is actually needed.

### Row multiplication

Sibling collection branches multiply. A parent with an A branch producing three rows and a sibling B branch producing two rows can produce six joined rows. A nested child collection contributes within its branch rather than necessarily multiplying every unrelated branch in the same way. Compute each branch's contribution, then multiply sibling branches. The supplied SQL-like tables show repeated parent/child values and make the cartesian growth explicit.

Identity resolution affects object duplication after rows are returned; it does not remove the SQL row multiplication itself.

## Complete use mapping

| Use | Source set | Image | Coverage | Semantic role |
|---|---|---|---|---|
| `S-024` | `original-incomplete-svg-set` | `OLD-a67f713ace` | `verified-semantic-transcript-final-v002` | Large Include graphs, cartesian explosion, and AsSplitQuery as a trade-off between row multiplication and round trips. |
| `S-035` | `original-incomplete-svg-set` | `OLD-691ce63670` | `verified-semantic-transcript-final-v002` | Explicitly loading several collections normally issues separate queries. |
| `S-037` | `original-incomplete-svg-set` | `OLD-ac404adaa8` | `verified-semantic-transcript-final-v002` | Include can load multiple collections in one query, but may create a very large joined row set. |
| `S-040` | `original-incomplete-svg-set` | `OLD-7f7dafd9fe` | `verified-semantic-transcript-final-v002` | Use Include when the related shape is known in advance and one readable query is appropriate. |
| `S-047` | `original-incomplete-svg-set` | `OLD-2175a4a601` | `verified-semantic-transcript-final-v002` | Include versus Find plus Load: round-trip, readability, and tracked-root trade-offs. |
| `S-052` | `original-incomplete-svg-set` | `OLD-810b517d3a` | `verified-semantic-transcript-final-v002` | AutoInclude does not make Find automatically load collections; Find and explicit Load remain distinct. |
| `S-054` | `original-incomplete-svg-set` | `OLD-4f85a4e72b` | `verified-semantic-transcript-final-v002` | Eager Include versus explicit Load after Find for related collections. |
| `NU-042` | `recovered-complete-svg-set` | `NIMG-126` | `verified-semantic-transcript-final-v002` | General row-count rule: nested branch uses max/branch contribution while sibling collection branches multiply. |
| `NU-041` | `recovered-complete-svg-set` | `NIMG-106` | `verified-semantic-transcript-final-v002` | Example SQL-like joined rows for a parent with nested and sibling collections. |
| `NU-045` | `recovered-complete-svg-set` | `NIMG-129` | `verified-semantic-transcript-final-v002` | Step-by-step branch-count calculation for the example graph. |
| `NU-044` | `recovered-complete-svg-set` | `NIMG-165` | `verified-semantic-transcript-final-v002` | Compute one sibling branch and multiply it by another branch to obtain joined row count. |
| `NU-043` | `recovered-complete-svg-set` | `NIMG-118` | `verified-semantic-transcript-final-v002` | Concrete joined-row table showing repeated parent and child values. |

## Candidate and boundary checks

- Every listed use is present in `data/full-use-coverage-v002.csv` and has exactly one primary final region.
- Duplicate placements are linked to a reviewed primary use by identical Excalidraw `fileId`.
- Exact code punctuation remains recoverable from the preserved PNG and complete SVG.
- No label-only assumption closes an image: the image itself was reviewed or explicitly excluded.

## Region status

```text
assigned uses: 12
unresolved uses: 0
unmapped uses: 0
```
