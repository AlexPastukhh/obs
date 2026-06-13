# APPLY_ARCHIVE - batch stage0 three conspects v001

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-batch-stage0-middleware-linq-alternatekey-v001.zip"
$targets = @(
  "_ai-conspects\aspnetcore-middleware-writeasjson-custom-middleware-response-json",
  "_ai-conspects\csharp-linq-query-syntax-from-where-select-join-into",
  "_ai-conspects\efcore-alternate-key-principal-key-relationships"
)

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $targets

git status --short -- $targets
```

Commit after review:

```powershell
git commit -m "Start three conspects boundary reviews"
git push origin ai-processed-conspects-text
```
