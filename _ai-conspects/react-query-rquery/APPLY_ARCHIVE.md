# Apply archive: React Query conspect Stage 3 R10 mutations

Archive type: stage-3 first region transcription draft.

Target branch:

```text
ai-processed-conspects-text
```

Apply from repository root:

```powershell
PS C:\Users\alexa\obs>
```

## Files included

This archive updates:

```text
_ai-conspects/react-query-rquery/
```

It includes Stage 1 and Stage 2 files plus the first Stage 3 region transcription draft.

## Expected download path

```powershell
C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage3-r10-mutations-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage3-r10-mutations-v001.zip"

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat
git diff -- _ai-conspects/react-query-rquery
```

## Commit commands

```powershell
git add _ai-conspects/react-query-rquery
git commit -m "Add React Query mutations region transcript draft"
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

The region transcript is intentionally marked as OCR-assisted draft and needs visual verification before being treated as exact literal transcription.
