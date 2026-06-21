# Apply archive: React Query R08 boundary review v001

Archive type: boundary review / split plan.

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
C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4j-r08-boundary-review-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4j-r08-boundary-review-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-stage4j-r08-boundary-review.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat -- _ai-conspects/react query,rquery

# Save full diff to file and copy to clipboard. Do not print it and do not open a pager.
git --no-pager diff -- _ai-conspects/react query,rquery > $diffPath
Get-Content $diffPath -Raw | Set-Clipboard
Write-Host "Full diff saved to $diffPath and copied to clipboard."
```

## Commit commands

```powershell
git add _ai-conspects/react query,rquery
git commit -m "Add React Query R08 boundary review"
git push origin ai-processed-conspects-text
```

## Notes

This archive does not complete R08 transcript. It prepares a safe split.

Next archive should be R08A transcript.
