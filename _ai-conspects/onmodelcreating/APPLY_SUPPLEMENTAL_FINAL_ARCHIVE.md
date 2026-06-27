# Apply onmodelcreating final transcript archive

Copy the following physical line, paste it into PowerShell and press Enter once:

```powershell
& { Set-Location "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; $zip = Join-Path $HOME "Downloads\ai-conspects-onmodelcreating-full-transcript-final-coverage-v001.zip"; $target = "_ai-conspects/onmodelcreating"; if (-not (Test-Path -LiteralPath $zip)) { throw "Archive not found: $zip" }; $OutputEncoding = [System.Text.UTF8Encoding]::new(); [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new(); Expand-Archive -LiteralPath $zip -DestinationPath . -Force; git add -A -- $target; git status --short -- $target; git commit -m "Complete onmodelcreating full transcript and coverage"; git push origin ai-processed-conspects-text }
```
