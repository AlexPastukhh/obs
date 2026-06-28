# Apply combined final archive

Copy this single physical line into PowerShell and press Enter once:

```powershell
& { $ErrorActionPreference = "Stop"; Set-Location "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; $zip = (Resolve-Path (Join-Path $HOME "Downloads\ai-conspects-five-js-css-router-full-transcripts-final-coverage-v001.zip")).Path; $targets = @("_ai-conspects/-all", "_ai-conspects/stacking contexts, zindex", "_ai-conspects/router and redirect tests", "_ai-conspects/splice", "_ai-conspects/xor operator"); Expand-Archive -LiteralPath $zip -DestinationPath . -Force; git add -A -- $targets; git status --short -- $targets; git commit -m "Complete five JS CSS and router conspect transcripts"; git push origin ai-processed-conspects-text }
```
