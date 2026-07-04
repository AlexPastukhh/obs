# Apply archive — AUTHORIZATION Stage0 source-identity correction v002

Target branch:

```text
ai-processed-conspects-text
```

## Important

This correction replaces the entire `_ai-conspects/AUTHORIZATION/` directory.
It removes files that belonged to the separate authorization-flow source.

Use the root-level `apply-authorization-stage0-correction-v002.ps1`, or run the
commands below.

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-authorization-stage0-source-identity-correction-v002.zip"
$temp = Join-Path $env:TEMP "ai-conspects-authorization-stage0-v002"

if (Test-Path $temp) {
    Remove-Item $temp -Recurse -Force
}

Expand-Archive -Path $zip -DestinationPath $temp -Force

$target = "_ai-conspects\AUTHORIZATION"

if (Test-Path $target) {
    Remove-Item $target -Recurse -Force
}

Copy-Item `
    (Join-Path $temp "_ai-conspects\AUTHORIZATION") `
    $target `
    -Recurse `
    -Force

git status --short -- $target
git add -A -- $target
git diff --cached --stat -- $target
git status --short -- $target

git commit -m "Correct AUTHORIZATION source identity and rebuild Stage0"
git push origin ai-processed-conspects-text
```

## Expected state

```text
AUTHORIZATION source: 112 unique / 119 uses / 110 text lines
Stage0: corrected and complete
near-literal transcript: pending next archive
authorization-flow folder: unchanged
```
