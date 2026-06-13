# APPLY_ARCHIVE - csharp-linq-query-syntax-from-where-select-join-into stage0 boundary review v001

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-linq-query-syntax-stage0-boundary-review-v001.zip"
$target = "_ai-conspects\csharp-linq-query-syntax-from-where-select-join-into"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $target

git status --short -- $target
```

Commit after review:

```powershell
git commit -m "Start C# LINQ query syntax / from-where-select / join / into conspect boundary review"
git push origin ai-processed-conspects-text
```
