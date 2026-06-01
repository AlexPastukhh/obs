# Apply archive: React Query R02A v002 + R02B transcript v001

Archive type: stage-4q combined correction/transcript.

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
C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4q-r02a-v002-r02b-transcript-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4q-r02a-v002-r02b-transcript-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-stage4q-r02a-v002-r02b.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

# Remove superseded R02A v001 data files if they exist.
$oldR02AFiles = @(
  "_ai-conspects\react-query-rquery\data\R02A-sources-stage4p-v001.csv",
  "_ai-conspects\react-query-rquery\data\R02A-sources-stage4p-v001.json",
  "_ai-conspects\react-query-rquery\data\R02A-boundary-review-stage4p-v001.csv",
  "_ai-conspects\react-query-rquery\data\R02A-boundary-review-stage4p-v001.json",
  "_ai-conspects\react-query-rquery\data\R02A-area-understanding-stage4p-v001.json"
)

foreach ($file in $oldR02AFiles) {
  if (Test-Path $file) {
    Remove-Item $file -Force
  }
}

git status --short
git diff --stat -- _ai-conspects/react-query-rquery

# Save full diff to file and copy to clipboard. Do not print it and do not open a pager.
git --no-pager diff -- _ai-conspects/react-query-rquery > $diffPath
Get-Content $diffPath -Raw | Set-Clipboard
Write-Host "Full diff saved to $diffPath and copied to clipboard."
```

## Commit commands

Use `git add -A` because superseded R02A v001 data files may be removed.

```powershell
git add -A _ai-conspects/react-query-rquery
git commit -m "Add React Query R02B enabled queries transcript"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore -- _ai-conspects/react-query-rquery
```

## Notes

This archive corrects R02A by adding S-013 and completes R02B. R02C remains pending.
