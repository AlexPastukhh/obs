# Apply archive: Streaming R04 transcript v002

Archive type: stage-4 verified region transcript / count fix.

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
C:\Users\alexa\Downloads\ai-conspects-streaming-stage4-r04-transcript-v002.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-streaming-stage4-r04-transcript-v002.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-streaming-stage4-r04-transcript.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat -- _ai-conspects/streaming

# Save full diff to file and copy to clipboard. Do not print it and do not open a pager.
git --no-pager diff -- _ai-conspects/streaming > $diffPath
Get-Content $diffPath -Raw | Set-Clipboard
Write-Host "Full diff saved to $diffPath and copied to clipboard."
```

## Commit commands

```powershell
git add _ai-conspects/streaming
git commit -m "Add streaming R04 NDJSON flush transcript"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore -- _ai-conspects/streaming
```

## Notes

This v002 archive keeps R04 transcript content from v001 and fixes the R04 source-count wording: the actual included source count is 39.
