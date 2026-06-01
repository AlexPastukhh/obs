# Apply archive: React Query R01 transcript v002

Archive type: stage-4e verified region transcript correction.

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
C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4e-r01-transcript-v002.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4e-r01-transcript-v002.zip"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

# Remove superseded R01 v001 data files if they exist.
$oldR01Files = @(
  "_ai-conspects\react-query-rquery\16-stage4e-r01-region-transcript.md",
  "_ai-conspects\react-query-rquery\data\R01-sources-stage4e.csv",
  "_ai-conspects\react-query-rquery\data\R01-sources-stage4e.json",
  "_ai-conspects\react-query-rquery\data\R01-area-understanding-stage4e-v001.json"
)

foreach ($file in $oldR01Files) {
  if (Test-Path $file) {
    Remove-Item $file -Force
  }
}

git status --short
git diff --stat -- _ai-conspects

# Copy full diff to clipboard. Do not print it and do not open a pager.
git --no-pager diff -- _ai-conspects | Set-Clipboard
```

## Optional: save full diff to file

```powershell
git --no-pager diff -- _ai-conspects > C:\Users\alexa\Downloads\ai-conspects-last-diff.patch
```

## Commit commands

Use `git add -A` because this archive removes superseded R01 v001 data files.

```powershell
git add -A _ai-conspects
git commit -m "Expand React Query R01 browser cache transcript"
```

## Push command

```powershell
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore -- _ai-conspects
```

## Notes

This archive supersedes R01 v001 and updates candidate-review rules.

If R01 v001 was not committed, apply this v002 archive directly and commit only v002.
