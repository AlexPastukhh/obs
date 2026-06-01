# Apply archive: Streaming R03 transcript v002

Archive type: stage-3 verified region transcript / apply-format fix.

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
C:\Users\alexa\Downloads\ai-conspects-streaming-stage3-r03-transcript-v002.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-streaming-stage3-r03-transcript-v002.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-streaming-stage3-r03-transcript.diff"

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
git commit -m "Add streaming R03 object streaming transcript"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore -- _ai-conspects/streaming
```

## Notes

This v002 archive keeps the R03 transcript content from v001 and fixes `APPLY_ARCHIVE.md` formatting: the file now contains real line breaks instead of literal `\n` sequences.
