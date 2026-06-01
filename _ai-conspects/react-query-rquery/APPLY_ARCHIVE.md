# Apply archive: React Query R10 mutations consolidated update

Archive type: stage-3c per-region consolidated transcript update.

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
C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage3c-r10-mutations-consolidated-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage3c-r10-mutations-consolidated-v001.zip"

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat
git diff -- _ai-conspects/react-query-rquery
```

## Commit commands

```powershell
git add _ai-conspects/react-query-rquery
git commit -m "Consolidate React Query mutations transcript"
```

## Push command

```powershell
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore -- _ai-conspects/react-query-rquery
```

## Notes

This archive uses the new scheme:

```text
one region = one consolidated archive
```

It does not create one archive per 8–10 screenshots.

This archive updates/creates the main region file:

```text
_ai-conspects/react-query-rquery/regions/R10-mutations.md
```
