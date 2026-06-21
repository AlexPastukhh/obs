# Apply archive: Working With Bytes Streams closure audit

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
C:\Users\alexa\Downloads\ai-conspects-working-with-bytes-streams-closure-audit-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$target = "_ai-conspects\working with bytes, streams to bytes, to array readexactly,readatleast"
$zip = "C:\Users\alexa\Downloads\ai-conspects-working-with-bytes-streams-closure-audit-v001.zip"

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
git commit -m "Close Working With Bytes Streams coverage audit"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- _ai-conspects/working with bytes, streams to bytes, to array readexactly,readatleast
git restore -- _ai-conspects/working with bytes, streams to bytes, to array readexactly,readatleast
git clean -fd -- _ai-conspects/working with bytes, streams to bytes, to array readexactly,readatleast
```

## Notes

This archive does not add new transcripts. It closes Working With Bytes Streams by source coverage after Stage1 and Stage2.
