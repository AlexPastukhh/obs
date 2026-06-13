# APPLY ARCHIVE - allocations stage0 boundary/source review v001

## PowerShell

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-dotnet-allocations-memory-gc-span-arraypool-performance-stage0-boundary-review-v001.zip"
$target = "_ai-conspects\dotnet-allocations-memory-gc-span-arraypool-performance"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $target

git status --short -- $target
```

## Commit after review

```powershell
git commit -m "Start .NET allocations conspect boundary review"
git push origin ai-processed-conspects-text
```

## Rollback target only

```powershell
git restore --staged -- $target
git restore -- $target
```
