# Apply combined final archive

Copy this single physical line into PowerShell and press Enter once:

```powershell
& { $ErrorActionPreference = "Stop"; Set-Location "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; $zip = (Resolve-Path (Join-Path $HOME "Downloads\ai-conspects-four-react-browser-full-transcripts-final-coverage-v001.zip")).Path; $targets = @("_ai-conspects/sheet hashset", "_ai-conspects/react state and rerenders, store subscriptions", "_ai-conspects/usesyncexternalstore", "_ai-conspects/iframe,cross window communication,target"); Expand-Archive -LiteralPath $zip -DestinationPath . -Force; git add -A -- $targets; git status --short -- $targets; git commit -m "Complete four React and browser conspect transcripts"; git push origin ai-processed-conspects-text }
```
