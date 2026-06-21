# APPLY ARCHIVE — ASP.NET Core authorization policies final coverage v001

Target branch: `ai-processed-conspects-text`

## Apply

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-aspnetcore-authorization-policies-requirements-handlers-resource-based-stage1-r01r02r03r04-final-coverage-v001.zip"
$target = "_ai-conspects\aspnetcore-authorization-policies-requirements-handlers-resource-based"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $target

git status --short -- $target
```

## Commit after review

```powershell
git commit -m "Complete ASP.NET Core authorization policies conspect"
git push origin ai-processed-conspects-text
```

## Rollback target only before commit

```powershell
git restore --staged -- $target
git restore -- $target
```
