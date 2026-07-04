# Apply archive — ASP.NET Core filters source-fidelity correction v002

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-filters-source-fidelity-v002.zip"
$target = "_ai-conspects\filters"

Expand-Archive -LiteralPath $zip -DestinationPath . -Force

git status --short -- $target
git diff --stat -- $target

git add -A -- $target

git status --short -- $target
git diff --cached --stat -- $target
git diff --cached --name-status -- $target

git commit -m "Complete source-preserving ASP.NET Core filters transcript"

git push origin ai-processed-conspects-text
```

Verification:

```powershell
git status --short
git log -1 --oneline

git ls-tree -r --name-only HEAD -- "_ai-conspects/filters"
```
