# APPLY ARCHIVE — 10 small conspects final coverage v001

All ten conspects are delivered together in one archive.

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-10-small-stage1-final-coverage-v001.zip"
$targets = @(
  "_ai-conspects\linq to sql"
  "_ai-conspects\stored procedures"
  "_ai-conspects\manual account lockout,ratelimiter middleware, idatabase vs idist cache"
  "_ai-conspects\injecting into razor"
  "_ai-conspects\tag helpers razor,partial"
  "_ai-conspects\BINDING SOURCE ATTRIBUTES"
  "_ai-conspects\content disposition header"
  "_ai-conspects\CUSTOM ROUTE CONSTRAINT"
  "_ai-conspects\utf8 string  literal"
  "_ai-conspects\link generator"
)

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $targets
git status --short -- $targets
```

## Commit after review

```powershell
git commit -m "Complete 10 small conspects final coverage"
git push origin ai-processed-conspects-text
```

## Rollback only this batch

```powershell
git restore --staged -- $targets
git restore -- $targets
```
