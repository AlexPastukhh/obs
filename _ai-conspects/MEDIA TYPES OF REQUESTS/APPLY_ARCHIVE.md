# Apply archive: Media Types Of Requests closure audit

Archive type: closure audit.

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
C:\Users\alexa\Downloads\ai-conspects-media-types-of-requests-closure-audit-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$target = "_ai-conspects\MEDIA TYPES OF REQUESTS"
$zip = "C:\Users\alexa\Downloads\ai-conspects-media-types-of-requests-closure-audit-v001.zip"

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
git commit -m "Close Media Types Of Requests coverage audit"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- _ai-conspects/MEDIA TYPES OF REQUESTS
git restore -- _ai-conspects/MEDIA TYPES OF REQUESTS
git clean -fd -- _ai-conspects/MEDIA TYPES OF REQUESTS
```

## Notes

This archive does not add new transcripts. It closes Media Types Of Requests by source coverage after Stage1 and Stage2.
