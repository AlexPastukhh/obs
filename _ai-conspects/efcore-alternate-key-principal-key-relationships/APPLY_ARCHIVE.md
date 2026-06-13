# APPLY_ARCHIVE - efcore-alternate-key-principal-key-relationships stage0 boundary review v001

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-alternate-key-stage0-boundary-review-v001.zip"
$target = "_ai-conspects\efcore-alternate-key-principal-key-relationships"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $target

git status --short -- $target
```

Commit after review:

```powershell
git commit -m "Start EF Core alternate key / principal key / relationships conspect boundary review"
git push origin ai-processed-conspects-text
```
