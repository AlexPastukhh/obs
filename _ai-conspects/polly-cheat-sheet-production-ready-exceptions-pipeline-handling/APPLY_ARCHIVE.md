# Apply archive: Polly conspect stage0 boundary review v001

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
C:\Users\alexa\Downloads\ai-conspects-polly-cheat-sheet-production-ready-exceptions-pipeline-handling-stage0-boundary-review-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-polly-cheat-sheet-production-ready-exceptions-pipeline-handling-stage0-boundary-review-v001.zip"
$target = "_ai-conspects\polly-cheat-sheet-production-ready-exceptions-pipeline-handling"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-polly-cheat-sheet-production-ready-exceptions-pipeline-handling-stage0-boundary-review.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

# Use intent-to-add only if this folder is still untracked locally.
if ((git status --short -- $target) -match '^\?\?') {
  git add -N -- $target
}

git status --short
git diff --stat -- $target

git --no-pager diff -- $target > $diffPath
Get-Content $diffPath -Raw | Set-Clipboard
Write-Host "Full diff saved to $diffPath and copied to clipboard."
Write-Host "Clipboard length:" (Get-Content $diffPath -Raw).Length
```

## Commit commands

```powershell
git add _ai-conspects/polly-cheat-sheet-production-ready-exceptions-pipeline-handling
git commit -m "Start Polly conspect boundary review"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore -- _ai-conspects/polly-cheat-sheet-production-ready-exceptions-pipeline-handling
```
