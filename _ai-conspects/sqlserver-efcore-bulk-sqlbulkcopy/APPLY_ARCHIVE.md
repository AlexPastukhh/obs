# Apply archive: SQL Server / EF Core / SqlBulkCopy R02/R03 final coverage transcript v001

Archive type: stage-2 final coverage transcript.

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
C:\Users\alexa\Downloads\ai-conspects-sqlserver-efcore-bulk-sqlbulkcopy-stage2-r02r03-final-coverage-v001.zip
```

## Apply + staged diff review commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-sqlserver-efcore-bulk-sqlbulkcopy-stage2-r02r03-final-coverage-v001.zip"
$target = "_ai-conspects\sqlserver-efcore-bulk-sqlbulkcopy"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-sqlbulk-stage2-r02r03-final-coverage.cached.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $target

git status --short -- $target
git diff --cached --stat -- $target
git diff --cached --name-status -- $target

git --no-pager diff --cached -- $target > $diffPath
Get-Content $diffPath -Raw | Set-Clipboard
Write-Host "Cached diff saved to $diffPath"
Write-Host "Clipboard length:" (Get-Content $diffPath -Raw).Length
```

## Commit commands after review

```powershell
git commit -m "Complete SQL Server bulk copy conspect final coverage"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- _ai-conspects\sqlserver-efcore-bulk-sqlbulkcopy
git restore -- _ai-conspects\sqlserver-efcore-bulk-sqlbulkcopy
```
