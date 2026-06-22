# Apply archive: EF Core General source-completion correction v002

Target branch:

```text
ai-processed-conspects-text
```

Target folder:

```text
_ai-conspects/ef-core-general-repo-shit-entity-shit-onmodelcreat-shit-transactions-shit-dbexceptions-db-level-invariants-protection-trigger
```

## Apply

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-ef-core-general-source-completion-correction-v002.zip"
$target = "_ai-conspects\ef-core-general-repo-shit-entity-shit-onmodelcreat-shit-transactions-shit-dbexceptions-db-level-invariants-protection-trigger"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
tar.exe -xf $zip -C .

git add -A -- $target
git status --short -- $target
```

## Commit

```powershell
git commit -m "Add missing EF Core General source screenshots"
git push origin ai-processed-conspects-text
```

This archive does not delete historical transcripts. It adds the corrected source, 192 recovered unique screenshots, 194 recovered placements, audit assets, inventories, and reopens coverage.
