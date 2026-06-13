# APPLY_ARCHIVE - aspnetcore-middleware-writeasjson-custom-middleware-response-json stage0 boundary review v001

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-middleware-writeasjson-stage0-boundary-review-v001.zip"
$target = "_ai-conspects\aspnetcore-middleware-writeasjson-custom-middleware-response-json"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $target

git status --short -- $target
```

Commit after review:

```powershell
git commit -m "Start ASP.NET Core middleware / WriteAsJson / custom middleware response JSON conspect boundary review"
git push origin ai-processed-conspects-text
```
