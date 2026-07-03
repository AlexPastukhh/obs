# Apply FULL CONTENT NEG + VALIDATION FLOW correction v002

Target branch:

```text
ai-processed-conspects-text
```

The raw SVG is ignored by a repository rule, so it must be force-added.

```powershell
$ErrorActionPreference = "Stop"

$repo = "C:\Users\alexa\obs"
$zip = "C:\Users\alexa\Downloads\ai-conspects-full-content-neg-corrected-v002.zip"
$temp = Join-Path $env:TEMP "full-content-neg-corrected-v002"
$target = "_ai-conspects/FULL CONTENT NEG + VALIDATION FLOW"
$svg = "_ai-conspects/FULL CONTENT NEG + VALIDATION FLOW/source/FULL CONTENT NEG + VALIDATION FLOW.svg"

if (-not (Test-Path -LiteralPath $repo)) {
    throw "Repository not found: $repo"
}

if (-not (Test-Path -LiteralPath $zip)) {
    throw "Archive not found: $zip"
}

Set-Location -LiteralPath $repo

$alreadyStaged = @(git diff --cached --name-only)
if ($alreadyStaged.Count -gt 0) {
    $alreadyStaged | ForEach-Object { Write-Host $_ }
    throw "Staging area is not empty."
}

git checkout ai-processed-conspects-text
if ($LASTEXITCODE -ne 0) {
    throw "git checkout failed"
}

git pull --ff-only origin ai-processed-conspects-text
if ($LASTEXITCODE -ne 0) {
    throw "git pull failed"
}

if (Test-Path -LiteralPath $temp) {
    Remove-Item -LiteralPath $temp -Recurse -Force
}

Expand-Archive -LiteralPath $zip -DestinationPath $temp -Force

$from = Join-Path $temp "_ai-conspects\FULL CONTENT NEG + VALIDATION FLOW"
$to = Join-Path $repo "_ai-conspects\FULL CONTENT NEG + VALIDATION FLOW"

if (-not (Test-Path -LiteralPath $from)) {
    throw "Target folder is missing from archive."
}

New-Item -ItemType Directory -Path $to -Force | Out-Null
Copy-Item -Path (Join-Path $from "*") -Destination $to -Recurse -Force

git add -f -- $svg
if ($LASTEXITCODE -ne 0) {
    throw "Force-adding the SVG failed."
}

git add -A -- $target
if ($LASTEXITCODE -ne 0) {
    throw "git add failed"
}

$staged = @(git diff --cached --name-only)
if ($staged.Count -eq 0) {
    throw "No files were staged."
}

$unexpected = @(
    $staged | Where-Object {
        $_ -notlike "$target/*"
    }
)

if ($unexpected.Count -gt 0) {
    $unexpected | ForEach-Object { Write-Host $_ }
    throw "Unrelated files are staged."
}

git diff --cached --name-status
git diff --cached --stat

git commit -m "Replace content negotiation transcript with source-preserving v002"
if ($LASTEXITCODE -ne 0) {
    throw "git commit failed"
}

git push origin ai-processed-conspects-text
if ($LASTEXITCODE -ne 0) {
    throw "git push failed"
}

git log -1 --oneline
git status --short -- $target

Remove-Item -LiteralPath $temp -Recurse -Force

Write-Host "Content-negotiation correction committed and pushed." -ForegroundColor Green
```
