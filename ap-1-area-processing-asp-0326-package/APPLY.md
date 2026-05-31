# Apply AP-1 Area Processing ASP 0326 Package

Run from repo root in PowerShell.

```powershell
git checkout ai-conspects-repetition-plan
git pull --ff-only origin ai-conspects-repetition-plan

Copy-Item -Path "$env:USERPROFILE\Downloads\ap-1-area-processing-asp-0326-package.zip" -Destination ".\ap-1-area-processing-asp-0326-package.zip" -Force

Expand-Archive -Path ".\ap-1-area-processing-asp-0326-package.zip" -DestinationPath ".\" -Force

$pkg = "ap-1-area-processing-asp-0326-package"
$src = Join-Path (Get-Location) "$pkg\replacement-files"

New-Item -ItemType Directory -Force -Path ".\-Repetition\Area Processing\ASP" | Out-Null

Copy-Item -Path "$src\-Repetition\START HERE.md" -Destination ".\-Repetition\START HERE.md" -Force
Copy-Item -Path "$src\-Repetition\USE CASE MAP.md" -Destination ".\-Repetition\USE CASE MAP.md" -Force
Copy-Item -Path "$src\-Repetition\RESPONSIBILITY MAP.md" -Destination ".\-Repetition\RESPONSIBILITY MAP.md" -Force

Copy-Item -Path "$src\-Repetition\Area Processing\Area Processing Index.md" -Destination ".\-Repetition\Area Processing\Area Processing Index.md" -Force
Copy-Item -Path "$src\-Repetition\Area Processing\ASP\ASP 0326 Area Source Conversion.md" -Destination ".\-Repetition\Area Processing\ASP\ASP 0326 Area Source Conversion.md" -Force
Copy-Item -Path "$src\-Repetition\Area Processing\ASP\ASP 0326 Deep Fragment Processing.md" -Destination ".\-Repetition\Area Processing\ASP\ASP 0326 Deep Fragment Processing.md" -Force
Copy-Item -Path "$src\-Repetition\Area Processing\ASP\ASP 0326 Processing Notes.md" -Destination ".\-Repetition\Area Processing\ASP\ASP 0326 Processing Notes.md" -Force

$files = @(
  "-Repetition/START HERE.md",
  "-Repetition/USE CASE MAP.md",
  "-Repetition/RESPONSIBILITY MAP.md",
  "-Repetition/Area Processing/Area Processing Index.md",
  "-Repetition/Area Processing/ASP/ASP 0326 Area Source Conversion.md",
  "-Repetition/Area Processing/ASP/ASP 0326 Deep Fragment Processing.md",
  "-Repetition/Area Processing/ASP/ASP 0326 Processing Notes.md"
)

$newFiles = @(
  "-Repetition/Area Processing/Area Processing Index.md",
  "-Repetition/Area Processing/ASP/ASP 0326 Area Source Conversion.md",
  "-Repetition/Area Processing/ASP/ASP 0326 Deep Fragment Processing.md",
  "-Repetition/Area Processing/ASP/ASP 0326 Processing Notes.md"
)

git add -N -- $newFiles

$diffFile = Join-Path (Get-Location) "$pkg.diff"

git status --short -- $files
git diff --stat -- $files
git --no-pager diff --no-color --output="$diffFile" -- $files
Get-Content -Path $diffFile -Raw -Encoding UTF8 | Set-Clipboard

Write-Host "Diff saved to: $diffFile"
Write-Host "Diff copied to clipboard. Paste it into chat for review before committing."
```

Do not use:

```powershell
git add .
```

After review, commit with scoped paths only.
