# Knowledge Migration Status

Generated inventory for `_ai-conspects` knowledge migration.

Current remote snapshot checked on branch `ai-processed-conspects-text` at `b097357a21e468a832765290a52c661ef88eb81e`:

| Metric | Count |
|---|---:|
| Top-level directories included by the baseline scan (`name` not starting with `_`) | 321 |
| Migrated (`KNOWLEDGE_REGISTRY.md` present) | 273 |
| Pending (`CURRENT_SOURCE_OF_TRUTH.md` present, registry absent) | 42 |

The baseline handoff at `477a7ab6ffe69869d97c772062838fd29b66af32` recorded `267` migrated and `48` pending. Since then six registries were added: `pipethrough,transformstream,pipeto,writablestream, readablestream`, `axios`, `Rhf react hook form`, `scopes and idisposable`, `hybrydcache`, and `EXCEPTIONHANDLERS`.

## How to read this status

- `KNOWLEDGE_REGISTRY.md` present → workspace has been partitioned/mapped into knowledge units.
- `CURRENT_SOURCE_OF_TRUTH.md` present but registry absent → normal pending migration candidate.
- `Units`, `Mapping rows`, and `Unresolved` are shown as `—` when no registry exists because those values have not been established yet.
- The registry is the source marker; this file is only a generated view.

## Full workspace table

Run the generator from the repository root to replace this file with the complete current table, including unit count and `UNRESOLVED` count for every included top-level workspace:

```powershell
powershell -ExecutionPolicy Bypass -File .\_ai-conspects\KNOWLEDGE_MIGRATION_STATUS.ps1
```

The generated table has these columns:

| Workspace | SOT | Registry | Status | Units | Mapping rows | Unresolved |
|---|:---:|:---:|---|---:|---:|---:|

Status values:

- `MIGRATED` — registry and SOT are both present.
- `PENDING` — SOT is present, registry is absent.
- `NO_SOT` — neither SOT nor registry is present.
- `MIGRATED_NO_SOT` — registry exists without SOT; inspect provenance.
