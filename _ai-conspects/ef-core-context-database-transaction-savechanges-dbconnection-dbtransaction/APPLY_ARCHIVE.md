# Apply archive: Stage1 large boundary review v002

Archive type: large boundary review / split plan.

Target branch:

```text
ai-processed-conspects-text
```

Apply from repository root:

```powershell
PS C:\Users\alexa\obs>
```

## Expected download path

```powershell
C:\Users\alexa\Downloads\ai-conspects-ef-core-context-database-transaction-savechanges-dbconnection-dbtransaction-stage1-large-boundary-review-v002.zip
```

## Important

Use `tar.exe -xf` instead of PowerShell `Expand-Archive` for this large archive.

`v002` keeps the same Stage1 boundary decisions as `v001`; it only shortens contact-sheet filenames to avoid Windows extraction/path issues.

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$target = "_ai-conspects\ef-core-context-database-transaction-savechanges-dbconnection-dbtransaction"
$zip = "C:\Users\alexa\Downloads\ai-conspects-ef-core-context-database-transaction-savechanges-dbconnection-dbtransaction-stage1-large-boundary-review-v002.zip"
$diffPath = "C:\Users\alexa\Downloads\efcore-context-dbtx-stage1-v002-cached.diff"

# Clean failed staged/working changes for this conspect only.
git restore --staged -- "$target"
git restore -- "$target"
git clean -fd -- "$target"

# Extract with tar instead of Expand-Archive.
tar.exe -xf $zip -C .

# Stage ONLY this conspect folder.
git add -A -- "$target"

# Inspect staged diff.
git status --short -- "$target"
git diff --cached --stat -- "$target"
git diff --cached --name-status -- "$target"

git --no-pager diff --cached -- "$target" > $diffPath
Get-Content $diffPath -Raw | Set-Clipboard

Write-Host "Cached diff saved to $diffPath"
Write-Host "Clipboard length:" (Get-Content $diffPath -Raw).Length
```

## Expected staged diff shape

```text
M  APPLY_ARCHIVE.md
M  CURRENT_SOURCE_OF_TRUTH.md
M  MANIFEST.md
M  regions/README.md
A  01-stage1-large-boundary-review.md
A  data/stage1-large-boundary-review-v001.csv
A  data/stage1-large-boundary-review-v001.json
A  data/image-review-ledger-v001.csv
A  data/image-review-ledger-v001.json
A  audit-assets/stage1-boundary-contact-sheets/*.png
```

There must be no `D` for `APPLY_ARCHIVE.md`, `CURRENT_SOURCE_OF_TRUTH.md`, or `MANIFEST.md`.

## Commit commands

```powershell
git commit -m "Add EF Core context database transaction boundary review"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- "$target"
git restore -- "$target"
git clean -fd -- "$target"
```

## Notes

This archive does not create transcript content.

Next step should be NEXT01 transcript: CTXDB01 + CTXDB02.
