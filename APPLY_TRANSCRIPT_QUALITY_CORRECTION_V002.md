# Apply transcript quality correction v002

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = Get-ChildItem `
    "$env:USERPROFILE\Downloads" `
    -Filter "ai-conspects-next-four-transcript-quality-correction-v002*.zip" |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1

if (-not $zip) {
    throw "Correction archive not found in Downloads"
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

foreach ($target in $targets) {
    git add -A -- $target
}

git diff --cached --stat -- $targets
git diff --cached --name-status -- $targets

git commit `
    --only `
    -m "Correct next four transcript formatting and OCR" `
    -- $targets

git push origin ai-processed-conspects-text
```

Expected authoritative transcript files:

```text
10-full-source-preserving-transcript-v002.md
11-technical-corrections-v002.md
12-repetition-question-bank-v002.md
13-final-near-literal-coverage-audit-v002.md
14-transcript-quality-correction-v002.md
```
