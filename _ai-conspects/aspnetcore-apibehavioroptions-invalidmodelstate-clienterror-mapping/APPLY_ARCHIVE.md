# Apply archive - aspnetcore-apibehavioroptions-invalidmodelstate-clienterror-mapping

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-batch-stage0-apibehavior-efperf-httpcontext-v001.zip"
$target = "_ai-conspects\aspnetcore-apibehavioroptions-invalidmodelstate-clienterror-mapping"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

Expand-Archive -Path $zip -DestinationPath . -Force
git add -A -- $target
git status --short -- $target
git diff --cached -- $target | Set-Clipboard
```
