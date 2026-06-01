# Apply archive: React Query R05 transcript v002

Archive type: stage-4h verified region transcript correction.

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
C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4h-r05-transcript-v002.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4h-r05-transcript-v002.zip"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

# Remove superseded R05 v001 data files if they exist.
$oldR05Files = @(
  "_ai-conspects\react-query-rquery\15-stage4d-r05-region-transcript.md",
  "_ai-conspects\react-query-rquery\data\R05-sources-stage4d.csv",
  "_ai-conspects\react-query-rquery\data\R05-sources-stage4d.json",
  "_ai-conspects\react-query-rquery\data\R05-area-understanding-stage4d-v001.json"
)

foreach ($file in $oldR05Files) {
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

Use `git add -A` because this archive removes superseded R05 v001 data files.

```powershell
git add -A _ai-conspects/react-query-rquery
git commit -m "Expand React Query R05 pagination transcript"
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

This archive supersedes R05 v001 and updates the R05 boundary after Stage4g audit.
