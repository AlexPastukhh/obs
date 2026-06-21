# APPLY ARCHIVE — RAZOR PARTIAL UPDATES FOR VIEWCOMPONENT HTMX,AJAX final coverage v001

This conspect is delivered inside the combined three-conspect archive.

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-three-computed-columns-razor-partial-updates-statuscodepages-stage1-final-coverage-v001.zip"
$target = "_ai-conspects\RAZOR PARTIAL UPDATES FOR VIEWCOMPONENT HTMX,AJAX"

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force
git add -A -- $target
git status --short -- $target
```
