# Apply archive: React Query Stage4w R03/R04 closure + mega boundary

Archive type: closure audit + mega boundary review.

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
C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4w-r03r04-closure-r09r11-mega-boundary-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4w-r03r04-closure-r09r11-mega-boundary-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-stage4w-r03r04-closure-r09r11-mega-boundary.diff"

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
git commit -m "Close R03 R04 and add R09 R11 boundary review"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore -- _ai-conspects/react-query-rquery
```

## Notes

This archive does not add new transcripts. It closes R03/R04 and prepares a larger next split.
