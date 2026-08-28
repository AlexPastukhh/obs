# Apply v003 hotfix and hashing v001

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = Get-ChildItem `
    "$env:USERPROFILE\Downloads" `
    -Filter "ai-conspects-v003-hotfix-plus-hashing-v001*.zip" |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1

if (-not $zip) {
    throw "Archive not found in Downloads"
}

Expand-Archive `
    -LiteralPath $zip.FullName `
    -DestinationPath . `
    -Force

$targets = @(
    "_ai-conspects\events-delegaates-action",
    "_ai-conspects\filter-middleware-cancellation-request-aborted",
    "_ai-conspects\event-source-browser",
    "_ai-conspects\equality",
    "_ai-conspects\hashing"
)

# The new raw SVG may be ignored by repository rules.
git add -f -- "_ai-conspects\hashing\source\hashing.svg"

foreach ($target in $targets) {
    git add -A -- $target
}

git diff --cached --check
git diff --cached --stat -- $targets
git diff --cached --name-status -- $targets

git commit `
    --only `
    -m "Hotfix transcript OCR and add hashing conspect" `
    -- $targets

git push origin ai-processed-conspects-text
```

Expected hashing result:

```text
104 / 104 unique screenshots
106 / 106 image uses
6 / 6 regions
remaining: 0
READY_NEAR_LITERAL_NORMALIZED
```
