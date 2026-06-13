# Apply archive - efcore-performance-diagnostics-compiled-linq-batching-n-plus-one

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-batch-stage1-final-coverage-apibehavior-efperf-httpcontext-v001.zip"
$target = "_ai-conspects\efcore-performance-diagnostics-compiled-linq-batching-n-plus-one"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

Expand-Archive -Path $zip -DestinationPath . -Force
git add -A -- $target
git status --short -- $target
git diff --cached -- $target | Set-Clipboard
```
