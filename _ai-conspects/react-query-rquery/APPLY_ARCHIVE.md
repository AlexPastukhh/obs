# Apply archive: React Query R07 transcript v003

Archive type: stage-4b region transcript cleanup.

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
C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4b-r07-transcript-v003.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4b-r07-transcript-v003.zip"

# Make git diff text/clipboard friendlier for UTF-8/Cyrillic.
$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

# Remove obsolete R07 scaffold files from Stage 4a.
$staleFiles = @(
  "_ai-conspects\react-query-rquery\data\R07-source-set-stage4a.json",
  "_ai-conspects\react-query-rquery\data\R07-screenshot-inventory-stage4a.csv",
  "_ai-conspects\react-query-rquery\10-stage4a-r07-next-region-kickoff.md"
)

foreach ($file in $staleFiles) {
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

Use `git add -A` because this cleanup can remove obsolete scaffold files.

```powershell
git add -A _ai-conspects
git commit -m "Add React Query R07 transcript and cleanup"
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

If v001/v002 were applied but not committed, apply this v003 archive over them and commit once.

This archive keeps the R07 transcript/area understanding and removes stale Stage 4a scaffold files.
