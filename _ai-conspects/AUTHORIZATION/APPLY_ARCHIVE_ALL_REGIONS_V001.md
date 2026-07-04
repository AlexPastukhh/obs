# Apply AUTHORIZATION all-regions near-literal archive v001

Target branch: `ai-processed-conspects-text`

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = Get-ChildItem `
    "$env:USERPROFILE\Downloads" `
    -Filter "ai-conspects-authorization-all-regions-near-literal-v001*.zip" |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1

if (-not $zip) {
    throw "Archive not found in Downloads"
}

Expand-Archive -LiteralPath $zip.FullName -DestinationPath . -Force

$target = "_ai-conspects\AUTHORIZATION"

# The SVG may be ignored by repository rules, so add it explicitly.
git add -f -- "$target\source\AUTHORIZATION.svg"
git add -A -- "$target"

git diff --cached --stat -- "$target"
git diff --cached --name-status -- "$target"

git commit -m "Complete AUTHORIZATION near literal transcript"
git push origin ai-processed-conspects-text
```

Expected result:

```text
112 / 112 source blocks
7 / 7 regions
0 remaining
READY_NEAR_LITERAL_NORMALIZED
```
