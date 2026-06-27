# APPLY_ARCHIVE

Run from the repository root in PowerShell.

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-options-pattern-stage4-completeness-correction-v001.zip"
$old = "_ai-conspects\options-pattern"
$new = "_ai-conspects\options pattern"

git status --short

if ((Test-Path -LiteralPath $old) -and (Test-Path -LiteralPath $new)) {
    throw "Both old and new options-pattern folders exist. Resolve the conflict before applying."
}

if (Test-Path -LiteralPath $old) {
    Move-Item -LiteralPath $old -Destination $new
}

if (-not (Test-Path -LiteralPath $new)) {
    throw "Existing options-pattern conspect was not found."
}

$sourceDir = Join-Path $new "source"
Get-ChildItem -LiteralPath $sourceDir -Filter *.svg -File -ErrorAction SilentlyContinue |
    Remove-Item -Force

Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $old $new
git status --short -- $old $new
```

Commit:

```powershell
git commit -m "Restore missing options pattern screenshots"
git push origin ai-processed-conspects-text
```
