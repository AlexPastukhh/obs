# Apply full-source recovery Stage0 archive

Copy this single physical line into PowerShell and press Enter once:

```powershell
& { Set-Location "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; $zip = Join-Path $HOME "Downloads\ai-conspects-next-three-full-source-recovery-stage0-v001.zip"; if (-not (Test-Path -LiteralPath $zip)) { throw "Archive not found: $zip" }; $OutputEncoding = [System.Text.UTF8Encoding]::new(); [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new(); Expand-Archive -LiteralPath $zip -DestinationPath . -Force; git add -A -- "_ai-conspects/redis, idatabase,iserver" "_ai-conspects/objectpool,arraypool,memorypool" "_ai-conspects/usecookiepolicy"; git status --short -- "_ai-conspects/redis, idatabase,iserver" "_ai-conspects/objectpool,arraypool,memorypool" "_ai-conspects/usecookiepolicy"; git commit -m "Recover full sources for Redis pools and cookie policy"; git push origin ai-processed-conspects-text }
```
