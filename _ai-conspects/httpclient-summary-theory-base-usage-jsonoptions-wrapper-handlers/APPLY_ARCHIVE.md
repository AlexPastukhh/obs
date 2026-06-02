# Apply archive: HttpClient conspect stage0 boundary review v001

Archive type: source check / boundary review.

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
C:\Users\alexa\Downloads\ai-conspects-httpclient-summary-theory-base-usage-jsonoptions-wrapper-handlers-stage0-boundary-review-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-httpclient-summary-theory-base-usage-jsonoptions-wrapper-handlers-stage0-boundary-review-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-httpclient-summary-theory-base-usage-jsonoptions-wrapper-handlers-stage0-boundary-review.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat -- _ai-conspects/httpclient-summary-theory-base-usage-jsonoptions-wrapper-handlers

# Save full diff to file and copy to clipboard. Do not print it and do not open a pager.
git --no-pager diff -- _ai-conspects/httpclient-summary-theory-base-usage-jsonoptions-wrapper-handlers > $diffPath
Get-Content $diffPath -Raw | Set-Clipboard
Write-Host "Full diff saved to $diffPath and copied to clipboard."
```

## Commit commands

```powershell
git add _ai-conspects/httpclient-summary-theory-base-usage-jsonoptions-wrapper-handlers
git commit -m "Start HttpClient conspect boundary review"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore -- _ai-conspects/httpclient-summary-theory-base-usage-jsonoptions-wrapper-handlers
```
