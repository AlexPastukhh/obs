# Apply archive: React Query R08B transcript v001

Archive type: stage-4l verified region transcript.

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
C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4l-r08b-refetch-cancel-cache-helpers-transcript-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4l-r08b-refetch-cancel-cache-helpers-transcript-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-stage4l-r08b-refetch-cancel-cache-helpers.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat -- _ai-conspects/react-query-rquery

# Save full diff to file and copy to clipboard. Do not print it and do not open a pager.
git --no-pager diff -- _ai-conspects/react-query-rquery > $diffPath
Get-Content $diffPath -Raw | Set-Clipboard
Write-Host "Full diff saved to $diffPath and copied to clipboard."
```

## Commit commands

```powershell
git add _ai-conspects/react-query-rquery
git commit -m "Add React Query R08B cache helpers transcript"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore -- _ai-conspects/react-query-rquery
```

## Notes

This archive completes only R08B. It intentionally leaves R08C pending.
