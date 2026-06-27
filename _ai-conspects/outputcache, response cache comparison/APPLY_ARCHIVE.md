# APPLY ARCHIVE

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-outputcache-response-cache-comparison-stage5-independent-full-svg-audit-v002.zip"
$target = "_ai-conspects\outputcache, response cache comparison"

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $target
git status --short -- $target

git commit -m "Audit complete output cache comparison SVG"
git push origin ai-processed-conspects-text
```
