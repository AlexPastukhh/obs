# Apply archive: Working With Bytes Streams Stage0 boundary review

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
C:\Users\alexa\Downloads\ai-conspects-working-with-bytes-streams-stage0-boundary-review-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$target = "_ai-conspects\working-with-bytes-streams"
$zip = "C:\Users\alexa\Downloads\ai-conspects-working-with-bytes-streams-stage0-boundary-review-v001.zip"

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
git commit -m "Add Working With Bytes Streams Stage0 boundary review"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- _ai-conspects/working-with-bytes-streams
git restore -- _ai-conspects/working-with-bytes-streams
git clean -fd -- _ai-conspects/working-with-bytes-streams
```

## Notes

This archive is boundary review only. It does not add transcript and does not mark Working With Bytes Streams sources as processed.
