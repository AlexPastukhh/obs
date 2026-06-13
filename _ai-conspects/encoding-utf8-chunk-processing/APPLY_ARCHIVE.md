# Apply archive: Encoding UTF8 Chunk Processing Stage0 boundary review

Archive type: boundary review.

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
C:\Users\alexa\Downloads\ai-conspects-encoding-utf8-chunk-processing-stage0-boundary-review-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$target = "_ai-conspects\encoding-utf8-chunk-processing"
$zip = "C:\Users\alexa\Downloads\ai-conspects-encoding-utf8-chunk-processing-stage0-boundary-review-v001.zip"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short

Expand-Archive -Path $zip -DestinationPath . -Force

# Stage ONLY this target folder.
git add -A -- $target

# Review staged file list/status.
git status --short -- $target
```

## Commit commands

```powershell
git commit -m "Add Encoding UTF8 Chunk Stage0 boundary review"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- _ai-conspects/encoding-utf8-chunk-processing
git restore -- _ai-conspects/encoding-utf8-chunk-processing
git clean -fd -- _ai-conspects/encoding-utf8-chunk-processing
```

## Notes

This archive is boundary review only. It does not add transcript and does not mark Encoding UTF8 Chunk sources as processed.
