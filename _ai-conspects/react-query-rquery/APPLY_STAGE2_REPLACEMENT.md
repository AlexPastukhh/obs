# Apply archive: React Query Stage2 replacement v002

Archive type: workflow cleanup / mapping replacement.

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
C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4f-stage2-replacement-v002.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4f-stage2-replacement-v002.zip"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

# Remove old Stage2 mapping artifacts so they cannot be mistaken for source of truth.
$oldStage2Files = @(
  "_ai-conspects\react-query-rquery\02-region-index.md",
  "_ai-conspects\react-query-rquery\data\screenshot-inventory-stage2.csv",
  "_ai-conspects\react-query-rquery\data\screenshot-region-summary-stage2.csv",
  "_ai-conspects\react-query-rquery\data\react-query-image-coverage-ledger-stage4f-v001.csv",
  "_ai-conspects\react-query-rquery\data\react-query-image-coverage-ledger-stage4f-v001.json",
  "_ai-conspects\react-query-rquery\data\react-query-region-coverage-summary-stage4f-v001.csv"
)

foreach ($file in $oldStage2Files) {
  if (Test-Path $file) {
    Remove-Item $file -Force
  }
}

git status --short
git diff --stat -- _ai-conspects

# Copy full diff to clipboard. Do not print it and do not open a pager.
git --no-pager diff -- _ai-conspects | Set-Clipboard
```

## Commit commands

Use `git add -A` because this archive deletes old Stage2 files.

```powershell
git add -A _ai-conspects
git commit -m "Replace React Query Stage2 with review ledger"
```

## Push command

```powershell
git push origin ai-processed-conspects-text
```

## Notes

This archive does not complete R01.

It explicitly states that the new ledger is not source of truth. It is only a review checklist.
