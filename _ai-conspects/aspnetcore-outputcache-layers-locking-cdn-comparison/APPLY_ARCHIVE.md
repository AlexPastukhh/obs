# Apply archive - aspnetcore-outputcache-layers-locking-cdn-comparison stage0

PowerShell, from repository root:

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-aspnetcore-outputcache-layers-locking-cdn-comparison-stage0-boundary-review-v001.zip"
$target = "_ai-conspects\aspnetcore-outputcache-layers-locking-cdn-comparison"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $target

git status --short -- $target
```

Commit after review:

```powershell
git commit -m "Start ASP.NET Core OutputCache layers conspect boundary review"
git push origin ai-processed-conspects-text
```

Rollback target only:

```powershell
git restore --staged -- $target
git restore -- $target
```
