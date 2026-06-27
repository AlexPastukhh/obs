# Apply corrected Stage0 archive

This archive supersedes the one-region v001 plan.

Copy this single physical line into PowerShell and press Enter once:

```powershell
& { $ErrorActionPreference = "Stop"; Set-Location "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; $zip = (Resolve-Path (Join-Path $HOME "Downloads\ai-conspects-Rhf-react-hook-form-stage0-corrected-v002.zip")).Path; $target = "_ai-conspects/Rhf react hook form"; Remove-Item -LiteralPath $target -Recurse -Force -ErrorAction SilentlyContinue; Expand-Archive -LiteralPath $zip -DestinationPath . -Force; git add -A -- $target; git status --short -- $target; git commit -m "Correct React Hook Form Stage0 region plan"; git push origin ai-processed-conspects-text }
```
