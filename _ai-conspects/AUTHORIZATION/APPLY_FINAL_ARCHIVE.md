# Apply final archive

Copy this single physical line into PowerShell and press Enter once:

```powershell
& { Set-Location "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; $zip = Join-Path $HOME "Downloads\ai-conspects-next-three-full-transcripts-final-coverage-v001.zip"; if (-not (Test-Path -LiteralPath $zip)) { throw "Archive not found: $zip" }; $OutputEncoding = [System.Text.UTF8Encoding]::new(); [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new(); Expand-Archive -LiteralPath $zip -DestinationPath . -Force; git add -A -- "_ai-conspects/indexes, onmodel indexes" "_ai-conspects/AUTHORIZATION" "_ai-conspects/span,memory,stackalloc,stackoverflow,calculate bytes, unmanaged types"; git status --short -- "_ai-conspects/indexes, onmodel indexes" "_ai-conspects/AUTHORIZATION" "_ai-conspects/span,memory,stackalloc,stackoverflow,calculate bytes, unmanaged types"; git commit -m "Complete indexes authorization and span transcripts"; git push origin ai-processed-conspects-text }
```
