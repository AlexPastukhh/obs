# Apply clean-layout final archive

This archive supersedes the previous final-coverage v001 package.

Copy this single physical line into PowerShell and press Enter once:

```powershell
& { $ErrorActionPreference = "Stop"; Set-Location "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; $zip = (Resolve-Path (Join-Path $HOME "Downloads\ai-conspects-six-rest-api-full-transcripts-clean-layout-v002.zip")).Path; $targets = @("_ai-conspects/SORTING,MAPPING SERVICE", "_ai-conspects/root document", "_ai-conspects/HEAD REQUEST", "_ai-conspects/ROUTE NESTING", "_ai-conspects/ROUTE PARAMS,QUERY STRING BASICS", "_ai-conspects/vary header"); Expand-Archive -LiteralPath $zip -DestinationPath . -Force; git add -A -- $targets; git status --short -- $targets; git commit -m "Fix Markdown layout in six REST API conspects"; git push origin ai-processed-conspects-text }
```
