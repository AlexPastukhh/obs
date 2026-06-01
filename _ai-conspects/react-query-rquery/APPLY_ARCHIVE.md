# Apply archive: React Query R10 cleanup checkpoint v006

Archive type: stage-3d cleanup checkpoint after completed region transcript.

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
C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage3d-r10-cleanup-checkpoint-v006.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage3d-r10-cleanup-checkpoint-v006.zip"

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

# Remove stale files from the old pending-verification workflow.
$staleFiles = @(
  "_ai-conspects\react-query-rquery\data\R10-mutations-pending-verification-v003.csv",
  "_ai-conspects\react-query-rquery\data\R10-mutations-pending-verification-v003.json"
)

foreach ($file in $staleFiles) {
  if (Test-Path $file) {
    Remove-Item $file -Force
  }
}

git status --short
git diff --stat -- _ai-conspects/react-query-rquery

# Copy full diff to clipboard. Do not print it and do not open a pager.
git --no-pager diff -- _ai-conspects/react-query-rquery | Set-Clipboard
```

## Optional: save full diff to file

```powershell
git --no-pager diff -- _ai-conspects/react-query-rquery > C:\Users\alexa\Downloads\ai-conspects-last-diff.patch
```

## Commit commands

Use `git add -A` because this cleanup removes stale files.

```powershell
git add -A _ai-conspects/react-query-rquery
git commit -m "Clean up completed React Query mutations transcript"
```

## Push command

```powershell
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore -- _ai-conspects/react-query-rquery
```

## Notes

This archive is not a new transcription batch.

It is a checkpoint cleanup after v005. It removes stale pending-verification files and keeps the repo aligned with the current R10 status:

```text
R10 - Mutations completed/ready for review
```
