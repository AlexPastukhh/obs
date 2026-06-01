# Apply archive: React Query R10 mutations consolidated correction v003

Archive type: stage-3c per-region consolidated transcript correction.

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
C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage3c-r10-mutations-consolidated-v003.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage3c-r10-mutations-consolidated-v003.zip"

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat

# Copy full diff to clipboard instead of printing it line-by-line
git diff -- _ai-conspects/react-query-rquery | Set-Clipboard
```

## Optional: save diff to file

```powershell
git diff -- _ai-conspects/react-query-rquery > C:\Users\alexa\Downloads\ai-conspects-last-diff.patch
```

## Commit commands

```powershell
git add _ai-conspects/react-query-rquery
git commit -m "Clean up consolidated React Query mutations transcript"
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

This archive is a correction over v002.

It removes corrupted OCR draft text from the main readable transcript and keeps `MUT-S019`-`MUT-S036` as pending visual verification.
