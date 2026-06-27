# Apply Stage0 archive

Copy the following single physical line, paste it into PowerShell and press
Enter once:

```powershell
& { Set-Location "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; $zip = Join-Path $HOME "Downloads\ai-conspects-async-processing-of-multiple-calls-parallelism-stage0-v001.zip"; $target = "_ai-conspects/async processing of multiple calls,parallelism"; if (-not (Test-Path -LiteralPath $zip)) { throw "Archive not found: $zip" }; $OutputEncoding = [System.Text.UTF8Encoding]::new(); [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new(); Expand-Archive -LiteralPath $zip -DestinationPath . -Force; git add -A -- $target; git status --short -- $target; git commit -m "Add stage0 for async processing and parallelism"; git push origin ai-processed-conspects-text }
```
