# Apply combined Stage0 archive

Copy this single physical line into PowerShell and press Enter once:

```powershell
& { $ErrorActionPreference = "Stop"; Set-Location "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; $zip = (Resolve-Path (Join-Path $HOME "Downloads\ai-conspects-five-js-css-router-stage0-v001.zip")).Path; $targets = @("_ai-conspects/router and redirect tests", "_ai-conspects/splice", "_ai-conspects/xor operator", "_ai-conspects/-all", "_ai-conspects/stacking contexts, zindex"); Expand-Archive -LiteralPath $zip -DestinationPath . -Force; git add -A -- $targets; git status --short -- $targets; git commit -m "Add five JavaScript CSS and router Stage0 inventories"; git push origin ai-processed-conspects-text }
```
