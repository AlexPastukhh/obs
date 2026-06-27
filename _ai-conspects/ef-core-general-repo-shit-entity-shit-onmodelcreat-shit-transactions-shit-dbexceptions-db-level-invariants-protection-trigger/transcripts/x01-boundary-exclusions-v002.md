# X01 — Explicit source-boundary exclusions and reassignment

Generated: 2026-06-27 UTC

## Coverage boundary

```text
complete source SVG: source/source-complete-v002.svg
source SHA-256: 3f1f8d3f0594043679772ad71c5b40c553fea90716fc781ccf9241542a196efd
image uses assigned: 1
original uses rechecked: 1
recovered uses reviewed: 0
coverage level: source-level verified semantic transcript
```

## Explicit boundary exclusion

`S-006` is a screenshot about a Vite development-server proxy, a backend redirect to a login page, the browser following an absolute `Location` header, and the resulting cross-origin/CORS behavior. It is not EF Core source material.

The screenshot is still accounted for in the complete-SVG ledger. Its status is `explicit-boundary-exclusion-reassigned`, and it belongs with the existing proxy/server/Vite proxy conspect rather than any EF Core semantic region. No other image use or text group is left unmapped.

## Complete use mapping

| Use | Source set | Image | Coverage | Semantic role |
|---|---|---|---|---|
| `S-006` | `original-incomplete-svg-set` | `OLD-7e221f7688` | `explicit-boundary-exclusion-reassigned` | Out-of-boundary screenshot about a Vite development proxy, redirects, CORS, and cross-origin navigation. |

## Candidate and boundary checks

- Every listed use is present in `data/full-use-coverage-v002.csv` and has exactly one primary final region.
- Duplicate placements are linked to a reviewed primary use by identical Excalidraw `fileId`.
- Exact code punctuation remains recoverable from the preserved PNG and complete SVG.
- No label-only assumption closes an image: the image itself was reviewed or explicitly excluded.

## Region status

```text
assigned uses: 1
unresolved uses: 0
unmapped uses: 0
```
