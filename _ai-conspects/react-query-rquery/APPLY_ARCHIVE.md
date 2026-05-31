# Apply archive: React Query / rquery Stage 1 map v002

Archive type: stage-1 canvas-wide map + region index.

Target branch:

```text
ai-processed-conspects-text
```

Apply from repository root:

```powershell
PS C:\Users\alexa\obs>
```

## Files included

- `_ai-conspects/react-query-rquery/MANIFEST.md`
- `_ai-conspects/react-query-rquery/00-stage1-overview.md`
- `_ai-conspects/react-query-rquery/01-canvas-wide-map.md`
- `_ai-conspects/react-query-rquery/02-region-index.md`
- `_ai-conspects/react-query-rquery/03-svg-label-inventory.md`
- `_ai-conspects/react-query-rquery/data/svg-labels-stage1.csv`
- `_ai-conspects/react-query-rquery/data/svg-image-uses-stage1.csv`
- `_ai-conspects/react-query-rquery/04-stage1-and-transcription-layout.md`
- `_ai-conspects/react-query-rquery/APPLY_ARCHIVE.md`

## Expected download path

```powershell
C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage1-map-v002.zip
```

## Apply ZIP archive

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage1-map-v002.zip"

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat
git diff -- _ai-conspects/react-query-rquery
```

## Commit commands

```powershell
git add _ai-conspects/react-query-rquery
git commit -m "Add React Query conspect stage 1 map"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore -- _ai-conspects/react-query-rquery
```

## Notes

This archive only adds/replaces files under:

```text
_ai-conspects/react-query-rquery/
```

It does not delete files.
