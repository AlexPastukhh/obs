# Apply archive - batch stage0

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-batch-stage0-apibehavior-efperf-httpcontext-v001.zip"
$targets = @(
  "_ai-conspects\aspnetcore-apibehavioroptions-invalidmodelstate-clienterror-mapping",
  "_ai-conspects\efcore-performance-diagnostics-compiled-linq-batching-n-plus-one",
  "_ai-conspects\aspnetcore-httpcontext-items-features-per-request-state",
  "_ai-conspects\_batch-stage0-three-conspects-apibehavior-efperf-httpcontext-v001"
)

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $targets

git status --short -- $targets
git diff --cached -- $targets | Set-Clipboard
```

Commit after review:

```powershell
git commit -m "Start three more conspects boundary reviews"
git push origin ai-processed-conspects-text
```
