# Apply combined Stage0 archive

Copy this single physical line into PowerShell and press Enter once:

```powershell
& { $ErrorActionPreference = "Stop"; Set-Location "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; $zip = (Resolve-Path (Join-Path $HOME "Downloads\ai-conspects-axios-redux-basics-stage0-v001.zip")).Path; $targets = @("_ai-conspects/axios", "_ai-conspects/redux basics"); Expand-Archive -LiteralPath $zip -DestinationPath . -Force; git add -A -- $targets; git status --short -- $targets; git commit -m "Add Axios and Redux basics Stage0 inventories"; git push origin ai-processed-conspects-text }
```
