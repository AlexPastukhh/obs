# Apply archive: Binding Source Attributes compact transcript

Archive type: compact verified transcript.

Target branch:

```text
ai-processed-conspects-text
```

Apply from repository root:

```powershell
PS C:\Users\alexa\obs>
```

## Expected download path

```powershell
C:\Users\alexa\Downloads\ai-conspects-binding-source-attributes-compact-transcript-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-binding-source-attributes-compact-transcript-v001.zip"

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

# Optional cleanup of obsolete helper/scaffold artifacts from earlier attempts.
$staleFiles = @(
  "_ai-conspects\binding-source-attributes\03-visual-verification-workbench.md",
  "_ai-conspects\binding-source-attributes\04-contact-sheet-export.md",
  "_ai-conspects\binding-source-attributes\scripts\open-raw-images.ps1",
  "_ai-conspects\binding-source-attributes\scripts\export-contact-sheet.ps1",
  "_ai-conspects\binding-source-attributes\data\visual-verification-targets-stage2.csv",
  "_ai-conspects\binding-source-attributes\data\visual-verification-targets-stage2.json",
  "_ai-conspects\binding-source-attributes\data\contact-sheet-targets-stage2.json",
  "_ai-conspects\binding-source-attributes\assets\README.md",
  "_ai-conspects\binding-source-attributes\contact-sheet\README.md"
)

foreach ($file in $staleFiles) {
  if (Test-Path $file) {
    Remove-Item $file -Force
  }
}

$staleDirs = @(
  "_ai-conspects\binding-source-attributes\scripts",
  "_ai-conspects\binding-source-attributes\assets",
  "_ai-conspects\binding-source-attributes\contact-sheet"
)

foreach ($dir in $staleDirs) {
  if ((Test-Path $dir) -and -not (Get-ChildItem $dir -Force -ErrorAction SilentlyContinue)) {
    Remove-Item $dir -Force
  }
}

git status --short
git diff --stat -- _ai-conspects/binding-source-attributes

# Copy full diff to clipboard. Do not print it and do not open a pager.
git --no-pager diff -- _ai-conspects/binding-source-attributes | Set-Clipboard
```

## Optional: save full diff to file

```powershell
git --no-pager diff -- _ai-conspects/binding-source-attributes > C:\Users\alexa\Downloads\ai-conspects-last-diff.patch
```

## Commit commands

Use `git add -A` because obsolete helper files may be removed.

```powershell
git add -A _ai-conspects/binding-source-attributes
git commit -m "Add Binding Source Attributes compact transcript"
```

## Push command

```powershell
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore -- _ai-conspects/binding-source-attributes
git clean -fd -- _ai-conspects/binding-source-attributes
```

## Notes

This archive does not edit React Query output.

The full diff is copied to clipboard instead of printed in the terminal.
