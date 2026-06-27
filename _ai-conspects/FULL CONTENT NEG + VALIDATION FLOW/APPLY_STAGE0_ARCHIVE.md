# Apply Stage0 archive

Copy this single physical line into PowerShell and press Enter once:

```powershell
& { $ErrorActionPreference = "Stop"; Set-Location "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; $zip = (Resolve-Path (Join-Path $HOME "Downloads\ai-conspects-FULL-CONTENT-NEG-VALIDATION-FLOW-stage0-v001.zip")).Path; $target = "_ai-conspects/FULL CONTENT NEG + VALIDATION FLOW"; Expand-Archive -LiteralPath $zip -DestinationPath . -Force; git add -A -- $target; git status --short -- $target; git commit -m "Add FULL CONTENT NEG validation flow Stage0"; git push origin ai-processed-conspects-text }
```
