# Export the canonical Problem Details sources

The repository already contains the canonical extracted PNG placements even though the full SVG path is currently unavailable through this audit environment.

Run from the repository root:

```powershell
powershell -ExecutionPolicy Bypass -File `
  "_ai-conspects/problem details/EXPORT_CANONICAL_PROBLEM_DETAILS_SOURCE.ps1"
```

Expected output:

```text
C:\Users\<user>\Downloads\
problem-details-canonical-source-export.zip
```

The script checks:

```text
physical S-*.png files: expected 86
unique PNG contents: expected 77
image ledger rows: expected 86
text ledger rows: expected 118
```

It exports:

- all canonical `source/images/S-*.png`;
- canonical SVG when it physically exists;
- image and text ledgers;
- duplicate groups;
- region plan;
- existing region summaries;
- source-of-truth and reconciliation files.

Upload that resulting ZIP for the final 50-unique-screenshot near-literal pass.
