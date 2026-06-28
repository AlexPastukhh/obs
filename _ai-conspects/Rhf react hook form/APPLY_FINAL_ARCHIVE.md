# Apply final transcript archive

Copy this single physical line into PowerShell and press Enter once:

```powershell
& { $ErrorActionPreference = "Stop"; Set-Location "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; $zip = (Resolve-Path (Join-Path $HOME "Downloads\ai-conspects-Rhf-react-hook-form-full-transcript-final-coverage-v001.zip")).Path; $target = "_ai-conspects/Rhf react hook form"; Expand-Archive -LiteralPath $zip -DestinationPath . -Force; git add -A -- $target; git status --short -- $target; git commit -m "Complete React Hook Form transcript"; git push origin ai-processed-conspects-text }
```
