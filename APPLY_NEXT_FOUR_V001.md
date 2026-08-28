# Apply next four near-literal conspects v001

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = Get-ChildItem `
    "$env:USERPROFILE\Downloads" `
    -Filter "ai-conspects-next-four-near-literal-v001*.zip" |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1

if (-not $zip) {
    throw "Next-four archive not found in Downloads"
}

Expand-Archive `
    -LiteralPath $zip.FullName `
    -DestinationPath . `
    -Force

$targets = @(
    "_ai-conspects\events-delegaates-action",
    "_ai-conspects\filter-middleware-cancellation-request-aborted",
    "_ai-conspects\event-source-browser",
    "_ai-conspects\equality"
)

# Force-add raw SVG files because repo ignore rules may exclude SVG.
git add -f -- `
    "_ai-conspects\events-delegaates-action\source\events,delegaates,action.svg" `
    "_ai-conspects\filter-middleware-cancellation-request-aborted\source\FILTER,MIDDLEWARE CANCELLATION,REQUEST ABORTED.svg" `
    "_ai-conspects\event-source-browser\source\event source browser.svg" `
    "_ai-conspects\equality\source\equality.svg"

foreach ($target in $targets) {
    git add -A -- $target
}

git diff --cached --stat -- $targets
git diff --cached --name-status -- $targets

git commit `
    --only `
    -m "Add next four near literal conspects" `
    -- $targets

git push origin ai-processed-conspects-text
```
