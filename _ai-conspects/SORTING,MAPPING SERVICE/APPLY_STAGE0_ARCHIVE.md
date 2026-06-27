# Apply corrected combined Stage0 archive

The v001 archive is superseded. Copy this single physical line into PowerShell and press Enter once:

```powershell
& { $ErrorActionPreference = "Stop"; Set-Location "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; $zip = (Resolve-Path (Join-Path $HOME "Downloads\ai-conspects-six-new-rest-api-stage0-corrected-v002.zip")).Path; $targets = @("_ai-conspects/SORTING,MAPPING SERVICE", "_ai-conspects/root document", "_ai-conspects/HEAD REQUEST", "_ai-conspects/ROUTE NESTING", "_ai-conspects/ROUTE PARAMS,QUERY STRING BASICS", "_ai-conspects/vary header"); Remove-Item -LiteralPath $targets -Recurse -Force -ErrorAction SilentlyContinue; Expand-Archive -LiteralPath $zip -DestinationPath . -Force; git add -A -- $targets; git status --short -- $targets; git commit -m "Correct six REST API Stage0 region markup"; git push origin ai-processed-conspects-text }
```
