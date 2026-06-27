# Apply Stage0 archive

Copy this single physical line into PowerShell and press Enter once:

```powershell
& { $ErrorActionPreference = "Stop"; Set-Location "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; $zip = (Resolve-Path (Join-Path $HOME "Downloads\ai-conspects-cache-control-headers-response-caching-stage0-v001.zip")).Path; $target = "_ai-conspects/cache control headers and response caching"; Expand-Archive -LiteralPath $zip -DestinationPath . -Force; git add -A -- $target; git status --short -- $target; git commit -m "Add cache control and response caching Stage0"; git push origin ai-processed-conspects-text }
```
