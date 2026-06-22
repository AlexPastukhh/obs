# APPLY ARCHIVE - C# LINQ query syntax / from-where-select / join / into final coverage transcript v001

Target branch: `ai-processed-conspects-text`

## Apply

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-batch-stage1-final-coverage-middleware-linq-alternatekey-v001.zip"
$target = "_ai-conspects\linq-query-syntax"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $target

git status --short -- $target
```

## Commit after review

```powershell
git commit -m "Complete C# LINQ query syntax conspect final coverage"
git push origin ai-processed-conspects-text
```

## Rollback staged target only

```powershell
git restore --staged -- $target
git restore -- $target
```
