# Apply supplemental screenshot recovery archive

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-onmodelcreating-supplemental-screenshots-stage0-v002-corrected.zip"
$target = "_ai-conspects\onmodelcreating"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $target
git status --short -- $target
```
