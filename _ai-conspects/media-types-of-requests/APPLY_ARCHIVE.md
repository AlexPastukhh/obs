# Apply archive: Media Types Of Requests Stage1 transcript

Archive type: source-level semantic transcript.

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
C:\Users\alexa\Downloads\ai-conspects-media-types-of-requests-stage1-r01-r02-transcript-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$target = "_ai-conspects\media-types-of-requests"
$zip = "C:\Users\alexa\Downloads\ai-conspects-media-types-of-requests-stage1-r01-r02-transcript-v001.zip"

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
git commit -m "Add Media Types Of Requests Stage1 transcript"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- _ai-conspects/media-types-of-requests
git restore -- _ai-conspects/media-types-of-requests
git clean -fd -- _ai-conspects/media-types-of-requests
```

## Notes

This archive processes R01/R02 only. R03/R04 remain pending for Stage2.
