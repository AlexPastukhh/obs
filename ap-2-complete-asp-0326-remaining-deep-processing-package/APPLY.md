# APPLY — AP-2 remaining ASP 0326 deep processing

Run from repo root in PowerShell.

This package avoids replacing the whole deep-processing file so existing Day 10/13/14/16/17/22/24/25/30 content is preserved. It inserts missing remaining-day sections before Day 10 and replaces the final clarity review.

```powershell
git checkout ai-conspects-repetition-plan
git pull --ff-only origin ai-conspects-repetition-plan

Copy-Item -Path "$env:USERPROFILE\Downloads\ap-2-complete-asp-0326-remaining-deep-processing-package.zip" -Destination ".\ap-2-complete-asp-0326-remaining-deep-processing-package.zip" -Force

Expand-Archive -Path ".\ap-2-complete-asp-0326-remaining-deep-processing-package.zip" -DestinationPath ".\" -Force

$pkg = "ap-2-complete-asp-0326-remaining-deep-processing-package"
$src = Join-Path (Get-Location) "$pkg"

Copy-Item -Path "$src\replacement-files\-Repetition\Area Processing\Area Processing Index.md" -Destination ".\-Repetition\Area Processing\Area Processing Index.md" -Force
Copy-Item -Path "$src\replacement-files\-Repetition\Area Processing\ASP\ASP 0326 Processing Notes.md" -Destination ".\-Repetition\Area Processing\ASP\ASP 0326 Processing Notes.md" -Force

$deepPath = ".\-Repetition\Area Processing\ASP\ASP 0326 Deep Fragment Processing.md"
$deep = Get-Content -Path $deepPath -Raw -Encoding UTF8
$insert = Get-Content -Path "$src\insert-files\ASP 0326 Remaining Days Deep Processing.md" -Raw -Encoding UTF8
$review = Get-Content -Path "$src\insert-files\ASP 0326 Fragment Clarity Review.md" -Raw -Encoding UTF8

if ($deep -notmatch '# Day 01 — Deep fragment processing') {
  $deep = $deep -replace '(?s)\r?\n---\r?\n\r?\n# Day 10 — Deep fragment processing', "`r`n---`r`n`r`n$insert`r`n`r`n---`r`n`r`n# Day 10 — Deep fragment processing"
}

if ($deep -match '# Fragment Clarity / Processing Confidence Review') {
  $deep = $deep -replace '(?s)# Fragment Clarity / Processing Confidence Review.*\z', $review
} else {
  $deep = $deep.TrimEnd() + "`r`n`r`n---`r`n`r`n" + $review
}

Set-Content -Path $deepPath -Value $deep -Encoding UTF8

$sourcePath = ".\-Repetition\Area Processing\ASP\ASP 0326 Area Source Conversion.md"
$sourceText = Get-Content -Path $sourcePath -Raw -Encoding UTF8
$days = @("01","02","03","04","05","06","07","08","09","11","12","15","19","20","21","23")

foreach ($day in $days) {
  if ($sourceText -notmatch "Day $day — Deep fragment processing") {
    $pattern = "(?s)(## Day $day\b.*?)(\r?\n---\r?\n\r?\n## Day |\z)"
    $replacement = '$1' + "`r`nDeep processing:`r`n- See [[ASP 0326 Deep Fragment Processing#Day $day — Deep fragment processing]].`r`n" + '$2'
    $sourceText = [regex]::Replace($sourceText, $pattern, $replacement, 1)
  }
}
Set-Content -Path $sourcePath -Value $sourceText -Encoding UTF8

$files = @(
  "-Repetition/Area Processing/Area Processing Index.md",
  "-Repetition/Area Processing/ASP/ASP 0326 Area Source Conversion.md",
  "-Repetition/Area Processing/ASP/ASP 0326 Deep Fragment Processing.md",
  "-Repetition/Area Processing/ASP/ASP 0326 Processing Notes.md"
)

$diffFile = Join-Path (Get-Location) "ap-2-complete-asp-0326-remaining-deep-processing-package.diff"

git status --short -- $files
git diff --stat -- $files
git --no-pager diff --no-color --output="$diffFile" -- $files
Get-Content -Path $diffFile -Raw -Encoding UTF8 | Set-Clipboard

Write-Host "Diff saved to: $diffFile"
Write-Host "Diff copied to clipboard. Paste it into chat for review before committing."
```
