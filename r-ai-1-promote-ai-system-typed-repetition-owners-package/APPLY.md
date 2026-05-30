# Apply R-AI-1 Promote AI System Typed Owners Package

Run from repo root.

```powershell
git checkout ai-conspects-repetition-plan
git pull --ff-only origin ai-conspects-repetition-plan

Copy-Item -Path "$env:USERPROFILE\Downloads\r-ai-1-promote-ai-system-typed-repetition-owners-package.zip" -Destination ".\r-ai-1-promote-ai-system-typed-repetition-owners-package.zip" -Force

Expand-Archive -Path ".\r-ai-1-promote-ai-system-typed-repetition-owners-package.zip" -DestinationPath ".\" -Force

$pkg = "r-ai-1-promote-ai-system-typed-repetition-owners-package"
$src = Join-Path (Get-Location) "$pkg\replacement-files"

Copy-Item -Path "$src\-Repetition\Documentation Architecture Adapter.md" -Destination ".\-Repetition\Documentation Architecture Adapter.md" -Force
Copy-Item -Path "$src\-Repetition\START HERE.md" -Destination ".\-Repetition\START HERE.md" -Force
Copy-Item -Path "$src\-Repetition\RESPONSIBILITY MAP.md" -Destination ".\-Repetition\RESPONSIBILITY MAP.md" -Force
Copy-Item -Path "$src\-Repetition\USE CASE MAP.md" -Destination ".\-Repetition\USE CASE MAP.md" -Force
Copy-Item -Path "$src\-Repetition\FOR NEW AI CHAT.md" -Destination ".\-Repetition\FOR NEW AI CHAT.md" -Force
Copy-Item -Path "$src\-Repetition\SYSTEM OVERVIEW.md" -Destination ".\-Repetition\SYSTEM OVERVIEW.md" -Force
Copy-Item -Path "$src\-Repetition\AI Work Areas Profile.md" -Destination ".\-Repetition\AI Work Areas Profile.md" -Force
Copy-Item -Path "$src\-Repetition\Repetition Schedule Principles.md" -Destination ".\-Repetition\Repetition Schedule Principles.md" -Force
Copy-Item -Path "$src\-Repetition\Question Creation Principles.md" -Destination ".\-Repetition\Question Creation Principles.md" -Force
Copy-Item -Path "$src\-Repetition\Workflows\Export Conspect For AI Processing Workflow.md" -Destination ".\-Repetition\Workflows\Export Conspect For AI Processing Workflow.md" -Force
Copy-Item -Path "$src\-Repetition\Workflows\Process Repeat Completion Workflow.md" -Destination ".\-Repetition\Workflows\Process Repeat Completion Workflow.md" -Force
Copy-Item -Path "$src\-Repetition\Workflows\Reconstruct Historical Repeat Schedule Workflow.md" -Destination ".\-Repetition\Workflows\Reconstruct Historical Repeat Schedule Workflow.md" -Force
Copy-Item -Path "$src\-Repetition\Workflows\Process New Repeat Unit Workflow.md" -Destination ".\-Repetition\Workflows\Process New Repeat Unit Workflow.md" -Force
Copy-Item -Path "$src\-Repetition\Workflows\Create Repeat Material From Conspect Workflow.md" -Destination ".\-Repetition\Workflows\Create Repeat Material From Conspect Workflow.md" -Force
Copy-Item -Path "$src\-Repetition\Templates\Area Day Note Template.md" -Destination ".\-Repetition\Templates\Area Day Note Template.md" -Force
Copy-Item -Path "$src\-Repetition\Templates\Focused Repeat Session Template.md" -Destination ".\-Repetition\Templates\Focused Repeat Session Template.md" -Force
Copy-Item -Path "$src\-Repetition\Templates\Month Repeat Plan Template.md" -Destination ".\-Repetition\Templates\Month Repeat Plan Template.md" -Force
Copy-Item -Path "$src\-Repetition\Templates\Question Note Template.md" -Destination ".\-Repetition\Templates\Question Note Template.md" -Force
Copy-Item -Path "$src\-Repetition\Templates\Repeat Chains Template.md" -Destination ".\-Repetition\Templates\Repeat Chains Template.md" -Force

$files = @(
  "-Repetition/Documentation Architecture Adapter.md",
  "-Repetition/START HERE.md",
  "-Repetition/RESPONSIBILITY MAP.md",
  "-Repetition/USE CASE MAP.md",
  "-Repetition/FOR NEW AI CHAT.md",
  "-Repetition/SYSTEM OVERVIEW.md",
  "-Repetition/AI Work Areas Profile.md",
  "-Repetition/Repetition Schedule Principles.md",
  "-Repetition/Question Creation Principles.md",
  "-Repetition/Workflows/Export Conspect For AI Processing Workflow.md",
  "-Repetition/Workflows/Process Repeat Completion Workflow.md",
  "-Repetition/Workflows/Reconstruct Historical Repeat Schedule Workflow.md",
  "-Repetition/Workflows/Process New Repeat Unit Workflow.md",
  "-Repetition/Workflows/Create Repeat Material From Conspect Workflow.md",
  "-Repetition/Templates/Area Day Note Template.md",
  "-Repetition/Templates/Focused Repeat Session Template.md",
  "-Repetition/Templates/Month Repeat Plan Template.md",
  "-Repetition/Templates/Question Note Template.md",
  "-Repetition/Templates/Repeat Chains Template.md"
)

$newFiles = @(
  "-Repetition/AI Work Areas Profile.md",
  "-Repetition/Repetition Schedule Principles.md",
  "-Repetition/Question Creation Principles.md",
  "-Repetition/Workflows/Export Conspect For AI Processing Workflow.md",
  "-Repetition/Workflows/Process Repeat Completion Workflow.md",
  "-Repetition/Workflows/Reconstruct Historical Repeat Schedule Workflow.md",
  "-Repetition/Templates/Area Day Note Template.md",
  "-Repetition/Templates/Focused Repeat Session Template.md",
  "-Repetition/Templates/Month Repeat Plan Template.md",
  "-Repetition/Templates/Question Note Template.md",
  "-Repetition/Templates/Repeat Chains Template.md"
)

git add -N -- $newFiles

$pkgName = "r-ai-1-promote-ai-system-typed-repetition-owners-package"
$diffFile = Join-Path (Get-Location) "$pkgName.diff"

git status --short -- $files
git diff --stat -- $files
git --no-pager diff --no-color --output="$diffFile" -- $files
Get-Content -Path $diffFile -Raw -Encoding UTF8 | Set-Clipboard

Write-Host "Diff saved to: $diffFile"
Write-Host "Diff copied to clipboard. Paste it into chat for review before committing."
```

Do not use `git add .`.
