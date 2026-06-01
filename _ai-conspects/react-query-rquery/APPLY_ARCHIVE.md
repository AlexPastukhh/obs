# Apply archive: React Query Stage4i combined corrections v002

Archive type: combined correction archive.

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
C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4i-combined-corrections-v002.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4i-combined-corrections-v002.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-stage4i-combined-corrections.diff"

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
git commit -m "Apply React Query R06 R07 R10 corrections"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore -- _ai-conspects/react-query-rquery
```

## Notes

This archive intentionally fixes three known correction items together and normalizes ledger consistency:

```text
R06 v002: S-176 + old R06 sources normalized
R07 v004: S-184/S-186 + old R07 sources normalized
R10 v006: S-240/S-241 + duplicate-use S-237/S-246
R08 QueryClient/methods candidates remain pending for future R08
```
