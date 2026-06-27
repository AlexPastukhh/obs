# Apply final archive

Copy this single physical line into PowerShell and press Enter once:

```powershell
& { $ErrorActionPreference = "Stop"; Set-Location "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; $zip = (Resolve-Path (Join-Path $HOME "Downloads\ai-conspects-redis-pools-cookiepolicy-full-transcripts-final-coverage-v001.zip")).Path; $targets = @("_ai-conspects/redis, idatabase,iserver", "_ai-conspects/objectpool,arraypool,memorypool", "_ai-conspects/usecookiepolicy"); Expand-Archive -LiteralPath $zip -DestinationPath . -Force; git add -A -- $targets; git status --short -- $targets; git commit -m "Complete Redis pools and cookie policy transcripts"; git push origin ai-processed-conspects-text }
```
