# Apply archive: React Query conspect Stage 2 screenshot mapping

Archive type: stage-2 screenshot mapping update.

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

It includes Stage 1 files plus Stage 2 screenshot mapping files.

## Expected download path

```powershell
C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage2-screenshot-mapping-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage2-screenshot-mapping-v001.zip"

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat
git diff -- _ai-conspects/react-query-rquery
```

## Commit commands

```powershell
git add _ai-conspects/react-query-rquery
git commit -m "Add React Query conspect stage 2 screenshot mapping"
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

This stage does not contain full screenshot transcription. The real source-preserving transcriptions will be created in:

```text
_ai-conspects/react-query-rquery/regions/*.md
```
