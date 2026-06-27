# Apply combined final transcript archive

Copy this single physical line into PowerShell and press Enter once:

```powershell
& { $ErrorActionPreference = "Stop"; Set-Location "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; $zip = (Resolve-Path (Join-Path $HOME "Downloads\ai-conspects-three-efcore-full-transcripts-final-coverage-v001.zip")).Path; $targets = @("_ai-conspects/lazy loading", "_ai-conspects/owned entity", "_ai-conspects/ef has conversion, value converte,comparer"); Expand-Archive -LiteralPath $zip -DestinationPath . -Force; git add -A -- $targets; git status --short -- $targets; git commit -m "Complete three EF Core conspect transcripts"; git push origin ai-processed-conspects-text }
```
