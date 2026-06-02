# Apply archive: React Query final coverage audit

Archive type: final coverage audit.

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
C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-final-coverage-audit-v001.zip
```

## Apply commands with cached diff review

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$target = "_ai-conspects\react-query-rquery"
$zip = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-final-coverage-audit-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-final-coverage-audit.cached.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short

Expand-Archive -Path $zip -DestinationPath . -Force

# Stage ONLY this target folder.
git add -A -- $target

# Review staged diff, including new files.
git status --short -- $target
git diff --cached --stat -- $target
git diff --cached --name-status -- $target

git --no-pager diff --cached -- $target > $diffPath
Get-Content $diffPath -Raw | Set-Clipboard

Write-Host "Cached diff saved to $diffPath"
Write-Host "Clipboard length:" (Get-Content $diffPath -Raw).Length
```

## Commit commands

```powershell
git commit -m "Close React Query final coverage audit"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- _ai-conspects/react-query-rquery
git restore -- _ai-conspects/react-query-rquery
git clean -fd -- _ai-conspects/react-query-rquery
```

## Notes

This archive does not add new transcripts. It closes React Query at final coverage-audit level.
