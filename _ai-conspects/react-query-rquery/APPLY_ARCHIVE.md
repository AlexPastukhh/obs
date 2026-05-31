# Apply archive: React Query conspect Stage 3b R10 verification batch 1

Archive type: stage-3b region verification update.

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
C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage3b-r10-mutations-verification-batch1-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage3b-r10-mutations-verification-batch1-v001.zip"

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat
git diff -- _ai-conspects/react-query-rquery
```

## Commit commands

```powershell
git add _ai-conspects/react-query-rquery
git commit -m "Verify first React Query mutations screenshots"
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

This archive does not delete files.

This stage verifies only the first batch of R10 screenshots:

```text
MUT-S001–MUT-S008
```

Remaining R10 screenshots still need verification:

```text
MUT-S009–MUT-S036
```
