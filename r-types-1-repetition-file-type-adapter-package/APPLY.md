# Apply R-TYPES-1 Repetition File-Type Adapter Package

Run from repo root.

```powershell
git checkout ai-conspects-repetition-plan
git pull --ff-only origin ai-conspects-repetition-plan

Copy-Item -Path "$env:USERPROFILE\Downloads\r-types-1-repetition-file-type-adapter-package.zip" -Destination ".\r-types-1-repetition-file-type-adapter-package.zip" -Force

Expand-Archive -Path ".\r-types-1-repetition-file-type-adapter-package.zip" -DestinationPath ".\" -Force

$pkg = "r-types-1-repetition-file-type-adapter-package"
$src = Join-Path (Get-Location) "$pkg\replacement-files"

Copy-Item -Path "$src\-Repetition\\Documentation Architecture Adapter.md" -Destination ".\-Repetition\\Documentation Architecture Adapter.md" -Force
Copy-Item -Path "$src\-Repetition\\START HERE.md" -Destination ".\-Repetition\\START HERE.md" -Force
Copy-Item -Path "$src\-Repetition\\RESPONSIBILITY MAP.md" -Destination ".\-Repetition\\RESPONSIBILITY MAP.md" -Force
Copy-Item -Path "$src\-Repetition\\USE CASE MAP.md" -Destination ".\-Repetition\\USE CASE MAP.md" -Force
Copy-Item -Path "$src\-Repetition\\FOR NEW AI CHAT.md" -Destination ".\-Repetition\\FOR NEW AI CHAT.md" -Force
Copy-Item -Path "$src\-Repetition\\SYSTEM OVERVIEW.md" -Destination ".\-Repetition\\SYSTEM OVERVIEW.md" -Force
Copy-Item -Path "$src\-Repetition\\Workflows\\Add Or Route New Information Workflow.md" -Destination ".\-Repetition\\Workflows\\Add Or Route New Information Workflow.md" -Force

$files = @(
  "-Repetition/Documentation Architecture Adapter.md",
  "-Repetition/START HERE.md",
  "-Repetition/RESPONSIBILITY MAP.md",
  "-Repetition/USE CASE MAP.md",
  "-Repetition/FOR NEW AI CHAT.md",
  "-Repetition/SYSTEM OVERVIEW.md",
  "-Repetition/Workflows/Add Or Route New Information Workflow.md"
)

$newFiles = @(
  "-Repetition/Documentation Architecture Adapter.md"
)

git add -N -- $newFiles

$pkgName = "r-types-1-repetition-file-type-adapter-package"
$diffFile = Join-Path (Get-Location) "$pkgName.diff"

git status --short -- $files
git diff --stat -- $files
git --no-pager diff --no-color --output="$diffFile" -- $files
Get-Content -Path $diffFile -Raw -Encoding UTF8 | Set-Clipboard

Write-Host "Diff saved to: $diffFile"
Write-Host "Diff copied to clipboard. Paste it into chat for review before committing."
```

Do not use `git add .`.

## Commit after review

```powershell
git add "-Repetition/Documentation Architecture Adapter.md" "-Repetition/START HERE.md" "-Repetition/RESPONSIBILITY MAP.md" "-Repetition/USE CASE MAP.md" "-Repetition/FOR NEW AI CHAT.md" "-Repetition/SYSTEM OVERVIEW.md" "-Repetition/Workflows/Add Or Route New Information Workflow.md"

git commit -m "docs(repetition): add documentation architecture adapter"
git push origin ai-conspects-repetition-plan
```
