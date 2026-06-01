# Apply archive: React Query next-region kickoff R07

Archive type: stage-4a next-region scaffold.

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
C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4a-r07-next-region-kickoff-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4a-r07-next-region-kickoff-v001.zip"

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

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

```powershell
git add _ai-conspects/react-query-rquery
git commit -m "Start React Query QueryClient region transcript"
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

This archive starts the next region after R10.

It is not a new mutation cleanup archive, and it does not perform screenshot transcription yet.
